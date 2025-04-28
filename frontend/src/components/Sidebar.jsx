import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const sidebarMenu = [
    { name: 'Dashboard', href: "#", current: false },
    { name: 'Tasks', href: "#", current: true },
]

const sidebarMessages = [

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function SidebarComponent() {
    return (
        <div className="bg-gray-800 px-[20px] py-[10px] h-screen">
            <div className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 text-left flex flex-col'>
                <h6 className="text-left text-gray-300 my-2">MENU</h6>
                <div className="flex flex-col space-x-4">
                    {sidebarMenu.map((item) => (
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
                    ))}
                </div>
            </div>

            <div className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 text-left flex flex-col'>
                <h6 className="text-left text-gray-300 my-2">MESSAGES</h6>
            </div>
        </div>
    );
}

export default SidebarComponent