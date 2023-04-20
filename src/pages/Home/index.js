import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../context/useUserData";

const Home = () => {
  const { allWaitlist, getWaitlists, setSelectedWaitlist } = useUserData();
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
                  <div className="h-full bg-[#493ee6] text-white py-5 px-6 rounded-l-md m-auto">
                    TE
                  </div>
                  <div className="px-3 py-2 m-auto">
                    <p>{list.waitlist_name}</p>
                    <p className=" text-GrayText">
                      Created: 20-04-2023 | Total Signups: 5
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
