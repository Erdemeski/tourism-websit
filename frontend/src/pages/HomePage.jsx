import React from 'react'
import '../styles/home.css'
import heroPhoto1 from "../assets/home_page/hero_photo1.jpg";
import heroPhoto2 from "../assets/home_page/hero_photo2.jpg";
import heroVideo from "../assets/home_page/hero_video.mp4";


export default function HomePage() {

  return (
    <div>
      <section className='flex flex-col lg:flex-row'>
        <div className="relative isolate px-6 lg:px-8 flex-1">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-0"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-7xl">
                The tours you desire are here
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-400 sm:text-xl/8">
                Turn your dreams into reality – Begin your unforgettable journey!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-10"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        <div className='flex-1 m-auto'>
          <div className='flex flex-row gap-3 px-3 sm:px-10 md:px-20 lg:pr-16 lg:pl-10 xl:pr-24 2xl:pr-44 md:flex-row items-center justify-center'>
            <div className='hero__box mb-10'>
              <img src={heroPhoto1} alt="" />
            </div>
            <div className='hero__box mb-20'>
              <video src={heroVideo} alt="" autoPlay loop muted />
            </div>
            <div className='hero__box'>
              <img src={heroPhoto2} alt="" />
            </div>
          </div>
        </div>
      </section>



      <section className='min-h-screen'>
        continue...
      </section>



    </div>
  )
}
