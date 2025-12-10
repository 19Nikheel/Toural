import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ThemeToggle from "../../ui/ThemeToggle";
import { useAuth } from "../../../context/AuthContext";
import { UserMenu } from "../../user/UserMenu";

const NavbarActions = () => {
  const navigate = useNavigate();
  const { userAuthenticated } = useAuth();

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {!userAuthenticated ? (
        <>
          <Button size="sm" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button size="sm" onClick={() => navigate("/signup")}>
            Start planning
          </Button>
        </>
      ) : (
        <UserMenu />
      )}
    </div>
  );
};
export default NavbarActions;
