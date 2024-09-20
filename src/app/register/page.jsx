
export default function Page() {
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
                        <input type="email" placeholder="email" className="p-2 grow"></input>
                    </label>
                    
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input type="username" placeholder="username" className="p-2 grow "></input>
                    </label>
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input type="password" placeholder="password" className="p-2 grow"></input>
                    </label>
                    <label className={`input input-bordered flex text-center gap-2 pt-2 text-black`}>
                        <input type="password" placeholder="verify password" className="p-2 grow"></input>
                    </label>
                    
                    <button className="btn btn-primary w-full
               hover:text-white border-solid hover:bg-red-600 p-3 mt-3 rounded-md mb-3 bg-white border-2 border-red-500 
               text-md text-black ">
                        Register
                    </button>
                </form>
            </main>
           
        </div>
    )
}