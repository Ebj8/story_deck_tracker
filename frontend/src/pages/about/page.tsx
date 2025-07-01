import { useUser } from "@/auth/UserContext";
import { useGetUser } from "@/requests/gen/react-query/user";

const AboutPage = () => {
  const { user } = useUser();
  const { data } = useGetUser(user?.uid || "");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello {data?.user_first}</h1>
    </div>
  );
};

export default AboutPage;
