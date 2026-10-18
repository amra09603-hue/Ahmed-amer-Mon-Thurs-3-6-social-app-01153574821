import React, { useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangeProfileImg() {
  const [isUpLoading, setIsUpLoading] = useState("");

  let imgInput = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  let formData = new FormData();
  let queryClient = useQueryClient();

  function getCreatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/users/upload-photo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function clearForm() {
    if (imgInput.current) imgInput.current.value = "";
  }

  let { isPending, mutate } = useMutation({
    mutationFn: getCreatePost,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["getMyProfile"] });
      queryClient.invalidateQueries({ queryKey: ["getProfilePosts"] });
      setIsUpLoading("");
      clearForm();
      toast.success(res.data.message);
      navigate("/profile");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function handleCreatePost() {
    if (!imgInput.current?.value) return;

    if (imgInput.current?.files?.[0]) {
      formData.append("photo", imgInput.current?.files[0]);
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 cursor-pointer text-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Change Profile Image
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              <div className="flex items-center justify-between  px-5 py-4 border-b border-blue-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Upload Image
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 cursor-pointer rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition"
                >
                  <IoMdCloseCircle size={26} onClick={()=> setIsUpLoading("")} />
                </button>
              </div>

              <div className="p-5">
                {isUpLoading && (
                  <div className="relative mb-5 rounded-xl overflow-hidden">
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer transition">
                    <FaFileImage className="size-5" />
                    <span className="text-sm font-medium">Add image</span>
                    <input
                      type="file"
                      ref={imgInput}
                      onChange={handleImagePreview}
                      className="hidden"
                    />
                  </label>

                  <button
                    disabled={isPending}
                    type="submit"
                    onClick={() => (handleCreatePost(),setIsOpen(false))}
                    className="flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    {isPending ? (
                      <ImSpinner className="animate-spin size-4" />
                    ) : (
                      <>
                        <FiSend className="size-4" />
                        <span className="text-sm font-medium">Upload Img</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
