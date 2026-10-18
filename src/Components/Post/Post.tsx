import type { PostType } from "../../Types/post";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import useComments from "../../Hooks/useComments";
import Loader from "../Loader/Loader";
import { MdErrorOutline } from "react-icons/md";
import type { CommentType } from "../../Types/comment";
import CreateComment from "../CreateComment/CreateComment";
import { useContext, useState } from "react";
import PostDeleted from "../PostDeleted/PostDeleted";
import { authContext } from "../../Context/AuthContext";
import PostUpdate from "../PostUpdate/PostUpdate";

export default function Post({
  post,
  allComments = false,
  queryKey,
}: {
  post: PostType;
  allComments?: boolean;
  queryKey?: string[];
}) {
  let { user, _id, topComment, createdAt } = post;
  let year = createdAt.slice(0, 10);
  let hours = new Date(createdAt).getHours();
  let minutes = new Date(createdAt).getMinutes();

  let { userIdAccount } = useContext(authContext);

  const [dotsShow, setDotsShow] = useState(false);

  let { data, isLoading, isError, error } = useComments(_id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <div>{error?.message}</div>
        <div className="w-full h-screen flex justify-center items-center">
          <div>
            <MdErrorOutline className="size-28 ml-10 text-red-600" />
            <p className="text-5xl">No Data...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="my-7">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        {/* Header */}
        <div className="flex relative items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <img
              src={user.photo}
              alt="profile"
              className="w-18 h-18 rounded-full object-cover ring-2 ring-blue-400"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-xl pb-1">
                {post.user.name}
              </h3>
              <div className="flex justify-between gap-2">
                <p className=" text-blue-500 ">{`${hours}:${minutes}`}</p>
                <p className=" text-blue-500 ">{`${year}`}</p>
              </div>
            </div>
          </div>

          {userIdAccount === user._id ? (
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
            <div className="absolute bottom-1 right-16 mt-2 w-36 bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden z-50">
              {/* Delete */}
              <PostDeleted postId={_id} queryKey={queryKey} />

              {/* Update */}
              <PostUpdate postId={_id} queryKey={queryKey} setDotsShow={setDotsShow} />
            </div>
          )}
        </div>

        {/* Post Body */}
        {post.body && (
          <div
            className={`p-3.5 pt-3 mx-1 text-lg font-bold ${post.image ? "pl-3" : "border border-gray-200 rounded-xl pl-5 mt-2"}`}
          >
            {post.body}
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="relative  object-cover">
            <img
              src={post.image}
              alt="post"
              className="w-full h-100 object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              {/* Like */}
              <button className="text-gray-800 flex cursor-pointer gap-2 hover:text-red-500 transition">
                <FiHeart size={26} />
                {post.likesCount}
              </button>

              {/* Comment */}
              <Link to={`/postdetails/${_id}`}>
                <button className="text-gray-800 flex cursor-pointer gap-2 hover:text-blue-500 transition">
                  <FiMessageCircle size={26} />
                  {post.commentsCount}
                </button>
              </Link>

              {/* Share */}
              <button className="text-gray-800 flex cursor-pointer gap-2 hover:text-blue-500 transition">
                <FiSend size={24} />
                {post.sharesCount}
              </button>
            </div>

            {/* Save */}
            <button className="text-gray-800 cursor-pointer hover:text-blue-500 transition">
              <FiBookmark size={26} />
            </button>
          </div>
        </div>

        {allComments && <CreateComment postId={_id} />}

        {/* TopComment */}
        {!allComments && topComment && <Comment comment={topComment} queryKey={queryKey} postId={_id} />}

        {/* All Comment */}
        {allComments &&
          data?.data.data.comments.map((comment: CommentType) => (
            <Comment comment={comment} key={comment._id} queryKey={queryKey} postId={_id} />
          ))}
      </div>
    </div>
  );
}
