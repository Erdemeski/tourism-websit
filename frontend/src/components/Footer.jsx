import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitterX } from 'react-icons/bs';

export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8 border-gray-400'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
              <span className='px-3 py-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 rounded-lg text-white'>Erdem's</span>
              Tour
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='/about' target='_blank' rel='noopener nopreferrer'>
                  About Us
                </Footer.Link>
                <Footer.Link href='https://www.google.com/maps' target='_blank' rel='noopener nopreferrer'>
                  Location
                </Footer.Link>
                <Footer.Link href='#'>
                  Contact Us
                </Footer.Link>

              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.instagram.com' target='_blank' rel='noopener nopreferrer'>
                  Instagram
                </Footer.Link>
                <Footer.Link href='https://www.facebook.com' target='_blank' rel='noopener nopreferrer'>
                  Facebook
                </Footer.Link>
                <Footer.Link href='https://www.x.com' target='_blank' rel='noopener nopreferrer'>
                  X (Twitter)
                </Footer.Link>

              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href='#'>
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by="Erdem's Tour" year={new Date().getFullYear()} />
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='https://www.instagram.com' icon={BsInstagram} />
            <Footer.Icon href='https://www.facebook.com' icon={BsFacebook} />
            <Footer.Icon href='https://www.x.com' icon={BsTwitterX} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
