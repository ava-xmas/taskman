import Navbar from "../components/Navbar.jsx";
import SidebarComponent from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";

let isAuthorized = true;

const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
const IS_ADMIN = window.localStorage.getItem('USER_NAME');

const Layout = ({ children }) => {
    let navigate = useNavigate(); 
    if (!AUTH_KEY || IS_ADMIN !== true) {
            alert('Access denied. Please log in to access this page.');
            navigate('/login') // Redirect to login page
    } else {
        return (<>
            <Navbar></Navbar >
            <div className="flex flex-row">
                {/* if not authorized dont show the sidebar !!! */}
                {isAuthorized ? <div className="hidden sm:block sm:w-1/4 sm:max-w-1/5 sm:flex-auto sm:h-screen"><SidebarComponent></SidebarComponent></div> : <div></div>}

                <div className="flex-auto grow">{children}</div>
            </div>
        </>
        );
    }
}

export default Layout