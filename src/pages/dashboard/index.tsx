import React from 'react'
import AppLayout from '../../components/AppLayout';

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
  };