import { getLoggedInUser } from "@/lib/db/user";
import { AuthButton } from "@/components/AuthButton";

const HomeAuthBtn = async () => {
  const user = await getLoggedInUser();

  return <AuthButton provider="github" user={user} />;
};

export default HomeAuthBtn;
