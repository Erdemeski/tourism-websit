import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm';
import AdvertisementDetails from "../components/AdvertisementDetails";
import { Badge } from "flowbite-react";
import NotFound from '../pages/NotFound';


export default function AdvertisementDetailsPage() {

    const { advSlug } = useParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [advertisement, setAdvertisement] = useState(null);
    console.log(advertisement);


    useEffect(() => {
        const fetchAdvertisement = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/advertisement/getadvertisements?slug=${advSlug}`);
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
    }, [advSlug]);

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    );

    if (error || !advertisement) { return <NotFound />; }

    return (
        <div className='p-3 min-h-screen max-w-screen-2xl mx-auto flex flex-col'>
            <h1 className='text-center text-3xl mt-7 mb-5 font-bold lg:text-4xl'>{advertisement && advertisement.title}</h1 >
            <div className='self-center mb-10'>
                <Badge color='gray' size='sm'>{advertisement && advertisement.category}</Badge>
            </div>
            <div className='flex flex-col gap-4 lg:flex-row'>
                <div className='lg:w-3/5 w-full'>
                    <AdvertisementDetails advertisement={advertisement} />
                </div>

                <div className='lg:w-2/5 w-full'>
                    <BookingForm advertisement={advertisement} />
                </div>
            </div>
        </div >
    )
}
