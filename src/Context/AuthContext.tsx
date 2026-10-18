import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  userLogin: string | null;
  setUserLogin: Dispatch<SetStateAction<string | null>>;
  userIdAccount: string | null ;
};

export let authContext = createContext<AuthContextType>({
  userLogin: null,
  setUserLogin: () => {},
  userIdAccount:null
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userLogin, setUserLogin] = useState(function () {
    return localStorage.getItem("userToken");
  });

  const [userIdAccount, setuserIdAccount] = useState("");
  let token = localStorage.getItem("userToken");
  useEffect(() => {
    if (token) {
      let { user }: { user: string } = jwtDecode(token);
      setuserIdAccount(user);
    }
  }, [userLogin]);

  return (
    <authContext.Provider value={{ userLogin, setUserLogin, userIdAccount }}>
      {children}
    </authContext.Provider>
  );
}
