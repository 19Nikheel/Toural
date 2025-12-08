import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import SignupForm from "../components/auth/SignupForm";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create your TripCraft account"
        subtitle="Save trips, compare itineraries, and book smarter."
      />
      <SignupForm />
      <SocialLoginButtons />
      <AuthFooterLinks mode="signup" />
    </AuthLayout>
  );
}
