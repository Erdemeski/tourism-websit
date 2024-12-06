import { Rating } from 'flowbite-react'
import React from 'react'


export default function AdvertisementDetails({ advertisement }) {

    /*     if (!advertisement) return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        ); */
    console.log(advertisement);

    return (
        <div className="rounded-lg shadow-md  bg-white dark:bg-gray-800">
            <img src={advertisement && advertisement.image} alt="Bali, Indonesia" className="w-full h-auto rounded-md" />
            <div className='p-5 flex flex-col gap-3'>
                <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3 flex flex-col sm:flex-row gap-4'>
                    <div className='w-3/4'>
                        <h1 className="text-2xl font-bold">{advertisement && advertisement.location}</h1>
                        <p className="text-gray-00">4.6 (1) Somewhere</p>
                        <p className="">${advertisement && advertisement.currentPrice} per person</p>
                    </div>
                    <div className='w-auto sm:w-1/4 flex text-center sm:justify-center'>
                        <Rating size='md'>
                            <Rating.Star />
                            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                            <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                                73 reviews
                            </a>
                        </Rating>
                    </div>
                </div>
                <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3'>
                    <h1>advertisement details</h1>
                </div>
                <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3'>
                    <h1>location and map</h1>
                </div>
                <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3'>
                    <h1>comments</h1>
                </div>

            </div>
        </div>
    )
}
