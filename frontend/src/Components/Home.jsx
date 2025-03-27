import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="max-w-2xl w-full   p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 ">Welcome to Xyz pvt LTD</h1>
      <p className="text-gray-600 text-lg mb-6">Grow Your Business with AI-Powered Solutions, Including Intelligent Automation, Data Extraction, Web & App Development, and AR/VR Experiences.</p>
      <a href='/details' className="btn btn-outline btn-success">
        Details Pages
      </a>
    </div>
  </div>
  )
}

export default Home