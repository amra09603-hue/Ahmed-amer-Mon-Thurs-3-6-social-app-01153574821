import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UserType } from "../../Types/User";
import { MdErrorOutline } from "react-icons/md";
import Loader from "../../Components/Loader/Loader";
import Post from "../../Components/Post/Post";
import type { PostType } from "../../Types/post";
import CreatePost from "./../../Components/CreatePost/CreatePost";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import ChangeProfileImg from "../../Components/ChangeProfileImg/ChangeProfileImg";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Profile() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  // profile posts
  function getProfilePosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${user._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  let { data: dataProfile } = useQuery({
    queryKey: ["getProfilePosts"],
    queryFn: getProfilePosts,
    enabled: !isLoading && !isError && !!data,
  });

  let user: UserType = data?.data.data.user;
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
    <>
    <div>
          <Helmet>
            <title>Profile</title>
          </Helmet>
        </div>
      {user && (
        <>
          <div className="w-[70%] mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden my-6">
            <div className=" bg-linear-to-r from-blue-500 to-blue-600 h-32"></div>

            <div className="px-6 pb-6">
              <div className="flex justify-center -mt-16 mb-4">
                <img
                  src={user.photo}
                  className="w-70 h-70 rounded-full object-cover border-4 border-white shadow-md"
                  alt=""
                />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {user.email}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Email
                  </p>
                  <p className="text-gray-800 font-semibold">{user.email}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Date of Birth
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {user.dateOfBirth.slice(0, 10)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Gender
                  </p>
                  <p className="text-gray-800 font-semibold">{user.gender}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Joined
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {user.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Change Password */}
                <ChangePassword />

                {/* Change Profile Image */}
                <ChangeProfileImg />
              </div>
            </div>
          </div>

          <div className="w-[70%] mx-auto rounded-2xl border border-blue-100 p-10 my-6 bg-white shadow-sm">
            <CreatePost queryKey={["getProfilePosts"]} />
          </div>

          <div className="w-[75%] mx-auto rounded-2xl border border-blue-100 py-4 px-12 my-6 bg-blue-50 shadow-sm">
            {dataProfile?.data.data.posts.map((post: PostType) => (
              <Post queryKey={["getProfilePosts"]} post={post} key={post.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
