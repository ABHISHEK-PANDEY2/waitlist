import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useUserData } from "../context/useUserData";

const Signups = () => {
  const { getAllSignups, allSignups } = useUserData();
  console.log(allSignups[0]?.joined_at);
  function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = dd + "/" + mm + "/" + yyyy;
    return date;
  }
  useEffect(() => {
    getAllSignups();
  }, []);
  return (
    <>
      <section className="flex flex-col">
        <div className="flex h-fit lg:h-12 justify-between mt-5 flex-col lg:flex-row">
          <div className="border border-GrayDark rounded-md flex items-center lg:px-5 lg:gap-5  px-3 gap-3">
            <span className="bg-Gray rounded-md h-3/5 flex items-center py-2 px-2 my-2">
              Current Waiters
            </span>
            <span className=" flex items-center px-2 py-2">
              Offboarded waiters
            </span>
          </div>
          <div className="w-full max-w-sm my-5 lg:my-0 h-10 relative">
            <input
              className="w-full h-full border border-GrayDark rounded-md px-8 outline-none"
              placeholder="search by email"
              type="text"
            />
            <SearchOutlined className="absolute font-md top-1/2 left-2 translate-y-[-50%] text-GrayText" />
          </div>
        </div>
        {/* List */}
        <div className="rounded-md border border-GrayDark lg:mt-5 w-full overflow-scroll">
          <div className="bg-Gray h-10 rounded-t-md items-center grid grid-cols-12 min-w-[1000px]">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" />
            </div>
            <div className="col-span-1">Position</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-1">Referred</div>
            <div className="col-span-2">Referrals Made</div>
            <div className="col-span-2">Phone</div>
          </div>
          {allSignups
            .sort((a, b) => b.referrals_made - a.referrals_made)
            .map((user, i) => {
              return (
                <div
                  key={i}
                  className="h-10 items-center  border-0 border-b border-Gray grid grid-cols-12 min-w-[1000px]"
                >
                  <div className="col-span-1 flex justify-center">
                    <input type="checkbox" />
                  </div>
                  <div className="col-span-1">{i + 1}</div>
                  <div className="col-span-3">{user.email}</div>
                  <div className="col-span-2">
                    {convertTimestamp(user.joined_at)}
                  </div>
                  <div className="col-span-1">
                    {user.isReferred ? "Yes" : "No"}
                  </div>
                  <div className="col-span-2">{user.referrals_made}</div>
                  <div className="col-span-2">N/A</div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Signups;
