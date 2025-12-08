import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.firstname) nextErrors.firstname = "Name is required.";
    if (!form.email) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";
    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password should be at least 6 characters.";
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Signing up with", form);
    const response = await signup(
      form.firstname,
      form.lastname,
      form.email,
      // username,
      form.password
    );
    if (response.status == 200) {
      navigate("/show-alert", {
        state: {
          message: "Account created successfully! Please login",
          type: "success",
        },
      });
    } else {
      navigate("/show-alert", {
        state: {
          message: "Error in profile creation! Please try again",
          type: "failure",
        },
      });
    }
    alert("Signed up (mock). Integrate API later.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <TextInput
        id="signup-name"
        label="Firstname"
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        placeholder="Alex"
        autoComplete="name"
        required
        error={errors.firstname}
      />
      <TextInput
        id="signup-name"
        label="Lastname"
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        placeholder="Traveller"
        autoComplete="name"
        error={errors.name}
      />
      <TextInput
        id="signup-email"
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email}
      />
      <PasswordInput
        id="signup-password"
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        autoComplete="new-password"
        required
        error={errors.password}
      />
      <PasswordInput
        id="signup-confirm"
        label="Confirm password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        autoComplete="new-password"
        required
        error={errors.confirmPassword}
      />

      <Button type="submit" className="mt-1 w-full justify-center" size="md">
        Create account
      </Button>
    </form>
  );
}
