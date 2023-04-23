import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWaitlist, getSignups } from "../config/firebase.config";
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [allWaitlist, setAllWaitlist] = useState([]);
  const [selectedWaitlist, setSelectedWaitlist] = useState(
    localStorage.getItem("selectedID")
  );
  const [allSignups, setAllSignups] = useState([]);
  const [generalDetail, setGeneralDetail] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const deployedUrl = "https://waitlist-site.web.app";

  useEffect(
    () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setUid(localStorage.getItem("uid"));
    },
    [localStorage.getItem("user")],
    localStorage.getItem("uid")
  );

  useEffect(() => {
    setSelectedWaitlist(localStorage.getItem("selectedID"));
  }, [localStorage.getItem("selectedID")]);

  const getWaitlists = async () => {
    const data = await getAllWaitlist();
    setAllWaitlist(data);
  };

  const getGeneralDetail = async () => {
    const detail = allWaitlist.filter(
      (list) => list.waitlist_id == selectedWaitlist
    );
    console.log(...detail);
    setGeneralDetail(...detail);
  };

  const getAllSignups = async () => {
    const data = await getSignups(selectedWaitlist);
    data.sort((a, b) => a.waiting_position - b.waiting_position);
    setAllSignups(data);
  };

  return (
    <UserDataContext.Provider
      value={{
        deployedUrl,
        allWaitlist,
        getWaitlists,
        selectedWaitlist,
        setSelectedWaitlist,
        allSignups,
        getAllSignups,
        getGeneralDetail,
        generalDetail,
        user,
        uid,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
