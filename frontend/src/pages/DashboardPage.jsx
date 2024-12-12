import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAdvertisements from '../components/DashAdvertisements';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardMain from '../components/DashboardMain';
import { useSelector } from 'react-redux';
import NotFound from './NotFound';

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

  const renderTabContent = () => {
    if (tab === 'profile') return <DashProfile />;
    if (currentUser.isAdmin && tab === 'advertisements') return <DashAdvertisements />;
    if (currentUser.isAdmin && tab === 'users') return <DashUsers />;
    if (currentUser.isAdmin && tab === 'comments') return <DashComments />;
    if (currentUser.isAdmin && tab === 'dashboard') return <DashboardMain />;
    return <NotFound />;
  }


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {renderTabContent()}
    </div>
  )
}
