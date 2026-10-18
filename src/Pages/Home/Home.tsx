import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { MdErrorOutline } from "react-icons/md";
import Post from "../../Components/Post/Post";
import type { PostType } from "../../Types/post";
import CreatePost from "../../Components/CreatePost/CreatePost";
import { useEffect } from "react";
import { IoRocketSharp } from "react-icons/io5";
import Helmet from "react-helmet";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  function getAllPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
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

  function rocket() {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }
  

  return (
    <>
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </div>
      <div>
        <CreatePost queryKey={["getAllPosts"]} />
      </div>

      <div className="w-[70%] xl:w-[50%] mx-auto my-8">
        {data?.data.data.posts.map((post: PostType) => (
          <Post post={post} key={post.id} queryKey={["getAllPosts"]} />
        ))}
      </div>

      <button onClick={()=>rocket()} className="fixed cursor-pointer bottom-6 left-25 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300">
        <IoRocketSharp size={22} />
      </button>
    </>
  );
}
