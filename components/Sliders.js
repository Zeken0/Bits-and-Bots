// components/Slider.js
import Image from "next/image";
import SwiperCore from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";

SwiperCore.use([Autoplay]);

const Slider = ({ slides }) => {
  return (
    <Swiper
      spaceBetween={92}
      slidesPerView={3}
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
