import ButtonComponent from "../components/Button.jsx";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function setJSON(key, value) {
    window.localStorage.setItem(key, value);
};
function LoginPage() {
    const loginApiUrl = "http://127.0.0.1:8000/api/home/token/";
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const headers = {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*',
            // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
        }

        try {
            const response = await fetch(loginApiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                // safely try to parse error response if its JSON
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    console.error("Login error:", errorData);
                    alert("Login failed: " + (errorData.detail || "Check console."));
                } else {
                    const errorText = await response.text();
                    console.error("Non-JSON login error", errorText);
                    alert("Login failed: Non-JSON response.");
                }
                return;
            }

            // on a successful login
            const result = await response.json();

            // save the token and the username
            setJSON('AUTH_KEY', result.access);
            setJSON('USER_NAME', username);

            alert("Login Sucsessfull");
        } catch (error) {
            console.error("Network or server error: ", error);
            alert("A network error occured, check console for details.");
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