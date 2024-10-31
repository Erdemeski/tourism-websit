import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAdvertisements from '../components/DashAdvertisements';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardMain from '../components/DashboardMain';
import { useSelector } from 'react-redux';

export default function DashboardPage() {

  const { currentUser } = useSelector((state) => state.user)
  const location = useLocation();
  const [tab, setTab] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    if (!currentUser.isAdmin) {
      if (tab !== 'profile'/*  || tab !== 'deneme' */) {
        navigate('/dashboard?tab=profile');
        setTab('profile');
      }
    }
  }, [location.search]);


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {currentUser.isAdmin && tab === 'advertisements' && <DashAdvertisements />}
      {currentUser.isAdmin && tab === 'users' && <DashUsers />}
      {currentUser.isAdmin && tab === 'comments' && <DashComments />}
      {currentUser.isAdmin && tab === 'dashboard' && <DashboardMain />}

    </div>
  )
}
