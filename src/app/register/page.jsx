"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Page() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMeassage] = useState("");
    const router = useRouter();

    // define a function for handling registration
    const handleRegistration = async (event) => {
        event.preventDefault;

        const main_pass = document.getElementById('main_pass').value;
        const verify_pass = document.getElementById('verify_pass').value;
        
        if (main_pass != verify_pass) {
            setErrorMessage('passwords do not match');
            setTimeout(20);
            return;
            
        }
        

        // fetch registration endpoint 
        try {
            // change the url during 
            const register = await fetch('http://localhost:8181/api/usermanagement/add', {
                method: "POST",
                body: new URLSearchParams({
                    'email': email,
                    'username': username,
                    'password': password,
                })
            });

            if (register.ok) {
                setSuccessMeassage('User successfully created');
                // go to the login 
                setTimeout(18);
                window.location.href = '/';
            } else {
                setErrorMessage('An error occured');
            }

        

        } catch (error) {
            setErrorMessage('An error occured')
        }
    }

    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className={'flex flex-col gap-8 row-start-2 items-center sm:items-start'}>
                <div className="text-center">
                    <h1 className="font-sans text-black text-4xl mb-1 text-center">
                        Create account
                    </h1>
                </div>
                <form className="text-center">
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input type="email" placeholder="email" className="p-2 grow" onChange={(e) => {setEmail(e.target.value)}}></input>
                    </label>
                    
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input type="username" placeholder="username" className="p-2 grow " onChange={(e) => {setUsername(e.target.value)}}></input>
                    </label>
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input id="main_pass" type="password" placeholder="password" className="p-2 grow" onChange={(e) => {setPassword(e.target.value)}}></input>
                    </label>
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input id="verify_pass" type="password" placeholder="verify password" className="p-2 grow"></input>
                    </label>
                    {errorMessage && <p style={{color: "red"}} className="text-center m-2 mb-0">{errorMessage}</p>}
                    {successMessage && <p style={{color: "green"}} className="text-center m-2 mb-0">{successMessage}</p>}
                    
                    <button className="btn btn-primary w-full
               hover:text-white border-solid hover:bg-red-600 p-3 mt-3 rounded-md mb-3 bg-white border-2 border-red-500 
               text-md text-black " onClick={handleRegistration}>
                        Register
                    </button>
                </form>
            </main>
           
        </div>
    )
}