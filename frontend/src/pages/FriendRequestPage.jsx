import { useEffect, useState } from "react";
import ButtonComponent from "../components/Button.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function setJSON(key, value) {
    window.localStorage.setItem(key, value);
};

const inputClass = "py-3 px-2 my-2 w-full bg-gray-600 rounded-lg"

function FriendRequestPage() {
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const sendFriendRequest = async (username) => {
        try {
            const token = localStorage.getItem('AUTH_KEY');

            const res = await fetch(`http://127.0.0.1:8000/api/home/users/?search=${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const users = await res.json();
            if (!users.length) {
                setErrorMessage("User not found");
                return;
            }

            const userId = users[0].id;
            console.log("User id of requested user is: ", userId)

            const response = await fetch(
                `http://127.0.0.1:8000/api/friend_request/send/${userId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error sending friend request: ', errorData);
                return;
            }

            const data = await response.json();
            console.log('Friend request sent: ', data);
        } catch (error) {
            console.error('Network or server error while sending friend request: ', error)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendFriendRequest(username);
    }


    const [pendingFriendRequests, setPendingFriendRequests] = useState([]);

    const fetchPendingFriendRequests = async () => {
        try {
            const token = localStorage.getItem("AUTH_KEY");
            const response = await fetch("http://127.0.0.1:8000/api/friend_request/show_pending/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || "Unable to fetch friend requests list.")
                return;
            }

            const data = await response.json();
            console.log("Pending friend req data:", data)
            setPendingFriendRequests(data);
            setErrorMessage("");
        } catch (error) {
            console.error("Network or server error: ", error)
            setErrorMessage("An error occured while fetching the friend requests.")
        }
    }

    useEffect(() => {
        fetchPendingFriendRequests();
    }, [])

    const handleAcceptRequest = async (event, id) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/friend_request/accept/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error accepting friend request: ', errorData);
                return;
            }

            const data = await response.json();
            console.log('Friend request accepted: ', data);
        }
        catch (error) {
            console.error("Network or server error: ", error)
            setErrorMessage("An error occured while accepting the friend requests.")
        }
    }

    const handleRejectRequest = async (event, id) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/friend_request/reject/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error rejecting friend request: ', errorData);
                return;
            }

            const data = await response.json();
            console.log('Friend request rejected: ', data);
        }
        catch (error) {
            console.error("Network or server error: ", error)
            setErrorMessage("An error occured while rejecting the friend requests.")
        }
    }

    return (
        <><div className="w-full h-full bg-gray-900 flex flex-col justify-start items-center p-3">
            <div className="p-3 m-3 w-full grid grid-cols-2 gap-4">
                <div className="col-span1">
                    <div className="flex justify-center m-auto h-screen">
                        <form onSubmit={handleSubmit}>
                            <h4>Add a friend using their username</h4>
                            <input
                                type="text"
                                name="receiverUsername"
                                className={inputClass}
                                placeholder="Enter username"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    console.log("Current username", username)
                                }}
                            />
                            <button
                                type="submit"
                                className="bg-black w-40 h-20 rounded-md p-3 m-3 text-white"
                            >
                                Send friend request
                            </button>
                        </form>
                    </div >
                </div>
                <div className="col-span-1 flex flex-col items-center">
                    <h4>Check current pending friend requests</h4>
                    {
                        <div className="w-full">
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            {pendingFriendRequests.length === 0 ? (
                                <p>No incoming friend requests.</p>
                            ) : (


                                pendingFriendRequests.map((request) => (
                                    <div key={request.id} className="flex justify-between bg-gray-600 rounded-lg flex-col items-center m-3 w-full">
                                        <div>
                                            <p className="text-md/8 text-center">{request.sender}</p>
                                            <p>Status: {request.status}</p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={(event) => handleAcceptRequest(event, request.id)}
                                                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={(event) => handleRejectRequest(event, request.id)}
                                                className="bg-gray-500 text-white py-2 px-4 rounded"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}
export default FriendRequestPage