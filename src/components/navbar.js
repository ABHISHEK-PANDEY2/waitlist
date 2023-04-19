import {
  HomeOutlined,
  PlusCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="w-[19%] h-full border border-Gray px-5 py-3">
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
            <li className="flex items-center gap-2">
              <LinkOutlined className="my-auto" />
              Test
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
