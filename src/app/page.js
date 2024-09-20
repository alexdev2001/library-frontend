"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
          'username': username,
          'password': password
        }),
      });

  
      // if response is ok add the generated token produced by the authentication server
      // to the local storage and subsequest request to the API gateway for token validation
      if (response.ok) {
        console.log('fetcing');
        const data = await response.json();
        localStorage.setItem("token", data.token);
        const token = data.token;
        
        const gateway = await fetch("http://localhost:8099/api/books/test", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
          },

        })

        if (gateway.ok) {
          router.push(data.redirectUrl)
        } else {
          setErrorMessage("could not authenticate");
        }
      } else {
        setErrorMessage("login failed check credentials");
      }
    } catch (error) {
      setErrorMessage("an error occured during login");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="font-sans text-black text-4xl">
            Welcome to the library system
          </h1>
        </div>
        <div className="pt-1 items-center">
          <form className="items-center">
            <div className="pl-20">
              <label
                  className={`input input-bordered flex items-center gap-2 text-black `}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-8 text-center text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                  </svg>
                  <input type="text" className="grow"
                      placeholder="Enter username" required
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                  />
              </label>
              <div className="items-center">
                <label
                    className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"/>
                    </svg>
                    <input type="password" className="grow"
                          placeholder="Enter password" required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                    />                              
                </label>
              </div>
              <button  type="submit" onClick={handleLogin} className="btn btn-primary w-full
               text-white border-solid bg-red-600 p-3 mt-3 rounded-md mb-3 hover:bg-white border-2 border-red-500 
               text-md hover:text-black             
               ">
                Login 
              </button>
              {errorMessage && <p style={{color: "red"}} className="text-center">{errorMessage}</p>}
              <p>
                  <a href="" className="text-primary text-red-500 p-4 text-sm mx-20 text-center mb-5 hover:underline">
                      Create account
                  </a>
              </p>
            
            </div>
            
          </form>
        </div>
      </main>
      
    </div>
  );
}
