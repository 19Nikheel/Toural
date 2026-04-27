import React from "react";

export default function AuthFooterLinks({ mode = "login" }) {
  const isLogin = mode === "login";
  return (
    <div className="mt-4 flex flex-col items-center gap-1 text-[0.75rem] text-[#777]">
      {isLogin ? (
        <p>
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-[#C9622A] underline-offset-2 hover:underline"
          >
            Sign up
          </a>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-[#C9622A] underline-offset-2 hover:underline"
          >
            Log in
          </a>
        </p>
      )}
      <p className="text-[0.7rem] text-[#aaa]">
        By continuing, you agree to our Terms & Privacy.
      </p>
    </div>
  );
}
