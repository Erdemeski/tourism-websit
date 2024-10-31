import { Avatar, Button, Dropdown, DropdownHeader, Modal, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { GrCurrency } from "react-icons/gr"
import { IoLanguage } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from 'react-icons/hi'



export default function Header() {

    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector((state) => state.theme);
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
                setShowSignout(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div>
            <Navbar className='border-b-2'>
                <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    <span className='px-3 py-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 rounded-lg text-white'>Erdem's</span>
                    Tour
                </Link>
                <form>
                    <TextInput
                        type='text'
                        placeholder='Search...'
                        rightIcon={AiOutlineSearch}
                        className='hidden lg:inline'
                    />
                </form>
                <Button className='w-13 h-11 lg:hidden' color='gray' pill>
                    <AiOutlineSearch className='w-4 h-6' />
                </Button>
                <div className='flex gap-1 md:order-2'>
                    <Button className='w-13 h-11  hidden sm:inline' color='gray' pill>
                        <IoLanguage className='w-4 h-4' />
                    </Button>
                    <Button className='w-13 h-11  hidden sm:inline' color='gray' pill>
                        <GrCurrency className='w-4 h-4' />
                    </Button>
                    <Button className='w-13 h-11  hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun /> : <FaMoon />}
                    </Button>
                    {currentUser ? (
                        <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
                            <DropdownHeader>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                            </DropdownHeader>
                            {currentUser.isAdmin && (
                                <div>
                                    <Link to={'/dashboard?tab=dashboard'}>
                                        <Dropdown.Item>Dashboard</Dropdown.Item>
                                    </Link>
                                    <Dropdown.Divider />
                                </div>
                            )}
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => setShowSignout(true)}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to="/sign-in">
                            <Button gradientDuoTone='greenToBlue' outline>Sign In</Button>
                        </Link>
                    )
                    }
                    <NavbarToggle />
                </div >
                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to='/about'>
                            About Us
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/advertisements"} as={'div'}>
                        <Link to='/advertisements'>
                            Advertisements
                        </Link>
                    </Navbar.Link>

                </Navbar.Collapse>
            </Navbar >




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
