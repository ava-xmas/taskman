import ButtonComponent from "../components/Button.jsx";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SignupPage(){
    function PostCred() {
        const postdatalink = "http://127.0.0.1:8000/api/register"
        const handleSubmit = async (event) => {
            event.preventDefault();
            const username = event.target.username.value;
            const password = event.target.password.value;
            const formData = {'username': username, 'password': password}
            try {
              const response = await axios.post(postdatalink,
                formData
              );
              console.log(response.data);
            } catch (error) {
              console.error("Error posting data:", error);
            }
        };
    }
    
    return (
        
        <>
            <div className="flex items-center justify-center h-screen">
                <form>
                <div className="w-full max-w-sm min-w-[200px]">
                <input type="text" name="username" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter username"/>
                </div>
                <div className="w-full max-w-sm min-w-[200px]">
                <input type="password" name="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Enter password"/>
                </div>
                <input type="button" value="" />
                </form>
            </div>
        </>
    )
}

export default SignupPage;