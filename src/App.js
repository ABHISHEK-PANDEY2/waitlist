import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import TopNav from "./components/topNav";
import Create from "./pages/Create";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Signups from "./components/signups";
import ComponentNav from "./components/ComponentNav";
import Waitlist from "./pages/Waitlist";
import { UserDataProvider } from "./context/useUserData";

function App() {
  return (
    <Router>
      <UserDataProvider>
        <div className="App h-screen w-full flex">
          <Navbar />
          <div className="h-full w-full">
            <TopNav />
            <div className="px-8 py-5 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/waitlist" element={<Waitlist />}>
                  <Route path="signups" element={<Signups />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </UserDataProvider>
    </Router>
  );
}

export default App;
