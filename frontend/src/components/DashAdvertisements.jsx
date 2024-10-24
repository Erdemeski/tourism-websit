import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashAdvertisements() {

  const { currentUser } = useSelector((state) => state.user)
  const [userAdvertisements, setUserAdvertisements] = useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [advertisementIdToDelete, setAdvertisementIdToDelete] = useState('');

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const res = await fetch(`/api/advertisement/getadvertisements?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setUserAdvertisements(data.advertisements)
          if (data.advertisements.length < 9) {
            setShowMore(false);
          }
        }

      } catch (error) {
        console.log(error.message)
      }
    };
    if (currentUser.isAdmin) {
      fetchAdvertisements();
    }
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userAdvertisements.length;
    try {
      const res = await fetch(`/api/advertisement/getadvertisements?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserAdvertisements((prev) => [...prev, ...data.advertisements]);
        if (data.advertisements.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteAdvertisement = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/advertisement/deleteadvertisement/${advertisementIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      else {
        setUserAdvertisements((prev) => prev.filter((advertisement) => advertisement._id !== advertisementIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userAdvertisements.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Advertisement Image</Table.HeadCell>
              <Table.HeadCell>Advertisement Title</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Previous Price</Table.HeadCell>
              <Table.HeadCell>Curent Price</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell><span>Edit</span></Table.HeadCell>

            </Table.Head>
            {userAdvertisements.map((advertisement) => (
              <Table.Body key={advertisement._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(advertisement.updatedAt).toLocaleDateString() + ' ' + new Date(advertisement.updatedAt).toLocaleTimeString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/advertisement/${advertisement.slug}`}>
                      <img src={advertisement.image} alt={advertisement.title} className='w-20 h-10 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/advertisement/${advertisement.slug}`}>{advertisement.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    {advertisement.location}
                  </Table.Cell>
                  <Table.Cell>
                    {advertisement.previousPrice}
                  </Table.Cell>
                  <Table.Cell>
                    {advertisement.currentPrice}
                  </Table.Cell>
                  <Table.Cell>
                    {advertisement.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true);
                      setAdvertisementIdToDelete(advertisement._id);
                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-advertisement/${advertisement._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>

                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show more
            </button>
          )}
        </>
      ) : (<p>You hane no advertisement yet!</p>)
      }


      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this advertisement?</h3>
            <div className='flex justify-center gap-6'>
              <Button color='failure' onClick={handleDeleteAdvertisement}>Yes, I'm sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div >
  )
}
