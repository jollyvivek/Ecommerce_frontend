import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className=' '>
        <div className=' text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
        </div>
        <div className=' my-10 flex flex-col md:flex-row gap-10 mb-20'>
          <img className=' w-fit md:max-w-[480px]' src={assets.contact_img} alt="img" />
          <div className=' flex flex-col justify-center items-start gap-4'>
              <p className=' font-semibold text-xl text-gray-600'>OUR STORE</p>
              <p className=' text-gray-500'>54709 Willms Station <br />Suite 350, Washington, USA</p>
              <p className=' text-gray-500'>Tel: (415) 555‑0132 <br /> Email: jollyvivek19@gmail.com</p>
              <p className=' text-xl font-semibold text-gray-600 uppercase'>Careers at Forever</p>
              <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
              <button className=' border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
          </div>
        </div>
      <NewsLetterBox />
      
      
      
      
    </div>
  )
}

export default Contact