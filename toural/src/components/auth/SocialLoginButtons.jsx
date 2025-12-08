import React from "react";
import Button from "../ui/Button";
import Divider from "../ui/Divider";

export default function SocialLoginButtons() {
  return (
    <div className="mt-4">
      <Divider label="or continue with" />
      <div className="mt-3 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="md"
          className="w-full justify-center border border-slate-200 bg-white text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
        >
          <span className="text-lg">🟦</span>
          <span className="text-xs font-medium">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}
