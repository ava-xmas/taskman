import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Description, Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  })

  useEffect(() => {
    async function fetchData() {
      console.log("Hi");
      console.log(import.meta.env.VITE_API_URL);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts`);
        if (!response.ok) {
          throw new Error("Network resopnse was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>Hello World</>
  )
}

export default App
