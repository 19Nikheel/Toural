import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

export const UserMenu = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const handleMyTrips = () => {
    setOpen(false);
    navigate("/my-trips");
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-2 py-1 text-xs shadow-sm hover:border-emerald-400 dark:border-white/15 dark:bg-white/5"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-[0.8rem] font-semibold text-slate-950 shadow">
          U
        </div>
        <div className="hidden flex-col text-left leading-tight sm:flex">
          <span className="text-[0.7rem] font-medium text-slate-800 dark:text-slate-50">
            My account
          </span>
          <span className="text-[0.65rem] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
            {user.email}
          </span>
        </div>
        <span className="text-[0.6rem] text-slate-500 dark:text-slate-400">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200/80 bg-white/95 p-2 text-xs shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
          <div className="px-2 pb-2">
            <p className="text-[0.7rem] font-semibold text-slate-800 dark:text-slate-100">
              Signed in as
            </p>
            <p className="truncate text-[0.7rem] text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleMyTrips}
            className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-[0.75rem] hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span>My trips</span>
            <span>🧳</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center justify-between rounded-xl px-2 py-2 text-[0.75rem] text-rose-500 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30"
          >
            <span>Logout</span>
            <span>↩</span>
          </button>
        </div>
      )}
    </div>
  );
};
