'use client';
import React from 'react'
import FarmerLoginDialog from '../../Login/farmerLogin/page'; 
import RegisterDialog from '@/app/[locale]/register/userRegister/page';


const page = () => {
  const [farmerLoginOpen, setFarmerLoginOpen] = React.useState(true);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const handleFarmerLoginClose = () => {
    setFarmerLoginOpen(false);
  };   
   const handleRegisterClose = () => {
    setFarmerLoginOpen(false);
  };
  return (
    <div>home1
        <FarmerLoginDialog open={'true'} onClose={handleFarmerLoginClose} />
      {/* <RegisterDialog Open={'false'} onClose={handleRegisterClose} />   */}

    </div>
  )
}

export default page