import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CommentDelete({
  postId,
  queryKey,
  commentId,
}: {
  postId: string;
  queryKey?: string[];
  commentId: string;
}) {
  let query = useQueryClient();
  let navigate = useNavigate();

  function getDeletePost() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  let { mutate, isPending } = useMutation({
    mutationFn: getDeletePost,
    onSuccess: (res) => {
      toast.success(res.data.message);
      query.invalidateQueries({ queryKey: queryKey });
      if (queryKey?.[0] === "getSinglePost") {
        query.invalidateQueries({ queryKey: ["getPostComments"] });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="flex w-full items-center disabled:cursor-not-allowed disabled:text-black gap-2.5 px-3 py-2.5 cursor-pointer text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
    >
      {isPending ? (
        <ImSpinner2 className="animate-spin" />
      ) : (
        <>
          <RiDeleteBin6Line size={16} />
          <span className="text-sm font-medium">Delete</span>
        </>
      )}
    </button>
  );
}
