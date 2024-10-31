import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { HiMiniArrowSmallRight } from 'react-icons/hi2'
import { useSelector } from 'react-redux'


export default function DashboardMain() {

    const { currentUser } = useSelector((state) => state.user)
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [advertisements, setAdvertisements] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalAdvertisements, setTotalAdvertisements] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const [lastMonthAdvertisements, setLastMonthAdvertisements] = useState(0)
    const [lastMonthComments, setLastMonthComments] = useState(0)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchAdvertisements = async () => {
            try {
                const res = await fetch('/api/advertisement/getadvertisements?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setAdvertisements(data.advertisements)
                    setTotalAdvertisements(data.totalAdvertisements)
                    setLastMonthAdvertisements(data.lastMonthAdvertisements)
                }
            } catch (error) {
                console.log(error.message);
            }

        };

        const fetchComments = async () => {

        };


        if (currentUser.isAdmin) {
            fetchUsers();
            fetchAdvertisements();
            fetchComments();
        }
    }, [currentUser]);

    return (
        <div className='p-3 md:mx-auto'>

            <div className='flex flex-wrap gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className={`${lastMonthUsers === 0 ? 'text-gray-500' : 'text-green-500'} flex items-center`}>
                            {lastMonthUsers === 0 ? <HiMiniArrowSmallRight /> : <HiArrowNarrowUp />}
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500  dark:text-gray-400'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Advertisements</h3>
                            <p className='text-2xl'>{totalAdvertisements}</p>
                        </div>
                        <HiDocumentText className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className={`${lastMonthAdvertisements === 0 ? 'text-gray-500' : 'text-green-500'} flex items-center`}>
                            {lastMonthAdvertisements === 0 ? <HiMiniArrowSmallRight /> : <HiArrowNarrowUp />}
                            {lastMonthAdvertisements}
                        </span>
                        <div className='text-gray-500 dark:text-gray-400'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'>{totalComments}</p>
                        </div>
                        <HiAnnotation className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className={`${lastMonthComments === 0 ? 'text-gray-500' : 'text-green-500'} flex items-center`}>
                            {lastMonthComments === 0 ? <HiMiniArrowSmallRight /> : <HiArrowNarrowUp />}
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500  dark:text-gray-400'>Last month</div>
                    </div>
                </div>
            </div>

        </div>


    )
}
