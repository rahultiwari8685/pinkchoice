"use client";

import { useState } from "react";

interface PasswordInputBoxProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

export default function PasswordInputBox({
  placeholder,
  value = "",
  onChange,
  name = "password",
}: PasswordInputBoxProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        className="form-control dz-password"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />

      <div
        className={`show-pass ${showPassword ? "active" : ""}`}
        onClick={() => setShowPassword(!showPassword)}
      >
        <i
          className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
        />
      </div>
    </>
  );
}
