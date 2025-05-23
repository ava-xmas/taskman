import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button.jsx';
import { useLocation, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// navigation items
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const buttonClassName = "rounded-md p-2 m-2 px-3 hover:bg-gray-700";

const Navbar = () => {

    // creating an instance of location to detect the route
    const location = useLocation();
    console.log(location);

    // converting title into stateful
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (location.pathname === "/") {
            setTitle("");
        } else if (location.pathname === "/dashboard") {
            setTitle("Dashboard");
        } else if (location.pathname === "/tasks") {
            setTitle("Tasks");
        }

        const storedUsername = localStorage.getItem('USER_NAME');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [location]);

    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-8xl px-1 sm:px-3 lg:px-4">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <span className="text-2xl text-white text-center">TaskMan</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <span className="text-2xl text-white text-center">{title}</span>
                            </div>
                        </div>
                    </div>

                    {/* conditional, displays diff things based on if the user is logged in or not */}

                    {username ? (
                        <div className="absolute inset-y-0 right-0 flex flex-row items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link to="/friend-request"><img src="https://www.svgrepo.com/show/107838/add-friend.svg" alt="" srcset="" className='w-6 m-3' /></Link>
                            <span className='text-white mr-4'> Hello, {username} </span>
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://www.svgrepo.com/show/512729/profile-round-1342.svg"
                                            className="size-8 rounded-full"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Your Profile
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>

                    ) : (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <><Link to="/login">
                                <button className={buttonClassName}>Log in</button>
                            </Link>
                                <Link to="/signup">
                                    <button className={buttonClassName}>Sign up</button>
                                </Link></>
                        </div>
                    )}
                </div>

            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default Navbar;