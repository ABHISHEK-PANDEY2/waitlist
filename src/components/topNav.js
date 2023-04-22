import { useState } from "react";
import { useUserData } from "../context/useUserData";
import { SignOut } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { user } = useUserData();
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    const res = await SignOut();
    if (res === "success") {
      navigate("/signin");
    }
  };
  return (
    <>
      <nav className="h-14 w-full border border-l-0 flex justify-end items-center px-3 border-Gray">
        <div className="flex gap-3 items-center">
          {user?.email}
          <div
            className="h-10 w-10 rounded-full bg-Gray relative cursor-pointer"
            onClick={() => setIsClicked((prev) => !prev)}
          >
            <div
              className={`absolute ${
                isClicked ? "block" : "hidden"
              } bg-white px-3 py-3 bottom-[-50px] left-[-50px] drop-shadow-md`}
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
