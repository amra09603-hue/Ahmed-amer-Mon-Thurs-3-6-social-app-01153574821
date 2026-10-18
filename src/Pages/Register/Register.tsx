import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type registerSchemaType,
} from "../../Schema/auth.schema";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ImSpinner } from "react-icons/im";

export default function Register() {
  let form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  let { register, handleSubmit, formState } = form;

  let navigate = useNavigate();
  const [objRegister, setObjRegister] = useState({});

  function getRegister() {
    return axios.post(
      `https://route-posts.routemisr.com/users/signup`,
      objRegister,
    );
  }

  let { isPending, error, mutate } = useMutation({
    mutationFn: getRegister,
    mutationKey: ["getRegister"],
    onSuccess: (res) => {
      toast.success(res.data.message);
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleRegister(obj: registerSchemaType) {
    setObjRegister(obj);
    mutate();
  }

  return (
    <div className="my-8">
      {error && (
        <p className="text-white mb-6 bg-red-500 text-center max-w-md mx-auto p-4 rounded-xl text-base font-semibold">
          {error.message}
        </p>
      )}
      <form
        className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="relative z-0 w-full group mb-7">
          <input
            type="text"
            id="text"
            autoComplete="name"
            {...register("name")}
            className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="text"
            className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formState.errors.name?.message && formState.touchedFields.name && (
            <p className="text-red-500 text-sm font-medium mt-1">
              {formState.errors.name?.message}
            </p>
          )}
        </div>

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
            type="date"
            {...register("dateOfBirth")}
            id="date"
            className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="date"
            className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Date of Birth
          </label>
          {formState.errors.dateOfBirth?.message &&
            formState.touchedFields.dateOfBirth && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {formState.errors.dateOfBirth?.message}
              </p>
            )}
        </div>

        <div className="relative z-0 w-full group mb-7">
          <input
            type="password"
            {...register("password")}
            id="password"
            autoComplete="new-password"
            className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
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

        <div className="relative z-0 w-full group mb-7">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            autoComplete="new-password"
            className="block py-3 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 border-blue-200 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {formState.errors.rePassword?.message &&
            formState.touchedFields.rePassword && (
              <p className="text-red-500 text-sm font-medium mt-1">
                {formState.errors.rePassword?.message}
              </p>
            )}
        </div>

        <div className="mb-7">
          <div className="flex items-center mb-3">
            <input
              id="default-radio-1"
              type="radio"
              defaultValue="male"
              {...register("gender")}
              defaultChecked
              className="w-4 h-4 text-blue-600 border-blue-300 bg-white rounded-full checked:border-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200"
            />
            <label
              htmlFor="default-radio-1"
              className="select-none ms-2 text-sm font-medium text-gray-700"
            >
              Male
            </label>
            {formState.errors.gender?.message &&
              formState.touchedFields.gender && (
                <p className="text-red-500 text-sm font-medium ms-3">
                  {formState.errors.gender?.message}
                </p>
              )}
          </div>

          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              defaultValue="female"
              {...register("gender")}
              className="w-4 h-4 text-blue-600 border-blue-300 bg-white rounded-full checked:border-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200"
            />
            <label
              htmlFor="default-radio-2"
              className="select-none ms-2 text-sm font-medium text-gray-700"
            >
              Female
            </label>
          </div>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="text-white w-full disabled:bg-blue-900 disabled:cursor-not-allowed text-base rounded-xl bg-blue-600 hover:bg-blue-700 font-medium cursor-pointer px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
        >
          {isPending ? (
            <ImSpinner className="animate-spin mx-auto" />
          ) : (
            "Submit"
          )}
        </button>

        <div className="mt-5 text-center">
          <Link
            to={"/login"}
            className="text-blue-500 hover:text-blue-700 font-medium transition"
          >
            You already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
