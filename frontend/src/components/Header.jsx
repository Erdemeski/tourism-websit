import { Avatar, Button, Dropdown, DropdownHeader, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { GrCurrency } from "react-icons/gr"
import { MdLanguage } from "react-icons/md"
import { useSelector } from "react-redux"


export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);

    return (
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
                    <MdLanguage className='w-4 h-4' />
                </Button>
                <Button className='w-13 h-11  hidden sm:inline' color='gray' pill>
                    <GrCurrency className='w-4 h-4' />
                </Button>
                <Button className='w-13 h-11  hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
                        <DropdownHeader>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign Out</Dropdown.Item>
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
    )
}
