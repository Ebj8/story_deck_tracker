import { useUser } from "@/auth/UserContext";
import { useGetUser } from "@/requests/gen/react-query/user";

const AboutPage = () => {
  const { user } = useUser();
  const { data } = useGetUser(user?.uid || "");

  return <h1>Hello {data?.user_first}</h1>;
};

export default AboutPage;
