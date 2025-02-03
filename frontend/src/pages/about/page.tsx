import { useUser } from "@/auth/userContext";
import { useGetUser } from "@/requests/gen/react-query/user";

const AboutPage = () => {
  const { user } = useUser();
  const { data } = useGetUser(user?.uid || "");

  console.log(data);

  return (
    <h1>
      {" "}
      {data?.user_first} {data?.user_last}{" "}
    </h1>
  );
};

export default AboutPage;
