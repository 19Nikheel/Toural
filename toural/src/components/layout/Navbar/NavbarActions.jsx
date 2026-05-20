import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { UserMenu } from "../../user/UserMenu";
import ThemeToggle from "../../ui/ThemeToggle";

const NavbarActions = () => {
  const navigate = useNavigate();
  const { userAuthenticated } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-[#F4A261]/25 text-[#777] transition-all duration-200 hover:bg-[#F4A261]/10 hover:border-[#F4A261]/40">
        {/* keep your ThemeToggle inside styled wrapper */}
        <div className="scale-90">
          <ThemeToggle />
        </div>
      </div>

      {!userAuthenticated ? (
        <>
          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 rounded-xl text-sm font-medium bg-white/80 backdrop-blur-md border border-[#F4A261]/30 text-[#333] transition-all duration-200 hover:bg-[#F4A261]/10 hover:text-[#C9622A] hover:border-[#F4A261]/50"
          >
            Login
          </button>

          {/* Signup CTA */}
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-1.5 rounded-xl text-sm font-medium bg-[#F4A261] text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)] transition-all duration-200 hover:bg-[#e8903e] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(244,162,97,0.5)]"
          >
            SignUp
          </button>
        </>
      ) : (
        <UserMenu />
      )}
    </div>
  );
};

export default NavbarActions;
