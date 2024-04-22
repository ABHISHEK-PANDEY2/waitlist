import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/useUserData";

const Home = () => {
  const { allWaitlist, getWaitlists, setSelectedWaitlist, uid } = useUserData();
  const navigate = useNavigate();
  if (!localStorage.getItem("uid")) {
    navigate("/signin");
  }

  function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = dd + "/" + mm + "/" + yyyy;
    return date;
  }
  return (
    <>
      <section className="">
        <p className="font-semibold text-GrayText mb-5">All Waitlist</p>
        <div className="flex flex-auto flex-wrap gap-5">
          {allWaitlist.map((list, i) => {
            return (
              <Link
                to="/waitlist"
                onClick={() => {
                  setSelectedWaitlist(list.waitlist_id);
                }}
              >
                <div
                  key={i}
                  className="min-w-fit border border-GrayDark rounded-md flex"
                >
                  <div className=" bg-[#493ee6] text-white py-5 px-6 rounded-l-md flex items-center">
                    {list.waitlist_name.toUpperCase().slice(0, 2)}
                  </div>
                  <div className="px-3 py-2 m-auto">
                    <p>{list.waitlist_name}</p>
                    <p className=" text-GrayText">
                      Created: {convertTimestamp(list.updated_on)} | Total
                      Signups: {list.total_signup_count}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
