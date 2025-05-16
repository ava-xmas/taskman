import ButtonComponent from "../components/Button.jsx";
import flatpickr from "flatpickr";

const fp = flatpickr("datetime", {})

const dailyMontlyClass = {}

const inputClass = "py-3 px-2 my-2 w-full bg-gray-600 rounded-lg"

const TaskPage = () => {
    return (
        <>
            <div className="w-full h-full bg-gray-900 flex flex-col justify-start items-center p-3">
                <div className="p-3 m-3 w-full grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <div className="h-12 bg-gray-800 rounded-lg flex flex-row justify-evenly items-center"><span>Daily</span><span>Monthly</span></div>
                    </div>
                    <div className="col-span-1">
                        <h6 className="text-center">Create a task</h6>
                        <div className="task-form flex flex-col items-center">
                            <form action="POST" className="flex flex-col items-center">
                                <input type="text" name="title" id="title" placeholder="Title" className={inputClass} />
                                <textarea cols={30} placeholder="Description" className={inputClass + ""}></textarea>
                                <input type="datetime" name="deadline" id="deadline" className={inputClass} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskPage