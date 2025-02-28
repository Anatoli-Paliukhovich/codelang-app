import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "@/components";

const HomeLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className=" flex flex-1">
        <div className="element-container flex flex-1">
          <div className="relative -ml-4">
            <Sidebar></Sidebar>
          </div>
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;
