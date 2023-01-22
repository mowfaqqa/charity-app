import React from 'react'
import AppLayout from '../../components/AppLayout';

const Recipient = () => {
  return (
    <div>Recipient</div>
  )
}

export default Recipient
Recipient.getLayout = function getLayout(page: React.ReactElement) {
    return <AppLayout>{page}</AppLayout>;
  };