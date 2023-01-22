import React from 'react'
import AppLayout from '../../components/AppLayout';

const Donor = () => {
  return (
    <div>Donor</div>
  )
}

export default Donor
Donor.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
  };