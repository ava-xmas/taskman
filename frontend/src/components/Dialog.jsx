// feature to be implemented -> add a saerch for friends by username feature in collaborator dialog box

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const CollaboratorDialog = (props) => {
    // have to use props because i want to call the open and close function from outside this component
    // and a function inside this component cannot be called from outside

    // array for friends list
    let [friendsList, setFriendsList] = useState([]);

    // function to get the list of friends using -> 1. owner 2. post id

    // function to add the task to the collaborator's tasks when the plus icon is clicked

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
                                            <div key={friend.id} className='flex flex-row justify-between items-center px-2 py-4 m-2 rounded-md'>
                                                <span className='text-lg/8'>{friend.name}</span>
                                                <span>{/* if friend is a collaborator already, display a tick otherwise display a plus icon */}</span>
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