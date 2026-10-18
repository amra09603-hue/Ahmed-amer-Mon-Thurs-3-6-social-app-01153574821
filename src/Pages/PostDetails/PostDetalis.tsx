import { useQuery } from "@tanstack/react-query";
import Post from "../../Components/Post/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { MdErrorOutline } from "react-icons/md";

export default function PostDetalis() {
  let { postId } = useParams();

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
  });

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
    <div className="w-[70%] mx-auto">
      <Post post={data?.data.data.post} allComments={true} queryKey={["getSinglePost"]} />
    </div>
  );
}
