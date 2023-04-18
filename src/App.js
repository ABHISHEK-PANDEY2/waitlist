import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import TopNav from "./components/topNav";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App h-screen w-full flex">
      <Navbar />
      <div className="h-full w-full">
        <TopNav />
        <div className="px-8 py-5 ">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
