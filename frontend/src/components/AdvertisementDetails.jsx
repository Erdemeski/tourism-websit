import { HR, Rating } from 'flowbite-react'
import React, { useEffect, useState, useRef } from 'react'
import { IoLocationSharp } from "react-icons/io5"
import { useSelector } from 'react-redux';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CommentSection from './CommentSection';
import '../styles/home.css'



export default function AdvertisementDetails({ advertisement }) {

    const [comments, setComments] = useState([]);
    const commentSectionRef = useRef(null);

    const hasContent = (htmlString) => {
        if (!htmlString) return false;
        const strippedContent = htmlString.replace(/<[^>]*>/g, '').trim();
        return strippedContent.length > 0;
    };

    const { currency } = useSelector((state) => state.currency);

    const [previousPrice, setPreviousPrice] = useState();
    const [currentPrice, setCurrentPrice] = useState();

    const parseCoordinates = (coordinatesString) => {
        if (!coordinatesString) return [0, 0];

        const [lat, lng] = coordinatesString.split(',').map(Number);
        return [lat, lng];
    };
    const position = parseCoordinates(advertisement.coordinates);

    useEffect(() => {
        try {
            const definePriceInfo = async () => {
                if (!currency) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (currency === 'gbp') {
                    setPreviousPrice(advertisement.previousPriceGBP);
                    setCurrentPrice(advertisement.currentPriceGBP);
                }
                if (currency === 'try') {
                    setPreviousPrice(advertisement.previousPriceTRY);
                    setCurrentPrice(advertisement.currentPriceTRY);
                }
            };
            definePriceInfo();
        } catch (error) {
            console.log(error.message);
        }
    })

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getAdvertisementComments/${advertisement._id}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    }, [advertisement._id]);

    const scrollToComments = () => {
        if (commentSectionRef.current) {
            commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="rounded-lg shadow-md  bg-white dark:bg-gray-800">
            <img src={advertisement && advertisement.image} alt="Bali, Indonesia" className="w-full h-auto rounded-md" />
            <div className='p-5 flex flex-col gap-3'>
                <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3 flex flex-col sm:flex-row gap-4'>
                    <div className='w-3/4 flex flex-col gap-1'>
                        <h1 className="text-2xl font-bold">{advertisement && advertisement.shortTitle}</h1>
                        <div className='flex items-center'>
                            <IoLocationSharp />
                            <span className="">{advertisement && advertisement.locationZone}</span>
                        </div>
                        <p className="pl-0.5">
                            {currency === 'try' && (
                                <span className="text-lg font-bold">₺ </span>
                            )}
                            {currency !== 'try' && (
                                <span className="text-lg font-bold">£ </span>
                            )}
                            {currentPrice && (parseFloat(currentPrice.replace(',', '.')))} /person</p>
                    </div>
                    <div className='w-auto sm:w-1/4 flex text-center sm:justify-center'>
                        <Rating size='md'>
                            <Rating.Star />
                            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                            <a onClick={scrollToComments} className="cursor-pointer text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                                {comments.length} reviews
                            </a>
                        </Rating>
                    </div>
                </div>
                {advertisement && advertisement.content && hasContent(advertisement.content) && (
                    <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3'>
                        <div>
                            <h5 className="mx-1 text-2xl font-bold dark:text-white">Overview</h5>
                            <div className='py-3 mx-auto w-full post-content dark:text-white' dangerouslySetInnerHTML={{ __html: advertisement.content }}></div>
                        </div>
                        {advertisement && advertisement.includings && hasContent(advertisement.includings) && (
                            <div>
                                <HR className='my-3' />
                                <h5 className="mx-1 text-2xl font-bold dark:text-white">What's Included</h5>
                                <div className='py-3 mx-auto w-full post-content dark:text-white' dangerouslySetInnerHTML={{ __html: advertisement.includings }}></div>
                            </div>
                        )}
                        {advertisement && advertisement.whatToExpect && hasContent(advertisement.whatToExpect) && (
                            <div>
                                <HR className='my-3' />
                                <h5 className="mx-1 text-2xl font-bold dark:text-white">What To Expect</h5>
                                <div className='py-3 mx-auto w-full post-content dark:text-white' dangerouslySetInnerHTML={{ __html: advertisement.whatToExpect }}></div>
                            </div>
                        )}
                        {advertisement && advertisement.additionalInfos && hasContent(advertisement.additionalInfos) && (
                            <div>
                                <HR className='my-3' />
                                <h5 className="mx-1 text-2xl font-bold dark:text-white">Additional Info</h5>
                                <div className='py-3 mx-auto w-full post-content dark:text-white' dangerouslySetInnerHTML={{ __html: advertisement.additionalInfos }}></div>
                            </div>
                        )}
                    </div>
                )}
                <div className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3'>
                    <h5 className="mx-1 text-2xl font-bold dark:text-white">Location</h5>
                    <div className='py-3 flex items-center'>
                        <IoLocationSharp />
                        <span className="">{advertisement && advertisement.location}</span>
                    </div>
                    <div className='flex-1 h-full bg-white rounded-md'>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='w-full h-72 rounded-md'>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                {/*                                 <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
 */}                            </Marker>
                        </MapContainer>
                    </div>
                </div>
                <div ref={commentSectionRef} className='bg-gray-50 dark:bg-gray-700 dark:text-white rounded-md p-3'>
                    <CommentSection advertisementId={advertisement._id} />
                </div>
            </div>
        </div>
    )
}
