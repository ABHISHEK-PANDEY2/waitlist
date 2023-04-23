import { useState } from "react";
import { createWaitlist } from "../../config/firebase.config";
import { useUserData } from "../../context/useUserData";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { deployedUrl, uid } = useUserData();
  const navigate = useNavigate();
  if (!localStorage.getItem("uid")) {
    navigate("/signin");
  }
  const [waitlistName, setWaitlistName] = useState("");
  const [id, setId] = useState();
  const url = id ? `${deployedUrl}/?waitlistid=${id}` : "";
  const handleSubmit = async () => {
    const listId = await createWaitlist(waitlistName);
    console.log(listId);
    setId(listId);
    navigate("/waitlist/general");
    window.location.reload(false);
  };

  return (
    <>
      <div className="text-start">
        <h2 className="font-bold text-3xl">Create New Waitlist</h2>
        <section className="mt-8">
          <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex flex-col lg:flex-row gap-5 items-center justify-between">
            <div>
              <h5 className="font-bold">Waitlist Name</h5>
              <p className="text-GrayText">
                Enter the name that should show up on the waitlist page when
                your users visit it
              </p>
            </div>
            <input
              className="border border-GrayDark outline-none px-3 rounded-md w-full h-10 max-w-xl"
              type="text"
              value={waitlistName}
              onChange={(e) => {
                setWaitlistName(e.target.value);
              }}
            />
          </div>

          <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex flex-col lg:flex-row gap-5 items-center justify-between">
            <div className="w-full">
              <h5 className="font-bold">Waitlist Url</h5>
              <p className="text-GrayText">
                Your waitlist url should appear here
              </p>
            </div>
            <input
              className="border border-GrayDark outline-none px-3 rounded-md w-full h-10 max-w-xl"
              placeholder="https://example.com"
              type="text"
              value={url}
            />
          </div>

          <div className="border border-x-0 border-t-0 border-b border-Gray py-6 flex flex-col lg:flex-row gap-5 items-center justify-between">
            <div>
              <h5 className="font-bold">Email new waiters</h5>
              <p className="text-GrayText">
                New Waiters on your Waitlist will receive an email containing
                their referral link and Waitlist status.
              </p>
            </div>
            <div className="w-full max-w-xl flex justify-start">
              <input
                className="border border-GrayDark outline-none px-3 rounded-md h-4 w-4 max-w-xl"
                type="checkbox"
              />
            </div>
          </div>
          <div className="flex">
            <button
              className="px-5 py-2 border-none bg-blue text-white font-semibold rounded-md mt-3 mx-auto"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Create;
