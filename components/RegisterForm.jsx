"use client";

import Link from "next/link";
import img from "/public/logo.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div>
        <Image src={img} alt="logo" className="w-[100px] mx-auto" priority />
        <h1 className="text-center font-bold text-2xl mt-2 md:text-3xl">
          Register Your Account
        </h1>
        <p className="text-center text-gray-400 text-sm my-2">
          unleash your inner sloth right now
        </p>
        <form className="flex flex-col gap-2 mt-10" onSubmit={handleSubmit}>
          {/* Name label and input */}
          <label htmlFor="name" className="text-sm text-gray-500 mt-4 ml-2">
            Full Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="John Smith"
          />
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
            Register
          </button>

          <Link href={"/"} className="text-sm mt-3 text-center">
            Have an account?{" "}
            <span className="text-blue-700 font-bold">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
