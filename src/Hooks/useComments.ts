import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useComments(_id: string) {
  function getAllComments() {
        return axios.get(`https://route-posts.routemisr.com/posts/${_id}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
    }
  
     return useQuery({
      queryKey: ["getPostComments"],
      queryFn: getAllComments,
    });
}
