import ButtonComponent from "../components/Button.jsx";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function LoginPage(){
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-sm min-w-[200px]">
                <input type="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter username"/>
                </div>
                <div className="w-full max-w-sm min-w-[200px]">
                <input type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter password"/>
                </div>
                <ButtonComponent buttonText="Login!"></ButtonComponent>
            </div>
            
        </>
    )
}
export default LoginPage