import { Accordion, Button, Card, Checkbox, Datepicker, Dropdown, HR, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { GrCurrency } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency } from '../redux/currency/currencySlice';
import { FaPoundSign } from 'react-icons/fa';
import { FaTurkishLiraSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import '../styles/home.css';




export default function BookingForm({ advertisement }) {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)
    const { language } = useSelector((state) => state.language);
    const { currency } = useSelector((state) => state.currency);

    const [formData, setFormData] = useState({ child_Count: '0', adult_Count: '1' });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    console.log(formData);



    return (

        <Card disabled={!currentUser} className='p-4 lg:sticky lg:top-4'>

            {!currentUser &&
                <div className='overlay bg-opacity-50 bg-zinc-50 dark:bg-opacity-50 dark:bg-gray-500'>
                    <Card className="max-w-sm for_lg">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Please sign in to book
                        </h5>
                        <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
                            In order for us to serve you better, you need to create an account. Don't worry! You can create your account in seconds. And we want you to know that your data is safe.                        </p>
                        <Link to="/sign-in">
                            <Button className='w-full' gradientDuoTone='greenToBlue' outline>Sign In</Button>
                        </Link>
                    </Card>
                </div>
            }

            <div className={!currentUser ? 'blurred' : ''}>
                <div className="flex items-center justify-between text-gray-900 dark:text-white">
                    <div>
                        {currency === 'try' && (
                            <span className="text-3xl font-semibold">₺</span>
                        )}
                        {currency !== 'try' && (
                            <span className="text-3xl font-semibold">£</span>
                        )}
                        <span className="text-5xl font-extrabold tracking-tight">{advertisement && (parseFloat(advertisement.currentPrice.replace(',', '.')))}</span>
                        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/person</span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Dropdown disabled={!currentUser} className='' label="" dismissOnClick={false} renderTrigger={() => <span>
                            <Button disabled={!currentUser} className='w-13 h-11 flex justify-center items-center' color='gray' pill>
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
                            <TextInput disabled={!currentUser} id="name" type="name" sizing='sm' required />
                        </div>
                        <div className='w-1/2'>
                            <div className="mb-1 block">
                                <Label htmlFor="surname" value="Your surname" />
                            </div>
                            <TextInput disabled={!currentUser} id="surname" type="surname" sizing='sm' required />
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-1/2'>
                            <div className="mb-1 block">
                                <Label htmlFor="datestart" value="Date start" />
                            </div>
                            <Datepicker disabled={!currentUser} language={language} labelTodayButton="Today" labelClearButton="Clear" />
                        </div>
                        <div className='w-1/2'>
                            <div className="mb-1 block">
                                <Label htmlFor="dateend" value="Date end" />
                            </div>
                            <Datepicker disabled={!currentUser} language={language} labelTodayButton="Today" labelClearButton="Clear" />
                        </div>
                    </div>

                    <div className='flex justify-center gap-4'>
                        <div className='w-1/3'>
                            <div className="mb-1 block">
                                <Label htmlFor="adult" value="Number of adult(s)" />
                            </div>
                            <Select disabled={!currentUser} id="adult_Count" onChange={handleChange} required sizing='sm'>
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
                        <div className='w-1/3'>
                            <div className="mb-1 block">
                                <Label htmlFor="child" value="Number of child(ren)" />
                            </div>
                            <Select disabled={!currentUser} id="child_Count" onChange={handleChange} required sizing='sm'>
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
                        <TextInput disabled={!currentUser} id="phonenumber" type="tel" sizing='md' placeholder='+1 (XXX) XXX-XXXX' required />
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
                                        <span className="text-5xl font-extrabold tracking-tight">{advertisement && (((((parseFloat(advertisement.currentPrice.replace(',', '.'))) * 0.75).toFixed(2)) * formData.child_Count) + ((parseFloat(advertisement.currentPrice.replace(',', '.'))) * formData.adult_Count))}</span>
                                        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">total</span>
                                    </div>
                                </div>
                            </Accordion.Title>
                            {currentUser &&
                                <Accordion.Content>
                                    <div className="mb-2 flex items-center justify-between text-gray-900 dark:text-white">
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-2xl font-extrabold tracking-tight">{advertisement && (parseFloat(advertisement.currentPrice.replace(',', '.')))}</span>
                                            <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.adult_Count} Adult(s)</span>
                                        </div>
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-3xl font-extrabold tracking-tight">{advertisement && (parseFloat(advertisement.currentPrice.replace(',', '.'))) * formData.adult_Count}</span>
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
                                            <span className="text-2xl font-extrabold tracking-tight">{advertisement && (parseFloat(advertisement.currentPrice.replace(',', '.')) * 0.75).toFixed(2)}</span>
                                            <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.child_Count} Child(ren)</span>
                                        </div>
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-3xl font-extrabold tracking-tight">{advertisement && (((parseFloat(advertisement.currentPrice.replace(',', '.')) * 0.75).toFixed(2)) * formData.child_Count)}</span>
                                        </div>
                                    </div>
                                </Accordion.Content>
                            }
                        </Accordion.Panel>
                    </Accordion>
                    <div className="mt-5 flex items-center gap-2">
                        <Checkbox disabled={!currentUser} id="accept" defaultChecked required />
                        <Label htmlFor="accept" className="flex">
                            I agree with the&nbsp;
                            {currentUser && <div>
                                <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                    terms and conditions
                                </a>
                            </div>
                            }
                            . (required)
                        </Label>
                    </div>
                    <Button disabled={!currentUser} type="submit">Book now!</Button>
                </form>
            </div>
        </Card >
    );
}
