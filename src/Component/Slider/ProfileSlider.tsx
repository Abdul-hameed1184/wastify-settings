import React from "react";
import { Card } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <Card className="h-screen p-0 border-none shadow-none rounded-xl">
      <Slider {...sliderSettings}>
        {tips.map((tip, index) => (
          <div key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-16 py-12">
              
              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-8xl font-extrabold">
                  {tip.title}
                </h2>
                <p className="mt-4 text-2xl text-gray-600">
                  {tip.text}
                </p>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full max-w-sm rounded-lg object-cover"
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
