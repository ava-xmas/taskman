import Navbar from "../components/Navbar.jsx";
import SidebarComponent from "../components/Sidebar.jsx";

let isAuthorized = true;

const Layout = ({ children }) => {
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

export default Layout