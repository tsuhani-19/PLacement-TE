import React from 'react'
import bannerImg from "../../assets/banner.jpg"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-10 justify-between items-center gap-12 ml-[2rem]  '>
    <div className='md:w-1/2 w-full flex items-center md:justify-end'>
       <img src={bannerImg} alt="" />
   </div>
   
   <div className=' md:w-1/2 w-full ' >
   <h1 className="md:text-5xl text-3xl font-light tracking-wide mb-7 font-[Poppins]">
  Your Path to Career Success Starts Here!
</h1>


       <p className='mb-10  '>Unlock personalized career insights, placement predictions, and resources tailored to your branch and year. Get ready to take the next step in your professional journey!</p>

       <button className="bg-primary px-6 py-3 rounded-md text-lg font-bold hover:bg-secondary hover:text-white transition-all duration-200">
  Get Started
</button>

   </div>

  
</div>
  )
}

export default Banner
