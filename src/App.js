import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import TopNav from "./components/topNav";
import Create from "./pages/Create";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import Signups from "./components/signups";
import ComponentNav from "./components/ComponentNav";
import Waitlist from "./pages/Waitlist";
import { UserDataProvider } from "./context/useUserData";
import General from "./components/general";
import Widget from "./components/widget";
import Signup from "./pages/signup/signup";
import Signin from "./pages/signup/signin";

function App() {
  return (
    <Router>
      <UserDataProvider>
        <div className="App h-screen w-full flex">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <div className="h-full w-full">
                    <TopNav />
                    <div className="px-5 py-5 lg:px-8 ">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route
                          path="/waitlist"
                          element={<Waitlist />}
                          render={<Navigate to="/waitlist/general" />}
                        >
                          <Route index path="general" element={<General />} />
                          <Route path="widget" element={<Widget />} />
                          <Route path="signups" element={<Signups />} />
                        </Route>
                      </Routes>
                    </div>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </UserDataProvider>
    </Router>
  );
}

export default App;
