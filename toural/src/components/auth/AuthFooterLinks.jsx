import React from "react";

export default function AuthFooterLinks({ mode = "login" }) {
  const isLogin = mode === "login";
  return (
    <div className="mt-4 flex flex-col items-center gap-1 text-[0.75rem] text-slate-600 dark:text-slate-400">
      {isLogin ? (
        <p>
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300"
          >
            Sign up
          </a>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300"
          >
            Log in
          </a>
        </p>
      )}
      <p className="text-[0.7rem] text-slate-400 dark:text-slate-500">
        By continuing, you agree to our Terms & Privacy.
      </p>
    </div>
  );
}
