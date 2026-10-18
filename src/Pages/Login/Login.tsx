import { useForm } from "react-hook-form";
import { loginSchema, type loginSchemaType } from "./../../Schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner } from "react-icons/im";
import { useContext, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const [objLogin, setObjLogin] = useState({});
  let navigate = useNavigate();
  let { setUserLogin } = useContext(authContext);

  let form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  let { register, handleSubmit, formState } = form;

  function getLogin() {
    return axios.post(
      `https://route-posts.routemisr.com/users/signin`,
      objLogin,
    );
  }
  let { isPending, mutate } = useMutation({
    mutationFn: getLogin,
    mutationKey: ["getLogin"],
    onSuccess: (res) => {
      toast.success("login successfully..");
      localStorage.setItem("userToken", res.data.data.token);
      setUserLogin(res.data.data.token);
      navigate("/");
    },
    onError: () => {
      toast.error("Password or Email not correct");
    },
    onSettled: () => {},
  });

  function handleLogin(obj: loginSchemaType) {
    setObjLogin(obj);
    mutate();
  }

  return (
    <div className="my-8">
      <form
        className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="relative z-0 w-full group mb-7">
          <input
            type="email"
            {...register("email")}
            id="email"
            autoComplete="email"
            className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formState.errors.email?.message && formState.touchedFields.email && (
            <p className="text-red-500 text-sm font-medium mt-1">
              {formState.errors.email?.message}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full group mb-7">
          <input
            type="password"
            {...register("password")}
            id="password"
            autoComplete="password"
            className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formState.errors.password?.message &&
            formState.touchedFields.password && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {formState.errors.password?.message}
              </p>
            )}
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="text-white w-full disabled:bg-blue-900 disabled:cursor-not-allowed text-base rounded-xl bg-blue-600 hover:bg-blue-700 font-medium cursor-pointer px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
        >
          {isPending ? <ImSpinner className="animate-spin mx-auto" /> : "Login"}
        </button>

        <div className="mt-5 text-center">
          <Link
            to={"/register"}
            className="text-blue-500 hover:text-blue-700 font-medium transition"
          >
            You don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
