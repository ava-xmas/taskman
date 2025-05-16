// can implement retractable navbar using setState hook

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon, RectangleStackIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid'

const sidebarMenu = [
    { name: 'Dashboard', href: "#", current: false },
    { name: 'Tasks', href: "#", current: true },
]

const sidebarMessages = [

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SidebarComponent() {
    return (
        <div className="bg-gray-800 px-[20px] py-[10px] h-screen min-w-xs">
            <div className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 text-left flex flex-col'>
                <div className='flex flex-row justify-evenly items-center'>
                    <h6 className="align-middle text-left text-gray-300 my-2">MENU</h6><button className='p-1.5 rounded-lg bg-gray-800 hover:bg-gray-900'><ChevronLeftIcon className='w-8 align-left'></ChevronLeftIcon></button></div>

                <div className="flex flex-col space-x-4">
                    <SidebarItem icon={<ClipboardDocumentIcon className='w-6'></ClipboardDocumentIcon>} text={"DASHBOARD"}></SidebarItem>
                    <SidebarItem icon={<RectangleStackIcon className='w-6'></RectangleStackIcon>} text={"TASKS"}></SidebarItem>
                    {/* {sidebarMenu.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-5 py-3 my-1 text-sm text-left font-medium',
                            )}
                        >
                            {item.name}
                        </a>
                    ))} */}
                </div>
            </div>

            <div className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 text-left flex flex-col'>
                <h6 className="text-left text-gray-300 my-2">MESSAGES</h6>
            </div>
        </div>
    );
}

function SidebarItem({ icon, text, active, alert }) {
    return (
        <a className={`flex flex-row items-center my-1 rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover: bg-idigo-50 text-white"}`}>
            {icon}
            <span className='text-xs px-3 py-2'>  {text}</span>
        </a>
    )
}