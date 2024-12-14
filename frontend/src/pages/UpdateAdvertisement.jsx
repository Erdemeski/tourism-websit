import { Alert, Button, Checkbox, FileInput, HR, Label, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Quill from '../components/Quill';

export default function UpdateAdvertisement() {

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { advertisementId } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    const navigate = useNavigate();

    /*     const [contentHTML, setContentHTML] = useState('');
        const [includingsHTML, setIncludingsHTML] = useState('');
        const [whatToExpectHTML, setWhatToExpectHTML] = useState('');
        const [additionalInfosHTML, setAdditionalInfosHTML] = useState('');
     */
    useEffect(() => {
        try {
            const fetchAdvertisement = async () => {
                const res = await fetch(`/api/advertisement/getadvertisements?advertisementId=${advertisementId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.advertisements[0]);
                }
            };

            fetchAdvertisement();
        } catch (error) {
            console.log(error.message);
        }
    }, [advertisementId]);
    /*     setContentHTML(formData.content);
        setIncludingsHTML(formData.includings);
        setWhatToExpectHTML(formData.whatToExpect);
        setAdditionalInfosHTML(formData.additionalInfos);
     */
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload faileddd');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/advertisement/updateadvertisement/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            if (res.ok) {
                setPublishError(null);
                navigate(`/advertisement/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update the advertisement</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2'>
                    <Checkbox id='isActive' checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                    <Label className={`p-0.5 block text-xl font-medium leading-6 ${formData.isActive ? '' : 'bg-red-500 rounded-md'}`} htmlFor="isActiveLbl">
                        {formData.isActive ? "Visible" : "NOT Visible"}
                    </Label>
                </div>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <div className='flex-1'>
                        <Label htmlFor="titleLbl" className='block text-sm font-medium leading-6'>
                            Advertisement Title
                        </Label>
                        <TextInput type='text' sizing='sm' placeholder='Title' required id='title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="previousPriceLbl" className="block text-sm font-medium leading-6">
                            Short Title
                        </Label>
                        <TextInput type='text' sizing='sm' placeholder='Short title' required id='shortTitle' value={formData.shortTitle} onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="previousPriceLbl" className="block text-sm font-medium leading-6">
                            Category
                        </Label>
                        <Select sizing='sm' value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                            <option value="uncategorized">Select a category</option>
                            <option value="hotel">Hotel</option>
                            <option value="tour-trip">Tour/Trip</option>
                            <option value="entertainment">Entertainment</option>
                        </Select>
                    </div>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {imageUploadError && (
                    <Alert color='failure'>
                        {imageUploadError}
                    </Alert>
                )}
                {formData.image && (
                    <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
                )}

                <div className='flex flex-col gap-4 justify-between p-3 border-2 border-gray-300 border-dashed'>
                    <div>
                        <Label htmlFor="contentLbl" className="block text-sm font-medium leading-6">
                            Overview
                        </Label>
                        <Quill referance={formData.content} onChange={(value) => { setFormData({ ...formData, content: value }) }} />

                        {/*                         <ReactQuill theme='snow' value={formData.content} placeholder='Write something for "Overview" part...' className='h-48 mb-12' onChange={(value) => {
                            setFormData({ ...formData, content: value })
                        }} /> */}

                    </div>
                    <div>
                        <Label htmlFor="includingsLbl" className="block text-sm font-medium leading-6">
                            What's Included
                        </Label>
                        <Quill referance={formData.includings} onChange={(value) => { setFormData({ ...formData, includings: value }) }} />

                        {/*                         <ReactQuill theme='snow' value={formData.content} placeholder='Write something for "What is Included" part...' className='h-48 mb-12' onChange={(value) => {
                            setFormData({ ...formData, includings: value })
                        }} />
 */}
                    </div>
                    {/*                     <div>
                        <Label htmlFor="whatToExpectLbl" className="block text-sm font-medium leading-6">
                            What to Expect
                        </Label>
                        <Quill referance={formData.whatToExpect} onChange={(value) => { setFormData({ ...formData, whatToExpect: value }) }} />

                        <ReactQuill theme='snow' value={formData.content} placeholder='Write something for "What To Expect" part...' className='h-48 mb-12' onChange={(value) => {
                            setFormData({ ...formData, whatToExpect: value })
                        }} />

                    </div> */}
                    <div>
                        <Label htmlFor="additionalInfosLbl" className="block text-sm font-medium leading-6">
                            Additional Info
                        </Label>
                        <Quill referance={formData.additionalInfos} onChange={(value) => { setFormData({ ...formData, additionalInfos: value }) }} />

                        {/*                         <ReactQuill theme='snow' value={formData.content} placeholder='Write something for "Additional Infos" part...' className='h-48 mb-12' onChange={(value) => {
                            setFormData({ ...formData, additionalInfos: value })
                        }} /> */}

                    </div>
                </div>

                <HR className='my-0' />
                <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">General informations</h5>

                <div className='flex flex-col gap-2 justify-between pb-3 pt-0'>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='payLater' checked={formData.isPayLater} onChange={(e) => setFormData({ ...formData, isPayLater: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 `} htmlFor="payLaterLbl">
                            Reserve now and pay later
                        </Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='mobileTicket' checked={formData.isMobileTicket} onChange={(e) => setFormData({ ...formData, isMobileTicket: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 `} htmlFor="mobileTicketLbl">
                            Mobile ticket
                        </Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='pickUp' checked={formData.isPickUp} onChange={(e) => setFormData({ ...formData, isPickUp: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 '}`} htmlFor="pickUpLbl">
                            Pickup offered
                        </Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='duration' checked={formData.isDuration} onChange={(e) => setFormData({ ...formData, isDuration: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 `} htmlFor="durationLbl">
                            Duration:
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='...(approx.)' id='durationInfo' value={formData.durationInfo} disabled={!formData.isDuration} onChange={(e) => setFormData({ ...formData, durationInfo: e.target.value })} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='startTime' checked={formData.isStartTime} onChange={(e) => setFormData({ ...formData, isStartTime: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 '}`} htmlFor="startTimeLbl">
                            Start time:
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='..:..am/pm' id='startTimeInfo' value={formData.startTimeInfo} disabled={!formData.isStartTime} onChange={(e) => setFormData({ ...formData, startTimeInfo: e.target.value })} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='isEndTime' checked={formData.isEndTime} onChange={(e) => setFormData({ ...formData, isEndTime: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 '}`} htmlFor="endTimeLbl">
                            End time:
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='..:..am/pm' id='endTimeInfo' value={formData.endTimeInfo} disabled={!formData.isEndTime} onChange={(e) => setFormData({ ...formData, endTimeInfo: e.target.value })} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox id='offeredLng' checked={formData.isOfferedLng} onChange={(e) => setFormData({ ...formData, isOfferedLng: e.target.checked })} />
                        <Label className={`p-0.5 block text-lg font-medium leading-6 '}`} htmlFor="offeredLngLbl">
                            Offered in:
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='language(s) speaking' id='offeredLngInfo' value={formData.offeredLngInfo} disabled={!formData.isOfferedLng} onChange={(e) => setFormData({ ...formData, offeredLngInfo: e.target.value })} />
                    </div>
                </div>

                <HR className='my-0' />
                <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">Location informations</h5>

                <div className='flex flex-col gap-4 sm:flex-row justify-between pb-3 pt-0'>
                    <div className='flex-1'>
                        <Label htmlFor="locationZoneLbl" className="block text-sm font-medium leading-6">
                            Location (Zone)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Zone' required id='locationZone' value={formData.locationZone} onChange={(e) => setFormData({ ...formData, locationZone: e.target.value })} />
                    </div>

                    <div className='flex-1'>
                        <Label htmlFor="locationAddressLbl" className="block text-sm font-medium leading-6">
                            Location (Address)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Short address' required id='location' value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="locationCoordinatesLbl" className="block text-sm font-medium leading-6">
                            Location (Coordinates)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='37.926068, 29.125488' id='coordinates' value={formData.coordinates} onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })} />
                    </div>
                </div>

                <HR className='my-0' />
                <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">Pricing informations</h5>

                <div className='flex flex-col gap-4 sm:flex-row justify-between p-3 border-2 border-gray-300 border-dashed'>
                    <div className='flex-1'>
                        <Label htmlFor="prevPriceGBPLbl" className="block text-sm font-medium leading-6">
                            Previous Price (GBP)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Previous price' id='previousPriceGBP' value={formData.previousPriceGBP} onChange={(e) => setFormData({ ...formData, previousPriceGBP: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="currPriceGBPLbl" className="block text-sm font-medium leading-6">
                            Current Price (GBP)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Current price' required id='currentPriceGBP' value={formData.currentPriceGBP} onChange={(e) => setFormData({ ...formData, currentPriceGBP: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="childDiscountGBPLbl" className="block text-sm font-medium leading-6">
                            Child Discount (GBP)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='%' id='childDiscountGBP' value={formData.childDiscountGBP} onChange={(e) => setFormData({ ...formData, childDiscountGBP: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="InfantPriceGBPLbl" className="block text-sm font-medium leading-6">
                            Infant Price (GBP)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Infant price' id='infantPriceGBP' value={formData.infantPriceGBP} onChange={(e) => setFormData({ ...formData, infantPriceGBP: e.target.value })} />
                    </div>
                </div>
                <div className='flex flex-col gap-4 sm:flex-row justify-between p-3 border-2 border-gray-300 border-dashed'>
                    <div className='flex-1'>
                        <Label htmlFor="prevPriceTRYLbl" className="block text-sm font-medium leading-6">
                            Previous Price (TRY)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Previous price' id='previousPriceTRY' value={formData.previousPriceTRY} onChange={(e) => setFormData({ ...formData, previousPriceTRY: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="currPriceTRYLbl" className="block text-sm font-medium leading-6">
                            Current Price (TRY)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Current price' required id='currentPriceTRY' value={formData.currentPriceTRY} onChange={(e) => setFormData({ ...formData, currentPriceTRY: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="childDiscountTRYLbl" className="block text-sm font-medium leading-6">
                            Child Discount (TRY)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='%' id='childDiscountTRY' value={formData.childDiscountTRY} onChange={(e) => setFormData({ ...formData, childDiscountTRY: e.target.value })} />
                    </div>
                    <div className='flex-1'>
                        <Label htmlFor="infantPriceTRYLbl" className="block text-sm font-medium leading-6">
                            Infant Price (TRY)
                        </Label>
                        <TextInput sizing='sm' type='text' placeholder='Infant price' id='infantPriceTRY' value={formData.infantPriceTRY} onChange={(e) => setFormData({ ...formData, infantPriceTRY: e.target.value })} />
                    </div>
                </div>
                <Button className='my-3' type='submit' gradientDuoTone='purpleToPink'>Update</Button>
                {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
            </form>
        </div>
    )
}
