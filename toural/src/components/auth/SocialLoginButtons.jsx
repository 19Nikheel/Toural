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
          className="w-full justify-center border border-[#F4A261]/25 bg-white/80 backdrop-blur-md text-[#333] hover:bg-[#F4A261]/10 hover:text-[#C9622A] hover:border-[#F4A261]/50"
        >
          <span className="text-lg">🟦</span>
          <span className="text-xs font-medium">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}
