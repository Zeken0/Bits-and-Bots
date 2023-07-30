// components/Slider.js
import Image from "next/image";
import React from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Slider = ({ slides }) => {
  return (
    <Swiper
      spaceBetween={92}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Image
            src={slide.imageUrl}
            height={346.5}
            width={550}
            alt={`Slide ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
