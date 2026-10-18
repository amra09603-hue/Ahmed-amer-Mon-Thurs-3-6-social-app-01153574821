import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";

export default function CreateComment({ postId }: { postId: string }) {
  const [isUpLoading, setIsUpLoading] = useState("");

  let textInput = useRef<HTMLInputElement>(null);
  let imgInput = useRef<HTMLInputElement>(null);

  let formData = new FormData();
  let queryClient = useQueryClient();

  function getCreatePost() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
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
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
      queryClient.invalidateQueries({ queryKey: ["getPostComments"] });
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
      formData.append("content", textInput.current!.value);
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
    <div className="border-t border-blue-100 bg-white px-4 py-4">
      {/* Image Preview */}
      {isUpLoading && (
        <div className="relative mb-4 rounded-xl overflow-hidden">
          <img
            src={isUpLoading}
            className="w-full h-64 object-cover"
            alt="preview"
          />
          <IoMdCloseCircle
            onClick={() => setIsUpLoading("")}
            className="absolute top-3 right-3 size-9 text-white bg-black/60 hover:bg-black/80 rounded-full p-1.5 cursor-pointer transition"
          />
        </div>
      )}

      {/* Input + Actions */}
      <div className="flex items-center gap-3">
        {/* Comment Input */}
        <div className="relative flex-1">
          <input
            type="text"
            ref={textInput}
            placeholder="Add a comment..."
            className="w-full outline-none text-gray-700 py-3.5 pl-4 pr-14 bg-blue-50/50 border border-blue-100 rounded-2xl placeholder:text-gray-400 font-medium focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />

          {/* Camera Icon */}
          <label className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-100 cursor-pointer transition">
            <FaCamera className="size-5" />
            <input
              type="file"
              ref={imgInput}
              onChange={handleImagePreview}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        {/* Send Button */}
        <button
          onClick={() => handleCreatePost()}
          disabled={isPending}
          className="flex items-center cursor-pointer gap-2 px-5 py-3.5 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed shadow-sm transition"
        >
          {isPending ? (
            <ImSpinner className="animate-spin size-5" />
          ) : (
            <>
              <LuSend size={18} />
              <span className="font-medium">Send</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
