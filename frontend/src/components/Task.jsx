import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import CollaboratorDialog from "./Dialog";
import { useState } from "react";

const buttonClass = "size-6 m-1 fill-white/50 group-data-hover:fill-white/60";

const TaskComponent = ({ id, title, description, deadlineDate, deadlineTime, defaultOpen = false }) => {
    let taskId = id;

    // function to handle task deletion
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('AUTH_KEY');
            const result = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (result.ok) {
                alert("Task deleted!");
                window.location.reload();
            } else {
                alert("Failed to delete task")
            }
        } catch (error) {
            console.error("An error occurred while trying to delete this task: ", error);
        }
    };

    // fn to open collaborator dialog on click of the plus icon of every task, passing in task id as a argument 
    // have to call the open function inside the Dialog component (how?)

    const [isOpen, setIsOpen] = useState(false);
    function open() {
        setIsOpen(true);
    }
    function close() {
        setIsOpen(false);
    }

    const [selectedTaskId, setSelectedTaskId] = useState(null);

    function openCollabDialog(taskId) {
        console.log("inside open collab dialog");
        setSelectedTaskId(taskId);
        setIsOpen(true);
        // !!! jsx only works when its returned from a render function 
        // don't do something like this -> <CollaboratorDialog taskId={taskId} isOpen={isOpen} open={open} close={close}></CollaboratorDialog>
    }

    return (
        <>{
            isOpen && (
                <CollaboratorDialog
                    taskId={selectedTaskId}
                    isOpen={isOpen}
                    open={() => setIsOpen(true)}
                    close={close}
                />
            )
        }
            <div className="w-full px-4 py-4">
                <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                    <Disclosure as="div" className="p-6" defaultOpen={false}>
                        <DisclosureButton className="group flex w-full items-center justify-between">
                            <span className="text-lg/8 font-medium text-white group-data-hover:text-white">
                                {title}
                            </span>
                            <div className="flex flex-row justify-evenly items-center">
                                <ChevronDownIcon className="size-5 fill-white/50 group-data-hover:fill-white/60 group-data-open:rotate-180"></ChevronDownIcon>
                            </div>
                        </DisclosureButton>
                        <span className="text-sm/6 font-medium text-white/60">
                            Due at {deadlineDate + " " + deadlineTime}
                        </span>
                        <DisclosurePanel className="mt-2 text-md/5 text-white/80">
                            {description}
                        </DisclosurePanel>
                        <div className="flex flex-row justify-end align-center">

                            {/* the below icon is to edit tasks */}
                            {/* <PencilSquareIcon className={buttonClass} /> */}

                            {/* the below icon is to add collaborators to a task */}
                            {/* please note the diff bw onClick={fn} | onClick={(arg) => fn} | onClick={() => fn(arg)} --> they are NOT the same thing !!! */}
                            <button onClick={() => openCollabDialog(taskId)}><img src="https://img.icons8.com/?size=100&id=1501&format=png&color=FFFFFF" alt="" className="w-8 h-8" /></button>

                            {/* the below icon is to delete tasks */}
                            <TrashIcon
                                className={buttonClass}
                                onClick={handleDelete}
                            />
                        </div>
                    </Disclosure>
                </div>
            </div>
        </>)
}

export default TaskComponent;