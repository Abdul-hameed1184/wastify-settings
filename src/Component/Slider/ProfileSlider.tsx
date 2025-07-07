import React from 'react';
import { Card } from 'flowbite-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Paragraph, Paragraph2Xl } from '../Paragraph';

const tips = [
  {
    title: "Waste Management Tips",
    text: "Every waste payment counts towards a cleaner environment.",
    image: "/Images/wastemanagement.jpg",
  },
  {
    title: "Waste Management Tips 2",
    text: "Ensure timely disposal to maintain public hygiene and safety.",
    image: "/Images/wastemanagement.jpg",
  },
  {
    title: "Waste Management Tips 3",
    text: "Separate recyclable waste to promote sustainability.",
    image: "/Images/wastemanagement.jpg",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 7000,
  cssEase: "ease-in-out",
};

const ProfileSlider: React.FC = () => {
  return (
    <Card className="w-full max-w-md p-4 shadow-lg border-none">
      <Slider {...sliderSettings}>
        {tips.map((tip, index) => (
          <div key={index}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-center md:text-left">
              <div className="flex-1">
                <Paragraph2Xl content={tip.title} />
                <Paragraph content={tip.text} />
              </div>
              <div className="flex-1">
                <img
                  src={tip.image}
                  alt={`Illustration for ${tip.title}`}
                  className="w-full max-w-[160px] mx-auto rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default ProfileSlider;
