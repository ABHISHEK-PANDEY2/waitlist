import { Link } from "react-router-dom";

const ComponentNav = () => {
  return (
    <>
      <div>
        <h2 className="font-bold text-3xl">Waitlist</h2>
        <div className="py-3 text-sm flex gap-5 border-0 border-b border-GrayDark">
          <Link to="/waitlist/general">
            <span className="font-semibold text-GrayText">General</span>
          </Link>
          <Link to="/waitlist/widget">
            <span className="font-semibold text-GrayText">Widget Builder</span>
          </Link>
          <Link to="/waitlist/signups">
            <span className="font-semibold text-GrayText">Signups</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ComponentNav;
