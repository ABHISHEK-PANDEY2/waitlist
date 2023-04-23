import {
  HomeOutlined,
  PlusCircleOutlined,
  LinkOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUserData } from "../context/useUserData";
import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { getWaitlists, allWaitlist, setSelectedWaitlist, uid } = useUserData();
  const navigate = useNavigate();
  if (!localStorage.getItem("uid")) {
    navigate("/signin");
  }
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  useEffect(() => {
    getWaitlists();
    console.log(allWaitlist);
  }, []);

  return (
    <>
      <span className="lg:hidden absolute top-3 left-4" onClick={toggleDrawer}>
        <MenuOutlined />
      </span>
      <nav className="w-[19%] h-full border border-Gray px-5 py-3 hidden lg:block">
        <div className="w-28">
          <img src="https://getwaitlist.com/logo_waitlist.svg" alt="" />
        </div>
        <ul className="flex flex-col mt-5 gap-3">
          <li className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <HomeOutlined className="my-auto" />
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link to="/create" className="flex items-center gap-2">
              <PlusCircleOutlined /> Create New
            </Link>
          </li>
        </ul>
        <div className="mt-8">
          <h5 className="font-bold text-neutral-300 text-GrayText">
            Waitlists
          </h5>
          <ul className="flex flex-col mt-2 gap-3">
            {allWaitlist.map((list, i) => {
              return (
                <li key={i}>
                  <Link
                    to="/waitlist/general"
                    onClick={() => {
                      localStorage.setItem("selectedID", list.waitlist_id);
                      setSelectedWaitlist(list.waitlist_id);
                    }}
                    className="flex items-center gap-2"
                  >
                    <LinkOutlined className="my-auto" />
                    {list.waitlist_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      {/* Drawer */}

      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <nav className="w-fit h-full  px-5 py-3 lg:hidden">
          <div className="w-20">
            <img src="https://getwaitlist.com/logo_waitlist.svg" alt="" />
          </div>
          <ul className="flex flex-col mt-5 gap-3">
            <li className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <HomeOutlined className="my-auto" />
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link to="/create" className="flex items-center gap-2">
                <PlusCircleOutlined /> Create New
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <h5 className="font-bold text-neutral-300 text-GrayText">
              Waitlists
            </h5>
            <ul className="flex flex-col mt-2 gap-3">
              {allWaitlist.map((list, i) => {
                return (
                  <li key={i}>
                    <Link
                      to="/waitlist/general"
                      onClick={() => {
                        localStorage.setItem("selectedID", list.waitlist_id);
                        setSelectedWaitlist(list.waitlist_id);
                      }}
                      className="flex items-center gap-2"
                    >
                      <LinkOutlined className="my-auto" />
                      {list.waitlist_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </Drawer>
    </>
  );
};

export default Navbar;
