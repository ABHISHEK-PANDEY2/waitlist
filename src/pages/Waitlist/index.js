import { useEffect } from "react";
import ComponentNav from "../../components/ComponentNav";
import { Outlet, useNavigate } from "react-router-dom";

const Waitlist = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/waitlist/general");
    console.log("navigate");
  }, []);
  return (
    <>
      <ComponentNav />
      <Outlet />
    </>
  );
};

export default Waitlist;
