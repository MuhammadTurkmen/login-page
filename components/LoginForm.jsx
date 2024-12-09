"use client";

import Image from "next/image";
import img from "/public/logo.png";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSUbmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div>
        <Image src={img} alt="logo" className="w-[100px] mx-auto" priority />
        <h1 className="text-center font-bold text-2xl mt-2 md:text-4xl">
          Login
        </h1>
        <form className="flex flex-col gap-2 mt-10" onSubmit={handleSUbmit}>
          {/* email label and input */}
          <label htmlFor="email" className="text-sm text-gray-500 mt-4 ml-2">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            placeholder="123@gmail.com"
          />
          {/* password label and inout */}
          <label htmlFor="password" className="text-sm text-gray-500 mt-5 ml-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="*****************"
          />
          {error && <div className="text-red-500 py-1 px-3 ">{error}</div>}
          <button
            type="submit"
            className="text-white bg-blue-700 py-3 rounded-3xl font-bold mt-5 cursor-pointer"
          >
            Login
          </button>

          <Link href={"/register"} className="text-sm mt-3 text-center">
            Don’t have an account?{" "}
            <span className="text-blue-700 font-bold">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
