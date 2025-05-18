import { useState } from "react";

// flatpickr for date
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const dailyMontlyClass = {}

const inputClass = "py-3 px-2 my-2 w-full bg-gray-600 rounded-lg"

const TaskPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const createTaskApiUrl = "http://127.0.0.1:8000/api/tasks/";
        const token = localStorage.getItem("AUTH_KEY");

        // getting the deadline date and time separately
        const datetime = date[0]; // from flatpickr
        const deadlineDate = datetime.toISOString().split("T")[0];
        const deadlineTime = datetime.toTimeString().split(" ")[0];

        const taskData = {
            title,
            description,
            deadline_date: deadlineDate,
            deadline_time: deadlineTime,
        };

        try {
            const response = await fetch(createTaskApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Task created: ", result);
                // either reset form or redirect
            } else {
                const error = await response.json();
                console.error("Error: ", error);
            }
        } catch (error) {
            console.error("Request failed: ", error)
        }
    };

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
                            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputClass}
                                    required />
                                <textarea
                                    cols={30}
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={inputClass}
                                ></textarea>
                                <Flatpickr
                                    data-enable-time
                                    value={date}
                                    onChange={(date) => setDate(date)}
                                    className={inputClass}
                                ></Flatpickr>
                                <button
                                    type="submit"
                                    className={inputClass}
                                >Create Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskPage