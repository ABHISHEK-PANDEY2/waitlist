import { useEffect } from "react";
import ComponentNav from "../../components/ComponentNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/useUserData";

const Waitlist = () => {
  const { uid } = useUserData();
  const navigate = useNavigate();
  if (!localStorage.getItem("uid")) {
    navigate("/signin");
  }
  useEffect(() => {
    navigate("/waitlist/general");
    // console.log("navigate");
  }, []);
  return (
    <>
      <ComponentNav />
      <Outlet />
    </>
  );
};

export default Waitlist;
