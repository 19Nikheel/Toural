import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "user",
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

    if (!form.firstname?.trim())
      nextErrors.firstname = "Firstname is required.";
    if (!form.lastname?.trim()) nextErrors.lastname = "Lastname is required.";

    if (!form.email?.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!form.phone?.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^\+?\d{7,15}$/.test(form.phone.trim())) {
      // basic international-ish phone validation
      nextErrors.phone = "Enter a valid phone number (7-15 digits).";
    }

    if (!form.role) {
      nextErrors.role = "Please select a role.";
    } else if (!["admin", "user", "guide"].includes(form.role)) {
      nextErrors.role = "Invalid role selected.";
    }

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

    // call signup - make sure your AuthContext.signup accepts these args
    try {
      const response = await signup({
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        type: form.role,
        password: form.password,
      });

      // If your signup returns a response object, adjust checks accordingly
      if (response && (response.status === 200 || response.ok)) {
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
    } catch (err) {
      console.error("Signup failed:", err);
      navigate("/show-alert", {
        state: {
          message: "Error in profile creation! Please try again",
          type: "failure",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <TextInput
          id="signup-firstname"
          label="Firstname"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          placeholder="Alex"
          autoComplete="given-name"
          required
          error={errors.firstname}
        />
        <TextInput
          id="signup-lastname"
          label="Lastname"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          placeholder="Traveller"
          autoComplete="family-name"
          required
          error={errors.lastname}
        />
      </div>

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

      <div className="grid gap-3 md:grid-cols-2">
        <TextInput
          id="signup-phone"
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91-98xxxxxxxx"
          autoComplete="tel"
          required
          error={errors.phone}
        />

        <div>
          <label
            htmlFor="signup-role"
            className="mb-1 block text-[0.8rem] font-medium text-slate-700 dark:text-slate-200"
          >
            Role
          </label>
          <select
            id="signup-role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[0.9rem] outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          >
            <option value="user">User</option>
            <option value="guide">Guide</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-[0.75rem] text-red-500">{errors.role}</p>
          )}
        </div>
      </div>

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
