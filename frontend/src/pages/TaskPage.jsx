import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// flatpickr for date
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
// components
import TaskComponent from "../components/Task";

// resusable classes
const inputClass = "py-3 px-2 my-2 w-full bg-gray-600 rounded-lg"

const TaskPage = () => {
    // form stuff
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());

    const createTask = async (e) => {
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
                setTitle("");
                setDescription("");
                setDate(new Date());

                window.location.reload();

            } else {
                const error = await response.json();
                console.error("Error: ", error);
            }
        } catch (error) {
            console.error("Request failed: ", error)
        }
    };

    // fetching tasks stuff
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        const token = localStorage.getItem('AUTH_KEY');
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();

            // sorting the tasks based on deadline date and deadline time
            const sortedTasks = data.sort((a, b) => {
                const deadlineA = new Date(`${a.deadline_date}T${a.deadline_time}`);
                const deadlineB = new Date(`${b.deadline_date}T${b.deadline_time}`);
                return deadlineA - deadlineB;
                // here we're actually subtracting their underlying numeric values
                // which are the number of milliseconds since epoch
                // if < 0 then a should be before b, if > 0 then b should be before a
            });

            console.log(sortedTasks);
            setTasks(sortedTasks);
            setLoading(false);
        } catch (error) {
            console.error("An error occured while trying to fetch tasks:", error);
            setError("Could not load tasks");
            setLoading(false);
        }
    };

    // run once when the page finishes loading
    useEffect(() => {
        fetchTasks();
        fetchFilteredTasks();
    }, []);

    // fetch filtered tasks
    const fetchFilteredTasks = async () => {
        const token = localStorage.getItem('AUTH_KEY');
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tasks/filters/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json(); // this consumes the body (what does that mean?)

            const filteredTasksArray = Object.entries(data).map(([label, tasks]) => ({
                label, tasks
            }));

            console.log(data);
            setFilteredTasks(filteredTasksArray);
            setLoading(false);
        } catch (error) {
            console.error("An error occured while trying to fetch filtered tasks:", error);
            setError("Could not load filtered tasks");
            setLoading(false);
        }
    };
    // let selected = "all";
    const [selected, setSelected] = useState("all");

    return (
        <>
            <div className="w-full h-full bg-gray-900 flex flex-col justify-start items-center p-3">
                <div className="p-3 m-3 w-full grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <div className="flex w-full justify-center p-2">
                            <div className="w-full max-w-md">
                                <TabGroup>
                                    <TabList className="flex gap-4">
                                        <Tab onClick={() => setSelected("all")} className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10">
                                            All
                                        </Tab>
                                        <Tab onClick={() => setSelected("filtered")} className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10">
                                            Filtered
                                        </Tab>
                                    </TabList>
                                    <TabPanels className="mt-3">
                                        {
                                            selected === "all" ?
                                                tasks.map((task, index) => (
                                                    <TaskComponent
                                                        key={task.id}
                                                        id={task.id}
                                                        title={task.title}
                                                        description={task.description}
                                                        deadlineDate={task.deadline_date}
                                                        deadlineTime={task.deadline_time}
                                                    ></TaskComponent>
                                                ))
                                                :
                                                filteredTasks.map(group => (
                                                    <div key={group.label}>
                                                        <h4>{group.label}</h4>
                                                        {group.tasks.length === 0 ? (
                                                            null
                                                        ) : (
                                                            group.tasks.map((task, index) => (
                                                                <TaskComponent
                                                                    key={task.id}
                                                                    id={task.id}
                                                                    title={task.title}
                                                                    description={task.description}
                                                                    deadlineDate={task.deadline_date}
                                                                    deadlineTime={task.deadline_time}
                                                                ></TaskComponent>
                                                            ))
                                                        )}
                                                    </div>
                                                ))
                                        }
                                    </TabPanels>
                                </TabGroup>
                            </div>
                        </div>
                        {/* <div className="h-12 bg-gray-800 rounded-lg flex flex-row justify-evenly items-center"><span>All</span><span>Filtered</span></div>
                        <div className="mt-2 p-3 w-full bg-gray-700 rounded-xl flex flex-col justify-evenly items-center">
                            {tasks.map((task, index) => (
                                <TaskComponent
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    deadlineDate={task.deadline_date}
                                    deadlineTime={task.deadline_time}
                                ></TaskComponent>
                            ))}
                        </div> */}
                    </div>
                    <div className="col-span-1">
                        <h6 className="text-center">Create a task</h6>
                        <div className="task-form flex flex-col items-center">
                            <form onSubmit={createTask} className="flex flex-col items-center">
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