import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import toast from "react-hot-toast";
import { FaFileImage, FaPen } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";

export default function PostUpdate({
  postId,
  queryKey,
  setDotsShow,
}: {
  postId: string;
  queryKey?: string[];
  setDotsShow: Dispatch<SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpLoading, setIsUpLoading] = useState("");

  let textInput = useRef<HTMLTextAreaElement>(null);
  let imgInput = useRef<HTMLInputElement>(null);

  let formData = new FormData();
  let queryClient = useQueryClient();

  function getCreatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function clearForm() {
    if (textInput.current) textInput.current.value = "";
    if (imgInput.current) imgInput.current.value = "";
  }

  let { isPending, mutate } = useMutation({
    mutationFn: getCreatePost,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      setIsUpLoading("");
      clearForm();
      toast.success(res.data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function handleCreatePost() {
    if (textInput.current?.value && imgInput.current?.value) return;

    if (textInput.current?.value) {
      formData.append("body", textInput.current!.value);
    }

    if (imgInput.current?.files?.[0]) {
      formData.append("image", imgInput.current?.files[0]);
    }
    console.log("done");
    mutate();
  }

  function handleImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files?.[0];
    if (file) {
      let path = URL.createObjectURL(file);
      setIsUpLoading(path);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-2.5 px-3 py-2.5 cursor-pointer text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition border-t border-blue-50"
      >
        <FaPen size={15} />
        <span className="text-sm font-medium">Update</span>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-blue-50">
                <h2 className="text-lg font-semibold text-gray-800">
                  Create Post
                </h2>

                <button
                  onClick={() => (setIsOpen(false), setDotsShow(false))}
                  className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition"
                >
                  <IoMdCloseCircle size={26} />
                </button>
              </div>

              {/* Textarea */}
              <div className="p-5">
                <textarea
                  ref={textInput}
                  rows={4}
                  dir="auto"
                  className="w-full resize-none rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Image Preview */}
              {isUpLoading && (
                <div className="relative mx-5 mb-5 rounded-xl overflow-hidden">
                  <img
                    src={isUpLoading}
                    className="w-full h-64 object-cover"
                    alt=""
                  />
                  <IoMdCloseCircle
                    onClick={() => setIsUpLoading("")}
                    className="absolute top-3 right-3 size-9 text-white bg-black/60 hover:bg-black/80 rounded-full p-1.5 cursor-pointer transition"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-blue-100 bg-blue-50/40">
                {/* Add Image */}
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-blue-600 hover:text-blue-800 hover:bg-blue-100 cursor-pointer transition">
                  <FaFileImage className="size-5" />
                  <span className="text-sm font-medium">Add image</span>
                  <input
                    type="file"
                    ref={imgInput}
                    onChange={handleImagePreview}
                    className="hidden"
                  />
                </label>

                {/* Submit Button */}
                <button
                  disabled={isPending}
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <div
                    onClick={() => (handleCreatePost(), setIsOpen(false) , setDotsShow(false))}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    {isPending ? (
                      <ImSpinner className="animate-spin size-4" />
                    ) : (
                      <>
                        <FiSend className="size-4" />
                        <span className="text-sm font-medium">Send</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
