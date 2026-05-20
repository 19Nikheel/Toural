import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

export default function UserProfilePage() {
  const { user } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          {user.pic && user.pic !== "NA" ? (
            <img
              src={user.pic}
              alt="profile"
              className="h-16 w-16 rounded-xl object-cover border border-[#F4A261]/30"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#F4A261] text-white text-lg font-semibold shadow-[0_4px_14px_rgba(244,162,97,0.4)]">
              {user.name?.charAt(0) || "U"}
            </div>
          )}

          <div>
            <h1 className="text-xl font-serif font-semibold">
              {user.name || "User"}
            </h1>
            <p className="text-sm text-[#777]">{user.email}</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="rounded-2xl border border-[#F4A261]/20 bg-white/80 backdrop-blur-[24px] p-6 shadow-[0_8px_30px_rgba(244,162,97,0.15)] space-y-5">
          <h2 className="text-sm font-semibold text-[#C9622A]">
            Profile Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#555]">
            <div>
              <p className="text-[#777] text-xs">Full Name</p>
              <p>{user.name || "NA"}</p>
            </div>

            <div>
              <p className="text-[#777] text-xs">Email</p>
              <p>{user.email || "NA"}</p>
            </div>

            <div>
              <p className="text-[#777] text-xs">Phone</p>
              <p>{user.phoneNo || "NA"}</p>
            </div>

            <div>
              <p className="text-[#777] text-xs">Date of Birth</p>
              <p>{user.dob || "NA"}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[#777] text-xs">Address</p>
              <p className="break-words">{user.address || "NA"}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/my-trips")}
            className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-[#F4A261]/30 text-[#333] transition-all duration-200 hover:bg-[#F4A261]/10 hover:text-[#C9622A] hover:border-[#F4A261]/50"
          >
            My Trips
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-[#F4A261] text-white shadow-[0_4px_14px_rgba(244,162,97,0.4)] transition-all duration-200 hover:bg-[#e8903e] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(244,162,97,0.5)]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
