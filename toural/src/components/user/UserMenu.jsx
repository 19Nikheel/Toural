import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const UserMenu = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 rounded-xl border border-[#F4A261]/25 bg-white/80 backdrop-blur-md px-2 py-1 text-xs shadow-sm transition-all duration-200 hover:bg-[#F4A261]/10 hover:border-[#F4A261]/40"
      >
        {user.pic && user.pic !== "NA" ? (
          <img
            src={user.pic}
            alt="profile"
            className="h-7 w-7 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#F4A261] text-[0.8rem] font-semibold text-white shadow-[0_2px_8px_rgba(244,162,97,0.4)]">
            {user.name?.charAt(0) || "U"}
          </div>
        )}

        <div className="hidden flex-col text-left leading-tight sm:flex">
          <span className="text-[0.7rem] font-medium text-[#1a1a1a]">
            {user.name || "My account"}
          </span>
        </div>
      </button>
    </div>
  );
};
