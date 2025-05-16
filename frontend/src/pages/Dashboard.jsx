import Navbar from "../components/Navbar";

const user = {};

const divClasses = "rounded-lg bg-gray-800 h-[150px] flex justify-center items-center";

const Dashboard = () => {
    return (
        <>
            <div className="w-full h-full bg-gray-900 flex flex-col justify-start items-center">
                <div className="p-3 m-3 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className={"h-[150px] col-span-2 sm-col-span-3 md:col-span-4 " + divClasses} id="profile">Profile + Tasks whose deadline is today + Friend requests</div>
                    <div className={"col-span-1 " + divClasses}>Tasks completed on time</div>
                    <div className={"col-span-2 " + divClasses}>G-Meet Links</div>
                    <div className={"col-span-1 " + divClasses}>Friends list ?</div>
                </div>
            </div >
        </>
    );
}

export default Dashboard