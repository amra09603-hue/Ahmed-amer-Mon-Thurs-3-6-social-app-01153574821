import  { useContext, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import type { CommentType } from "../../Types/comment";
import { authContext } from "../../Context/AuthContext";
import CommentDelete from "../CommentDelete/CommentDelete";
import CommentUpdate from "../CommentUpdate/CommentUpdate";

export default function Comment({
  comment,
  queryKey,
  postId,
}: {
  comment: CommentType;
  queryKey?: string[];
  postId: string;
}) {
  let { _id, commentCreator, createdAt } = comment;

  let year = createdAt.slice(0, 10);
  let hours = new Date(createdAt).getHours();
  let minutes = new Date(createdAt).getMinutes();

  const [dotsShow, setDotsShow] = useState(false);

  let { userIdAccount } = useContext(authContext);

  return (
    <div className="w-full bg-gray-50 pt-2  mb-5 overflow-hidden border border-blue-100">
      <div className="flex relative items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <img
            src={commentCreator.photo}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-400"
          />
          <div>
            <h3 className="font-semibold text-gray-900 ">
              {commentCreator.name}
            </h3>
            <div className="flex gap-3">
              <p className=" text-blue-500 ">{`${hours}:${minutes}`}</p>
              <p className=" text-blue-500 ">{`${year}`}</p>
            </div>
          </div>
        </div>

        {userIdAccount === commentCreator._id ? (
          <button
            onClick={() => setDotsShow(!dotsShow)}
            className="text-gray-500 cursor-pointer hover:text-blue-600 transition"
          >
            <FiMoreHorizontal size={40} />
          </button>
        ) : (
          ""
        )}

        {dotsShow && (
          <div className="absolute -bottom-2 right-18 mt-2 w-36 bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden z-50">
            {/* Delete */}
            <CommentDelete queryKey={queryKey} postId={postId} commentId={_id}/>
            {/* Update */}
            <CommentUpdate queryKey={queryKey} postId={postId} commentId={_id} setDotsShow={setDotsShow}/>
          </div>
        )}
      </div>

      {/* Post Body */}
      {comment.content && (
        <div className="p-3.5 pt-1.5 pl-12 text-lg font-bold  bg-gray-50">
          {comment.content}
        </div>
      )}

      {/* Post Image */}
      {comment.image && (
        <div className="relative object-cover">
          <img
            src={comment.image}
            alt="post"
            className="w-full h-100 object-cover"
          />
        </div>
      )}
    </div>
  );
}
