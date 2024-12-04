import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm';


export default function AdvertisementDetailsPage() {

    const { postSlug } = useParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [advertisement, setAdvertisement] = useState(null);


    useEffect(() => {
        const fetchAdvertisement = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/advertisement/getadvertisements?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setAdvertisement(data.advertisements[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchAdvertisement();
    }, [postSlug]);

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    );
    return (

        <div className='p-3 max-w-screen-2xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>advertisement name</h1>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <div className='flex-1'>
                    details
                </div>

                <div className='max-w-lg sticky'>
                    <BookingForm />
                </div>
            </div>
        </div>


    )
}
