import { useEffect } from "react";
import { useUserData } from "../context/useUserData";

const General = () => {
  const { getGeneralDetail, generalDetail, deployedUrl, selectedWaitlist } =
    useUserData();
  useEffect(() => {
    getGeneralDetail();
  }, [selectedWaitlist]);
  return (
    generalDetail && (
      <section className="mt-8">
        <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex gap-5 items-center justify-between flex-col lg:flex-row">
          <div>
            <h5 className="font-bold">Waitlist Id</h5>
            <p className="text-GrayText">
              This name is shown when user visits to the waitlist Url
            </p>
          </div>
          <span className="text-semibold w-full max-w-xl">
            {generalDetail.waitlist_id}
          </span>
        </div>

        <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex gap-5 items-center justify-between flex-col lg:flex-row">
          <div>
            <h5 className="font-bold">Waitlist Name</h5>
            <p className="text-GrayText">
              Enter the name that should show up on the waitlist page when your
              users visit it
            </p>
          </div>
          <span className="text-semibold w-full max-w-xl">
            {generalDetail.waitlist_name}
          </span>
        </div>

        <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex gap-5 items-center justify-between flex-col lg:flex-row">
          <div className="w-full">
            <h5 className="font-bold">Waitlist Url</h5>
            <p className="text-GrayText">
              Your waitlist url should appear here
            </p>
          </div>
          <p className="w-full max-w-xl">{`${deployedUrl}/?id=${generalDetail.waitlist_id}`}</p>
        </div>

        <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex gap-5 items-center justify-between flex-col lg:flex-row">
          <div>
            <h5 className="font-bold">Delete waitlist</h5>
            <p className="text-GrayText">
              Delete this waitlist, this action is irreversible
            </p>
          </div>
          <button className="px-5 py-2 border-none bg-[#DC2626] text-white font-semibold rounded-md mt-3 mx-auto">
            Delete Waitlist
          </button>
        </div>
      </section>
    )
  );
};

export default General;
