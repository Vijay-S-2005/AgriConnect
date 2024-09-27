'use client';
import { Assets } from '../../public/assets/Assets';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]} // Include Autoplay module here
      >
        <SwiperSlide>
          <Image src={Assets.slider_img1} alt="Slide 1" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Assets.slider_img2} alt="Slide 2" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Assets.slider_img3} alt="Slide 3" layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
