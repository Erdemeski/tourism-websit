import { Accordion, Button, Card, Checkbox, Datepicker, Dropdown, HR, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { GrCurrency } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency } from '../redux/currency/currencySlice';
import { FaPoundSign } from 'react-icons/fa';
import { FaTurkishLiraSign } from 'react-icons/fa6';




export default function BookingForm({ advertisement }) {

    const dispatch = useDispatch();
    const { language } = useSelector((state) => state.language);
    const { currency } = useSelector((state) => state.currency);

    const [formData, setFormData] = useState({ child_Count: '0', adult_Count: '1' });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    console.log(formData);



    return (

        /*         <div className='shadow-md p-4 rounded-md bg-gray-50 dark:bg-gray-800 lg:sticky lg:top-4'>
                    <div className='flex flex-col justify-between p-3 text-xl font-semibold'>
                        <h1 className='text-center p-2'>Booking Informations</h1>
                    </div>
                </div> */


        <Card className='p-4  lg:sticky lg:top-4'>
            <div className="flex items-center justify-between text-gray-900 dark:text-white">
                <div>
                    {currency === 'try' && (
                        <span className="text-3xl font-semibold">₺</span>
                    )}
                    {currency !== 'try' && (
                        <span className="text-3xl font-semibold">£</span>
                    )}
                    <span className="text-5xl font-extrabold tracking-tight">{advertisement && advertisement.currentPrice}</span>
                    <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/person</span>
                </div>
                <div className='flex items-center justify-between'>
                    <Dropdown className='' label="" dismissOnClick={false} renderTrigger={() => <span>
                        <Button className='w-13 h-11 flex justify-center items-center' color='gray' pill>
                            <GrCurrency className='w-4 h-4' />
                        </Button>
                    </span>}>
                        <Dropdown.Item className={currency === 'gbp' ? 'dark:bg-slate-600 bg-gray-100' : ''} onClick={() => dispatch(selectCurrency('gbp'))}>
                            <div className='flex justify-center items-center'>
                                <FaPoundSign className='w-6 h-6 mr-1' />
                                <span className='flex justify-center'>GBP</span>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className={currency === 'try' ? 'dark:bg-slate-600 bg-gray-100' : ''} onClick={() => dispatch(selectCurrency('try'))}>
                            <div className='flex justify-center items-center'>
                                <FaTurkishLiraSign className='w-6 h-6 mr-1' />
                                <span className='flex justify-center'>TRY</span>
                            </div>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <HR className='my-4' />
            <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">Booking informations</h5>
            <form className="flex flex-col gap-3">
                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <div className="mb-1 block">
                            <Label htmlFor="name" value="Your name" />
                        </div>
                        <TextInput id="name" type="name" sizing='sm' required />
                    </div>
                    <div className='w-1/2'>
                        <div className="mb-1 block">
                            <Label htmlFor="surname" value="Your surname" />
                        </div>
                        <TextInput id="surname" type="surname" sizing='sm' required />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <div className="mb-1 block">
                            <Label htmlFor="datestart" value="Date start" />
                        </div>
                        <Datepicker language={language} labelTodayButton="Today" labelClearButton="Clear" />
                    </div>
                    <div className='w-1/2'>
                        <div className="mb-1 block">
                            <Label htmlFor="dateend" value="Date end" />
                        </div>
                        <Datepicker language={language} labelTodayButton="Today" labelClearButton="Clear" />
                    </div>
                </div>

                <div className='flex justify-center gap-4'>
                    <div className='w-1/4'>
                        <div className="mb-2 block">
                            <Label htmlFor="adult" value="Number of adult(s)" />
                        </div>
                        <Select id="adult_Count" onChange={handleChange} required sizing='sm'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                        </Select>
                    </div>
                    <div className='w-1/4'>
                        <div className="mb-2 block">
                            <Label htmlFor="child" value="Number of child(s)" />
                        </div>
                        <Select id="child_Count" onChange={handleChange} required sizing='sm'>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                        </Select>
                        <div className="text-gray-500 dark:text-gray-300">
                            <span className="text-xs font-normal">
                                You have <span className="font-medium">% 25</span> discount for ages less than 5.
                            </span>
                        </div>
                    </div>
                </div>
                <HR className='my-3' />
                <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">Communication information</h5>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="phonenumber" value="Your phone number" />
                    </div>
                    <TextInput id="phonenumber" type="tel" sizing='md' placeholder='+1 (XXX) XXX-XXXX' required />
                </div>


                <HR className='my-3' />
                <h5 className="text-xl font-medium text-gray-500 dark:text-gray-400">Summary</h5>

                <Accordion collapseAll>
                    <Accordion.Panel>
                        <Accordion.Title>
                            <div className="flex items-center justify-between text-gray-900 dark:text-white">
                                <div>
                                    {currency === 'try' && (
                                        <span className="text-3xl font-semibold">₺</span>
                                    )}
                                    {currency !== 'try' && (
                                        <span className="text-3xl font-semibold">£</span>
                                    )}
                                    <span className="text-5xl font-extrabold tracking-tight">{advertisement && ((((advertisement.currentPrice * 0.75).toFixed(2)) * formData.child_Count) + ((advertisement.currentPrice) * formData.adult_Count))}</span>
                                    <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/total</span>
                                </div>
                            </div>
                        </Accordion.Title>
                        <Accordion.Content>
                            <div className="mb-2 flex items-center justify-between text-gray-900 dark:text-white">
                                <div>
                                    {currency === 'try' && (
                                        <span className="text-xl font-semibold">₺</span>
                                    )}
                                    {currency !== 'try' && (
                                        <span className="text-xl font-semibold">£</span>
                                    )}
                                    <span className="text-2xl font-extrabold tracking-tight">{advertisement && advertisement.currentPrice}</span>
                                    <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.adult_Count} Adult(s)</span>
                                </div>
                                <div>
                                    {currency === 'try' && (
                                        <span className="text-xl font-semibold">₺</span>
                                    )}
                                    {currency !== 'try' && (
                                        <span className="text-xl font-semibold">£</span>
                                    )}
                                    <span className="text-3xl font-extrabold tracking-tight">{advertisement && (advertisement.currentPrice) * formData.adult_Count}</span>
                                </div>

                            </div>
                            <div className="flex items-center justify-between text-gray-900 dark:text-white">
                                <div>
                                    {currency === 'try' && (
                                        <span className="text-xl font-semibold">₺</span>
                                    )}
                                    {currency !== 'try' && (
                                        <span className="text-xl font-semibold">£</span>
                                    )}
                                    <span className="text-2xl font-extrabold tracking-tight">{advertisement && (advertisement.currentPrice * 0.75).toFixed(2)}</span>
                                    <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.child_Count} Child(s)</span>
                                </div>
                                <div>
                                    {currency === 'try' && (
                                        <span className="text-xl font-semibold">₺</span>
                                    )}
                                    {currency !== 'try' && (
                                        <span className="text-xl font-semibold">£</span>
                                    )}
                                    <span className="text-3xl font-extrabold tracking-tight">{advertisement && (((advertisement.currentPrice * 0.75).toFixed(2)) * formData.child_Count)}</span>
                                </div>
                            </div>



                            <p className="mb-2 text-gray-500 dark:text-gray-400">

                            </p>
                            <p className="text-gray-500 dark:text-gray-400">

                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>









                <div className="mt-5 flex items-center gap-2">
                    <Checkbox id="accept" defaultChecked required />
                    <Label htmlFor="accept" className="flex">
                        I agree with the&nbsp;
                        <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </a>. (required)
                    </Label>
                </div>
                <Button type="submit">Book now!</Button>
            </form>
        </Card >
    );
}
