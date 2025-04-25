import { Button } from '@headlessui/react'

function ButtonComponent({ buttonText }) {
    return (
        <Button className=" w-1/5 text-center inline-flex items-center justify-center gap-2 rounded-3xl bg-gray-800 px-3 py-3 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
            {buttonText}
        </Button>
    )
}

export default ButtonComponent