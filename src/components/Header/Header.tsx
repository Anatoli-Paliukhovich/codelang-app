import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logoutUser } from "@/features/user/userSlice";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Logo from "../Logo/Logo";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);
  const handleUser = () => {
    dispatch(logoutUser());
    toast("You are logged out!");
    navigate("/");
  };
  return (
    <header className="bg-primary shadow-md z-30">
      <div className="element-container flex justify-between items-center">
        <Logo />
        <div className="flex justify-center items-center sm:justify-end py-5 font-medium">
          {user ? (
            <div className="flex items-center gap-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUser}
                className="cursor-pointer bg:--accent text-primary"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6 ">
              <Button
                className="cursor-pointer bg:--accent text-primary"
                asChild
                variant="outline"
                size="sm"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="cursor-pointer bg:--accent text-primary"
                asChild
                variant="outline"
                size="sm"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
