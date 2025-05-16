import ButtonComponent from "../components/Button.jsx";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function setJSON(key, value) {
    window.localStorage.setItem(key, value);
};
function LoginPage() {
    const loginApiUrl = "http://127.0.0.1:8000/api/home/login/";
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const headers = {'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
        try {
            const response = await fetch(loginApiUrl, {
                statusCode: 200, 
                method: "POST",
                headers: headers,
                body: JSON.stringify({ username, password}),
            });

            if (response.ok) {
                console.log(response)
                const result = await response.json();
                alert('Login successful');
                setJSON('AUTH_KEY', result.access);
                
            } else {
                const errorData = await response.json();
                console.error("Login error:", errorData);
                alert("Error during login. Check console for details.");
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Enter username"
                    />
                    <input
                        type="password"
                        name="password"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Enter password"
                    />
                    <button
                        type="submit"
                        className="bg-black w-40 h-20 rounded-md p-3 m-3 text-white"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </>
    )
}
export default LoginPage