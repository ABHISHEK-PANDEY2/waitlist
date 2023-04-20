import ComponentNav from "../../components/ComponentNav";
import { Outlet } from "react-router-dom";

const Waitlist = () => {
  return (
    <>
      <ComponentNav />
      <Outlet />
    </>
  );
};

export default Waitlist;
