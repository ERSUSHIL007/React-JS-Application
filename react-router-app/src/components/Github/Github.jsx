import React, {useEffect, useState} from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {
    const data = useLoaderData()

    // const [data, setData] = useState([])

    // useEffect(() => {
    //     fetch("https://api.github.com/users/ERSUSHIL007")
    //         .then((res) => res.json())
    //         .then((data) => setData(data))
    // }, [])

  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github User Name: {data.name}
    <img src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export const githubInfoLoader = async () => {
    const res = await fetch("https://api.github.com/users/ERSUSHIL007")
    const data = await res.json()
    return data
}