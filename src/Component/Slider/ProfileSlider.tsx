import React from 'react'
import { Card } from 'flowbite-react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Paragraph, Paragraph2Xl } from '../Paragraph';

const ProfileSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        cssEase: "linear",

    };
    return (
        <Card className="max-w-sm w-100 border-transparent">
            <Slider {...settings}>
                <div className="">
                    <div className="flex ">
                        <div className="">
                            <Paragraph2Xl content={"Waste Management Tips"}/>
                            <Paragraph content={"Do you know that Every Waste Payment Counts Towards a Cleaner Environment"} />
                        </div>
                        <div className="">
                            <img src="Images/wastemanagement.jpg" alt="waste management"  />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex ">
                        <div className="">
                            <Paragraph2Xl content={"Waste Management Tips 2"}/>
                            <Paragraph content={"Do you know that Every Waste Payment Counts Towards a Cleaner Environment"} />
                        </div>
                        <div className="">
                            <img src="Images/wastemanagement.jpg" alt="waste management"  />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex ">
                        <div className="">
                            <Paragraph2Xl content={"Waste Management Tips 3"}/>
                            <Paragraph content={"Do you know that Every Waste Payment Counts Towards a Cleaner Environment"} />
                        </div>
                        <div className="">
                            <img src="Images/wastemanagement.jpg" alt="waste management"  />
                        </div>
                    </div>
                </div>
                
            </Slider>
        </Card>
    )
}

export default ProfileSlider