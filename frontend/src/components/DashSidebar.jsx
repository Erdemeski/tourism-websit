import React, { useEffect, useState } from 'react'
import { Button, Modal, Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from 'react-icons/hi'



export default function DashSidebar() {

    const location = useLocation();
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const dispatch = useDispatch();
    const [showSignout, setShowSignout] = useState(false);


    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };




    return (
        <div>
            <Sidebar className='w-full md:w-56'>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Link to='/dashboard?tab=profile'>
                            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>Profile</Sidebar.Item>
                        </Link>
                        <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={() => setShowSignout(true)}>Sign Out</Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <Modal show={showSignout} onClose={() => setShowSignout(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to sign out?</h3>
                        <div className='flex justify-center gap-6'>
                            <Link to={'/'}>
                                <Button color='warning' onClick={handleSignout}>Yes, sign out</Button>
                            </Link>
                            <Button color='gray' onClick={() => setShowSignout(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}
