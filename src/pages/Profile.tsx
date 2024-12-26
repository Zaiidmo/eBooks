import UserCard from "@/components/profile/UserCard";
import { ReadingActivity } from "@/components/profile/ReadingActivity";
import { BounceLoader } from "react-spinners";

export const Profile = () => {
  const user = {
    id: "1",
    username: "John Doe",
    email: "john.doe@example.com",
    avatar: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  }
  if (!user) {
    return (
      <div className="w-screen h-screen flex justify-center text-red-500 items-center">
        {" "}
        <BounceLoader color="#ff0000" />{" "}
      </div>
    );
  }

  return (
    <div className="p-8 px-3 mx-8 md:px-0 flex flex-col lg:flex-row gap-8 max-w-screen-xl lg:mx-auto max-h-[90vh] overflow-y-auto">
      {/* User Card - 1/3 width */}
      <div className="lg:w-1/3">
        <UserCard />
      </div>

      {/* Reading Activity - 2/3 width */}
      <div className="lg:w-2/3">
        <ReadingActivity userId={user.id} />
      </div>
    </div>
  );
};
