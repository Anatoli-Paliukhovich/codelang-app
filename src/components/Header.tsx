import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [user, setUser] = useState<string | null>("User");
  const navigate = useNavigate();

  const handleUser = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <header className="bg-blue-400 ">
      <div className="element-container flex justify-center items-center sm:justify-end py-5 font-medium">
        {user ? (
          <div className="flex items-center gap-x-3">
            <div className="">Hello, {user}</div>
            <Button
              variant="link"
              size="sm"
              onClick={handleUser}
              className="cursor-pointer"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <Button asChild variant="link" size="sm">
              <Link to="/login">Sign in / Guest</Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
