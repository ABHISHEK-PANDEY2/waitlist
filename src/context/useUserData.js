import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWaitlist, getSignups } from "../config/firebase.config";
const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [allWaitlist, setAllWaitlist] = useState([]);
  const [selectedWaitlist, setSelectedWaitlist] = useState("");
  const [allSignups, setAllSignups] = useState([]);

  const getWaitlists = async () => {
    const data = await getAllWaitlist();
    setAllWaitlist(data);
  };

  const getAllSignups = async () => {
    const data = await getSignups(selectedWaitlist);
    data.sort((a, b) => a.waiting_position - b.waiting_position);
    setAllSignups(data);
  };

  return (
    <UserDataContext.Provider
      value={{
        allWaitlist,
        getWaitlists,
        selectedWaitlist,
        setSelectedWaitlist,
        allSignups,
        getAllSignups,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
