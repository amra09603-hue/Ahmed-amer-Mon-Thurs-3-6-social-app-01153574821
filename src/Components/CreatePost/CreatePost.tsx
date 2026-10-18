import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaFileImage } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";

export default function CreatePost({ queryKey }: { queryKey?: string[] }) {
  const [isUpLoading, setIsUpLoading] = useState("");

  let textInput = useRef<HTMLTextAreaElement>(null);
  let imgInput = useRef<HTMLInputElement>(null);

  let formData = new FormData();
  let queryClient = useQueryClient();

  function getCreatePost() {
    return axios.post(`https://route-posts.routemisr.com/posts`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  function clearForm() {
    if (textInput.current) textInput.current.value = "";
    if (imgInput.current) imgInput.current.value = "";
  }

  let { isPending, mutate } = useMutation({
    mutationFn: getCreatePost,
    onSuccess: (res) => {
      console.log("success");
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
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
        {/* Textarea */}
        <div className="p-4">
          <textarea
            ref={textInput}
            rows={3}
            dir="auto"
            className="w-full resize-none rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="What's on your mind?"
          />
        </div>

        {/* Image Preview */}
        {isUpLoading && (
          <div className="relative mx-4 mb-4 rounded-xl overflow-hidden">
            <img
              src={isUpLoading}
              className="w-full h-50 object-cover"
              alt=""
            />
            <IoMdCloseCircle
              onClick={() => setIsUpLoading("")}
              className="absolute top-3 right-3 size-9 text-white bg-black/60 hover:bg-black/80 rounded-full p-1.5 cursor-pointer transition"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between px-4 py-5 border-t border-blue-200 bg-blue-50/30">
          {/* Add Image */}
          <label className="flex items-center gap-2 px-3 py-3 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-100 cursor-pointer transition">
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <div
              onClick={() => handleCreatePost()}
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
  );
}
