import React from 'react'


export default function AdvertisementDetails({ advertisement }) {

    /*     if (!advertisement) return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        ); */

    return (
        <div className="pb-4">
            <img src={advertisement && advertisement.image} alt="Bali, Indonesia" className="w-full h-auto rounded-md" />
            <h1 className="text-2xl font-bold mt-4">{advertisement && advertisement.location}</h1>
            <p className="text-gray-600">4.6 (1) Somewhere</p>
            <p className="mt-2">${advertisement && advertisement.currentPrice} per person</p>
        </div>
    )
}
