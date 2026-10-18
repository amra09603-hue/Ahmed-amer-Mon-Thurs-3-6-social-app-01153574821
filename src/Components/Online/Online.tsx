import { MdError } from "react-icons/md";

export default function Online() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/25 z-60">
      <div className=" flex justify-center gap-3 items-center w-120 rounded-xl bg-white border text-blue-600 border-gray-500 p-5 text-3xl font-bold ">
        <MdError className=" size-9" />
        <span>you are Offline Now</span>
      </div>
    </div>
  );
}
