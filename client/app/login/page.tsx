"use client";

import { FormEvent, useState } from "react";
import { Button, AppIcon, Card, Input } from "../_components";
import LoginGoogle from "../_components/login-google-icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../_lib/hook";
import { loging, setAvatar } from "../_lib/features/user/logged";
import axios from "axios";

export default function Login() {
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  if (typeof window === "undefined") {
  }
  const token = localStorage.getItem("token");
  if (token) {
    router.replace("/");
  }

  async function handleOnsubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("formvalue", formValue);
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        JSON.stringify({
          username: formValue.username,
          password: formValue.password,
        }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      localStorage.setItem("token", data.data.access_token);
      const avatar =
        "https://cdn3.iconfinder.com/data/icons/shinysocialball/512/Technorati_512x512.png";
      localStorage.setItem("avatar", avatar);
      dispatch(loging(data.data.access_token));
      dispatch(setAvatar(avatar));
      router.replace("/");
    } catch (error) {
      setError("error");
    }
  }

  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <Card>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-2 dark:bg-gray-800 dark:border-gray-700">
        <AppIcon />
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account{" "}
            <span className="text-red-600">{error}</span>
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleOnsubmit}
          >
            <Input
              name="username"
              type="text"
              placeHolder="username"
              lableName="Username"
              required={true}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              lableName="Password"
              placeHolder="••••••••"
              onChange={handleChange}
              required={true}
            />
            <Button name="Log in" type="submit"></Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
          <LoginGoogle />
        </div>
      </div>
    </Card>
  );
}
