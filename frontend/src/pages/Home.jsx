import React from 'react'
import Navbar from '../components/Navbar'
import Table from '../components/Table'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="flex justify-center items-start pt-8">
        <div className="w-full">
          <Table/>
        </div>
      </div>
    </div>
  )
}

export default Home