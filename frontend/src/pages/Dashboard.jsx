import React from 'react'
import Appbar from '../components/Signin-ed-Components/Appbar'
import Balance from '../components/Signin-ed-Components/Balance'
import Users from '../components/Signin-ed-Components/Users'

const Dashboard = () => {
  return (
    <>
      <Appbar />
      <div className='m-8'>
        <Balance value={10000} />
        <Users />
      </div>
    </>
  )
}

export default Dashboard