import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import LoginForm from "../components/auth/LoginForm";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back to TripCraft"
        subtitle="Log in to access your saved trips and personalised itineraries."
      />
      <LoginForm />
      <SocialLoginButtons />
      <AuthFooterLinks mode="login" />
    </AuthLayout>
  );
}
