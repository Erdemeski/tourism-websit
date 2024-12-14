import { Accordion, Badge, Button, Card, Checkbox, Datepicker, Dropdown, HR, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
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

    const [formData, setFormData] = useState({ child_Count: '0', infant_Count: '0', adult_Count: '1' });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    console.log(formData);

    const [previousPrice, setPreviousPrice] = useState();
    const [currentPrice, setCurrentPrice] = useState();
    const [childDiscount, setChildDiscount] = useState();
    const [infantPrice, setInfantPrice] = useState();

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
                    setChildDiscount((advertisement.childDiscountGBP.replace(',', '.')) / 100);
                    setInfantPrice(advertisement.infantPriceGBP);
                }
                if (currency === 'try') {
                    setPreviousPrice(advertisement.previousPriceTRY);
                    setCurrentPrice(advertisement.currentPriceTRY);
                    setChildDiscount((advertisement.childDiscountTRY.replace(',', '.')) / 100);
                    setInfantPrice(advertisement.infantPriceTRY);
                }
            };
            definePriceInfo();
        } catch (error) {
            console.log(error.message);
        }
    })

    const calculateTotalPrice = () => {
        if (!currentPrice || !childDiscount || !infantPrice) {
            return 0;
        }
        const adultPrice = parseFloat(currentPrice.replace(',', '.'));
        const childPrice = adultPrice * (1.0 - childDiscount);
        const infantFee = parseFloat(infantPrice.replace(',', '.'));

        const totalAdultPrice = adultPrice * parseInt(formData.adult_Count);
        const totalChildPrice = childPrice * parseInt(formData.child_Count);
        const totalInfantPrice = infantFee * parseInt(formData.infant_Count);

        return totalAdultPrice + totalChildPrice + totalInfantPrice;
    };

    const calculateDiscountRate = (currentPrice, previousPrice) => {
        const current = parseFloat(currentPrice.replace(',', '.'));
        const previous = parseFloat(previousPrice.replace(',', '.'));
        const discountRate = ((previous - current) / previous) * 100;
        console.log(discountRate);
        return Math.ceil(discountRate);
    }


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
                        {previousPrice && (
                            <div>
                                <Badge color='success' >
                                    <div className='flex items-center gap-4'>
                                        <div className=''>
                                            {currency === 'try' && (
                                                <span className="text-sm font-semibold"> ₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-sm font-semibold"> £</span>
                                            )}
                                            <span className='text-lg line-through'>{parseFloat(previousPrice.replace(',', '.'))}</span>
                                            <span className='text-xs'>/person</span>
                                        </div>
                                        <div className='text-3xl'>
                                            <span>
                                                {calculateDiscountRate(currentPrice, previousPrice)}
                                                <span className='text-2xl font-bold'>% off</span>
                                            </span>
                                        </div>
                                    </div>
                                </Badge>
                            </div>
                        )}
                        {currency === 'try' && (
                            <span className="text-3xl font-semibold">₺</span>
                        )}
                        {currency !== 'try' && (
                            <span className="text-3xl font-semibold">£</span>
                        )}
                        <span className="text-6xl font-extrabold tracking-tight">{currentPrice && (parseFloat(currentPrice.replace(',', '.')))}</span>
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
                                    You have <span className="font-medium">%{childDiscount * 100}</span> discount for ages less than 5.
                                </span>
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <div className="mb-1 block">
                                <Label htmlFor="infant" value="Number of infant(s)" />
                            </div>
                            <Select disabled={!currentUser} id="infant_Count" onChange={handleChange} required sizing='sm'>
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
                                    Infant fee is
                                    <span className="font-medium">{currency === 'try' && (<span> ₺</span>)}{currency !== 'try' && (<span> £</span>)}{infantPrice}.</span>
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
                                        <span className="text-5xl font-extrabold tracking-tight">{calculateTotalPrice().toFixed(2)}</span>
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
                                            <span className="text-2xl font-extrabold tracking-tight">{currentPrice && (parseFloat(currentPrice.replace(',', '.')))}</span>
                                            <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.adult_Count} Adult(s)</span>
                                        </div>
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-3xl font-extrabold tracking-tight">{currentPrice && (parseFloat(currentPrice.replace(',', '.')) * formData.adult_Count).toFixed(2)}</span>
                                        </div>

                                    </div>
                                    <div className="mb-2 flex items-center justify-between text-gray-900 dark:text-white">
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-2xl font-extrabold tracking-tight">{currentPrice && (parseFloat(currentPrice.replace(',', '.')) * (1.0 - (parseFloat(childDiscount)))).toFixed(2)}</span>
                                            <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.child_Count} Child(ren)</span>
                                        </div>
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-3xl font-extrabold tracking-tight">{currentPrice && ((parseFloat(currentPrice.replace(',', '.')) * (1.0 - (parseFloat(childDiscount)))) * formData.child_Count).toFixed(2)}</span>
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
                                            <span className="text-2xl font-extrabold tracking-tight">{infantPrice && (parseFloat(infantPrice.replace(',', '.')))}</span>
                                            <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">x {formData.infant_Count} Infant(s)</span>
                                        </div>
                                        <div>
                                            {currency === 'try' && (
                                                <span className="text-xl font-semibold">₺</span>
                                            )}
                                            {currency !== 'try' && (
                                                <span className="text-xl font-semibold">£</span>
                                            )}
                                            <span className="text-3xl font-extrabold tracking-tight">{infantPrice && (parseFloat(infantPrice.replace(',', '.')) * formData.infant_Count).toFixed(2)}</span>
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
                    <Button disabled={!currentUser} type="submit">Reserve now!</Button>

                    <div className='p-2'>
                        <ul className="mt-2 space-y-3">
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                    Free Cancelation
                                </span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                    Reserve Now And Pay Later
                                </span>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </Card >
    );
}
