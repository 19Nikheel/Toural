import React, { useState } from "react";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.email) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";
    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password should be at least 6 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const success = await login(form.email, form.password);
    if (success.status == 200) {
      navigate("/");
    } else {
      alert("Invalid credentials, please try again.");
    }
    console.log("Logging in with", form);
    alert("Logged in (mock). Integrate API later.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <TextInput
        id="login-email"
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
        id="login-password"
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        autoComplete="current-password"
        required
        error={errors.password}
      />

      <div className="flex items-center justify-between pt-1 text-[0.75rem] text-slate-600 dark:text-slate-400">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="h-3.5 w-3.5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-400 dark:border-slate-600 dark:bg-slate-900"
          />
          <span>Remember me</span>
        </label>
        <button
          type="button"
          className="text-[0.75rem] text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="mt-1 w-full justify-center" size="md">
        Log in
      </Button>
    </form>
  );
}
