import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Sidebar } from "@/components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <div className="wrapper">
      <Header />
      <main className=" flex flex-1">
        <div className="element-container flex flex-1">
          <div className="relative -ml-4">
            <Sidebar></Sidebar>
          </div>
          <div className="flex-1 p-4">
            {isPageLoading ? <Loading /> : <Outlet />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;
