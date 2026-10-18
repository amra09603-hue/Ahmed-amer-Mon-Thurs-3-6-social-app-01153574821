import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  passwordChangeSchema,
  type passwordChangeSchemaType,
} from "../../Schema/auth.schema";
import axios from "axios";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";

export default function ChangePassword() {
  let navigate = useNavigate();

  let form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(passwordChangeSchema),
    mode: "onChange",
  });

  let { register, handleSubmit, formState } = form;
  const [objChanfePassword, setObjChanfePassword] = useState({});

  function ChangePasswored() {
    return axios.patch(
      `https://route-posts.routemisr.com/users/change-password`,
      objChanfePassword,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  let { mutate, isPending } = useMutation({
    mutationFn: ChangePasswored,
    onSuccess: (res) => {
      toast.success(res.data.message);
      localStorage.removeItem("userToken");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handlePasswordData(obj: passwordChangeSchemaType) {
    setObjChanfePassword(obj);
    mutate();
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 text-center px-5 py-2.5 cursor-pointer rounded-xl border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-400 transition"
      >
        Change Password
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-blue-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Change Password
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 cursor-pointer rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition"
              >
                <IoMdCloseCircle size={26} />
              </button>
            </div>

            <form onSubmit={handleSubmit(handlePasswordData)} className="p-6">
              <div className="relative z-0 w-full mb-8 group">
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Current Password
                </label>
                {formState.errors.password?.message &&
                  formState.touchedFields.password && (
                    <p className="text-red-500 text-sm font-medium mt-2">
                      {formState.errors.password.message}
                    </p>
                  )}
              </div>

              <div className="relative z-0 w-full mb-8 group">
                <input
                  {...register("newPassword")}
                  type="password"
                  id="newPassword"
                  className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="newPassword"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  New Password
                </label>
                {formState.errors.newPassword?.message &&
                  formState.touchedFields.newPassword && (
                    <p className="text-red-500 text-sm font-medium mt-2">
                      {formState.errors.newPassword.message}
                    </p>
                  )}
              </div>

              <button
                // onClick={() => }
                disabled={isPending}
                type="submit"
                className="w-full py-3 cursor-pointer rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed font-medium transition focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                {isPending ? "Loading..." : "Add New Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
