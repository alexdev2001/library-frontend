"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "../app/images/logo.png";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state for toggling password visibility
  const router = useRouter();

  // function for login logic
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // submit to authentication server
      // change the endpoint in production
      const response = await fetch("http://localhost:8181/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });

      // if response is ok add the generated token produced by the authentication server
      // to the local storage and subsequest request API for token validation
      if (response.ok) {
        console.log("fetcing");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        const token = data.token;

        const gateway = await fetch("http://localhost:8099/api/books/test", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (gateway.ok) {
          router.push(data.redirectUrl);
        } else {
          setErrorMessage("could not authenticate");
        }
      } else {
        setErrorMessage("login failed check credentials");
      }
    } catch (error) {
      setErrorMessage("an error occured during login");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center items-center ml-40">
          <Image src={logo} className="w-24 h-20 items-end" />
        </div>
        <div className="h-2"></div>
        <div>
          <h1 className=" text-black text-4xl font-custom">
            Officer Analysis System
          </h1>
        </div>
        <div className="pt-1 items-center">
          <form className="items-center">
            <div className="pl-20">
              <label
                className={`input input-bordered flex items-center gap-2 text-black bg-white border-green-900`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-6 text-center text-green-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <input
                  type="text"
                  className="grow p-2 bg-white"
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <div className="h-3"></div>
              <div className="items-center">
                <label
                  className={`input input-bordered flex text-center gap-2 pt-2 text-black bg-white border-green-900`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-6 text-green-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="grow p-2 "
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                    className="ml-2 text-green-900 focus:outline-none"
                  >
                    {showPassword ? (
                      // Eye Off Icon (when password is visible)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.9a9.72 9.72 0 0 1 2.776-3.586 10.13 10.13 0 0 1 7.49-2.314 10.13 10.13 0 0 1 7.491 2.314A9.72 9.72 0 0 1 21.28 8.9m0 6.2a9.72 9.72 0 0 1-2.776 3.586 10.13 10.13 0 0 1-7.491 2.314A10.13 10.13 0 0 1 3.98 15.1M12 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-9 9 18-18"
                        />
                      </svg>
                    ) : (
                      // Eye Icon (when password is hidden)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3C6 3 1.5 9 1.5 12s4.5 9 10.5 9 10.5-6 10.5-9-4.5-9-10.5-9zm0 15c-3.5 0-6.5-2.5-6.5-6s3-6 6.5-6 6.5 2.5 6.5 6-3 6-6.5 6zm1.5-6c0 .8-.7 1.5-1.5 1.5S11 12.8 11 12s.7-1.5 1.5-1.5S13.5 11.2 13.5 12z" 
                        />
                      </svg>
                    )}
                  </button>
                </label>
              </div>
              <div className="h-3"></div>
              <button
                type="submit"
                onClick={handleLogin}
                className="btn w-full
               hover:text-white border-solid bg-black p-3 mt-3 rounded-md mb-3  border-2 border-green-900 
               text-md text-white  font-custom   hover:shadow-lg         
               "
              >
                Login
              </button>
              {errorMessage && (
                <p style={{ color: "red" }} className="text-center">
                  {errorMessage}
                </p>
              )}
              <div className="h-2"></div>
              <p>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/register");
                  }}
                  className="text-primary p-4 text-sm mx-20 text-center mb-5 hover:underline font-custom"
                >
                  Create an account
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
