import Navbar from "../components/Navbar.jsx";
import ButtonComponent from "../components/Button.jsx";

const featureBullets = [
    "Plan smarter with intuitive task boards",
    "Collaborate easily with real-time updates",
    "Stay on track with due dates and reminders",
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function LandingPage() {
    return (
        <>
            <div className="flex flex-col justify-start items-center bg-gray-900 h-screen px-[30px]">
                <div className="flex flex-col my-[100px]">
                    <h1 className="text-7xl my-3 mx-3 py-3 px-3 text-center" >Stay Organized. Get More Done.</h1>
                    <h4 className="text-3xl my-3 mx-[50px] py-3 px-3" >A powerful yet simple task manager to streamline your workflow and keep your team in sync.</h4>
                    <div className="grid grid-cols-3 gap-4 mx-[60px] my-6">
                        {featureBullets.map((item) => (
                            <span className='text-xl rounded-md px-3 py-6 my-1 text-sm text-center align-center items-center flex flex-col justify-center font-medium bg-gray-800'>{item}</span>
                        ))}
                    </div>
                </div>
                <ButtonComponent buttonText={"GET STARTED"}></ButtonComponent>
            </div >
        </>
    );
}

export default LandingPage