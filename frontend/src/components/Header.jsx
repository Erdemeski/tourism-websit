import { Button, Navbar, NavbarToggle, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { GrCurrency } from "react-icons/gr"
import { MdLanguage } from "react-icons/md"


export default function Header() {
    const path = useLocation().pathname;


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
                <Link to="/sign-in">
                    <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Sign In
                        </span>
                    </button>
                </Link>
                <NavbarToggle />
            </div>
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
        </Navbar>
    )
}
