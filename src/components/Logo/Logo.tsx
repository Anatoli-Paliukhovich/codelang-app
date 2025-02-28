import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="gap-2 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-background">
        {"</>"}
      </Link>
      <span className="font-semibold pt-1 text-background">
        {"codelang".toUpperCase()}
      </span>
    </div>
  );
};
export default Logo;
