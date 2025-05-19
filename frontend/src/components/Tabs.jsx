import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import TaskComponent from "./Task";

const Tabs = ({ categories }) => {
    return (
        <div className="flex w-full justify-center p-2">
            <div className="w-full max-w-md">
                <TabGroup>
                    <TabList className="flex gap-4">
                        {categories.map(({ name }) => (
                            <Tab
                                key={name}
                                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="mt-3">
                        {categories.map(({ name, tasks }) => (
                            <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                                <TaskComponent ></TaskComponent>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
} 