// feature to be implemented -> add a saerch for friends by username feature in collaborator dialog box

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'

const CollaboratorDialog = (props) => {

    const token = localStorage.getItem('AUTH_KEY');
    // have to use props because i want to call the open and close function from outside this component
    // and a function inside this component cannot be called from outside

    // array for friends list
    let [friendsList, setFriendsList] = useState([]);
    // array for collab list
    let [collabList, setCollabList] = useState([]);
    let [finalList, setFinalList] = useState([]);

    // get the friends list everytime the component is rendered
    useEffect(() => {
        getFriendsList().then(() => {
            getCollabForTask(props.taskId).then(() => {
                console.log("hello");

                // Check matches
                for (let i = 0; i < friendsList.length; i++) {
                    for (let j = 0; j < collabList.length; j++) {
                        console.log(`${friendsList[i].friend_id} is related to ${collabList[j].colab_id}`);
                    }
                }

                // collect all colab_ids first
                const newFinalList = collabList.map(colab => colab.colab_id);
                console.log("newFinalList: ", newFinalList);

                // update state once
                setFinalList(newFinalList);

                console.log("This is the collab list: ", newFinalList);
            });
        });
    }, [])

    // function to get the list of friends 
    const getFriendsList = async () => {
        try {
            const token = localStorage.getItem('AUTH_KEY');
            const result = await fetch(`http://127.0.0.1:8000/api/friend_request/get/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (result.ok) {
                console.log("Friend list is here!");
                const data = await result.json();
                console.log("Friend list: ", data);
                setFriendsList(data);
            } else {
                console.log("Failed to get friends.")
            }
        } catch (error) {
            console.error("An error occurred while trying to get friends list: ", error);
        }
    }

    // function to get collaborators on this particular task
    const getCollabForTask = async (taskId) => {
        try {
            const token = localStorage.getItem('AUTH_KEY');
            const result = await fetch(`http://127.0.0.1:8000/api/tasks/colab/get/${taskId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (result.ok) {
                console.log("Collab list is here!");
                const data = await result.json();
                setCollabList(data);
                console.log("Collab list: ", data);

            } else {
                console.log("Failed to get collab list.")
            }
        } catch (error) {
            console.error("An error occurred while trying to get collab list: ", error);
        }
    }

    // function to add the task to the collaborator's tasks when the plus icon is clicked
    const addCollab = async (friendId, taskId) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/tasks/colab/${taskId}/${friendId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({})
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error adding collaborator: ', errorData);
                return;
            }

            const data = await response.json();
            console.log('Collab added: ', data);
        } catch (error) {
            console.error("Network or server error: ", error)
            setErrorMessage("An error occured while adding collaborator.")
        }
    }

    return (
        <>
            <Dialog
                key={props.taskId} tasktId={props.taskId} open={props.isOpen} as='div' className="relative z-10 focus:outline-none" onClose={props.close}
            >
                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                        <DialogPanel transition className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform=[scale(95%)] data-closed:opacity-0">
                            <DialogTitle as='h3' className='text-base/7 font-medium text-white'>
                                Add Collaborators
                            </DialogTitle>
                            <div>
                                {
                                    friendsList.map((friend) => {
                                        return (
                                            <div key={friend.friend_user_id} className='flex flex-row justify-between items-center px-2 py-4 m-2 rounded-md'>
                                                <span className='text-lg/8'>{friend.friend}</span>
                                                <span className='flex flex-row'>{/* if friend is a collaborator already, display a tick otherwise display a plus icon */}
                                                    {
                                                        finalList.includes(friend.friend_user_id) ? (
                                                            <button><img
                                                                src="https://img.icons8.com/?size=100&id=3061&format=png&color=FFFFFF"
                                                                alt=""
                                                                className="size-8"
                                                            /></button>
                                                        ) : (

                                                            <button onClick={() => addCollab(friend.friend_user_id, props.taskId)}><img
                                                                src="https://img.icons8.com/?size=100&id=3220&format=png&color=FFFFFF"
                                                                alt=""
                                                                className="size-8"
                                                            /></button>
                                                        )
                                                    }
                                                </span>
                                                {/* when the plus icon is clicked, add the task using task id to the friend's task list as well */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='mt-4'>
                                <button onClick={props.close}>Close</button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CollaboratorDialog