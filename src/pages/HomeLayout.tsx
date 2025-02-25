import { Outlet } from "react-router-dom";
import { Header } from "@/components";
const HomeLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <aside className="text-3xl">Sidebar</aside>
        <div className="element-container bg-amber-400">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default HomeLayout;
