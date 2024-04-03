import axios from "axios";
import { useRouter } from "next/router";

interface SignUpProp {
  username: string;
  email: string;
  password: string;
}

const useAuth = () => {
  const router = useRouter();

  const signup = async (data: SignUpProp) => {
    try {
      await axios.post("http://localhost:8000/account/create", data);
      router.push("a/");
    } catch (error) {}
  };
};

export default useAuth;
