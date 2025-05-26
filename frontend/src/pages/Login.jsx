import { useEffect } from "react";
import { useAuth } from "../app/Provider.jsx";
import ButtonComponent from "../components/Button.jsx";
import { replace, useLocation, useNavigate } from "react-router-dom";

const inputClass = "py-3 px-2 my-2 w-full bg-gray-600 rounded-lg"

const LoginPage = () => {
    // auth
    const { auth, setAuth } = useAuth();

    // logged in users should not be able to access this page
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.token) {
            navigate('/dashboard', { replace: true });
        }
    }, [])

    // page related stuff
    const [authResponse, setAuthResponse] = useState(null);
    const [login, setLogin] = useState("");

    const onChangeLogin = (e) => {
        e.preventDefault();
        const username = e.target.value;
        setLogin(username);
    };

    const [password, setPassword] = useState("");
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const postUser = async (user) => {
        try {
            const loginApiUrl = "http://127.0.0.1:8000/api/home/token/";
            const response = await fetch(loginApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: login, password: password, })
            })

            if (!response.ok) {
                const errorMessage = await response.json();
                setAuthResponse("An error occurred while trying to log in: ", errorMessage);
                return null;
            } else {
                const data = await response.json();
                setAuthResponse("Logged in successfully.")
                return data;
            }
        } catch (e) {
            console.log("Caught an error while trying to log in: ", e)
        }
    }

    const onLogin = (e) => {
        e.preventDefault();

        const user = {
            login: login,
            password: password,
        };

        (async () => {
            const data = await postUser(user);
            const token = data.access;
            setAuth({ token: token });
            localStorage.setItem("username", login);
        })
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center text-md">
                <form action="POST" onSubmit={onLogin}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" className={inputClass} value={login} onChange={onChangeLogin} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className={inputClass} value={password} onChange={onChangePassword} />
                    <span className="text-sm text-black/70">{authResponse}</span>
                    <span className="text-sm text-blue-800 text-right">Not a user? Sign up instead.</span>
                    <button>Log in</button>
                </form>
            </div>
        </>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function setJSON(key, value) {
    window.localStorage.setItem(key, value);
};

function Login() {
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