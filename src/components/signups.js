import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useUserData } from "../context/useUserData";

const Signups = () => {
  const { getAllSignups, allSignups } = useUserData();

  useEffect(() => {
    getAllSignups();
  }, []);
  return (
    <>
      <div className="flex h-12 justify-between mt-5">
        <div className="border border-GrayDark rounded-md flex items-center px-5 gap-5">
          <span className="bg-Gray rounded-md h-3/5 flex items-center px-2">
            Show Current Waiters
          </span>
          <span className=" flex items-center px-2">
            Show offboarded waiters
          </span>
        </div>
        <div className="w-96 h-10 relative">
          <input
            className="w-full h-full border border-GrayDark rounded-md px-8 outline-none"
            placeholder="search by email"
            type="text"
          />
          <SearchOutlined className="absolute font-md top-1/2 left-2 translate-y-[-50%] text-GrayText" />
        </div>
      </div>
      {/* List */}
      <div className="rounded-md border border-GrayDark mt-5 ">
        <div className="bg-Gray h-10 rounded-t-md items-center grid grid-cols-12">
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
        {allSignups.map((user, i) => {
          return (
            <div
              key={i}
              className="h-10 items-center  border-0 border-b border-Gray grid grid-cols-12"
            >
              <div className="col-span-1 flex justify-center">
                <input type="checkbox" />
              </div>
              <div className="col-span-1">{user.waiting_position}</div>
              <div className="col-span-3">{user.email}</div>
              <div className="col-span-2">21/07/2023</div>
              <div className="col-span-1">{user.isReferred ? "Yes" : "No"}</div>
              <div className="col-span-2">{user.refferals_made}</div>
              <div className="col-span-2">N/A</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Signups;
