import React, { useRef } from "react";
import { Button, Typography } from "antd";
import { isEmpty } from "ramda";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import PropertyCard from "./PropertyCard";
import { useFetchFeaturedAssets } from "../hooks/usePropertiesApi";

const PopularProperties = () => {
  const sliderRef = useRef();

  const { data: properties = [] } = useFetchFeaturedAssets();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: properties.length > 4 ? 4 : properties.length,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="mb-8 mt-8">
      <div className="flex justify-between">
        <Typography.Title className="heading-text-home" level={3}>
          Popular Residences.
        </Typography.Title>
        <div className="flex gap-4">
          <Button
            icon={<LeftCircleOutlined />}
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <Button
            icon={<RightCircleOutlined />}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
      {isEmpty(properties) ? (
        <div className="flex justify-around py-8">
          Explore your dream home today! Stay tuned for featured properties
          coming soon! 🏠🔜
        </div>
      ) : (
        <Slider {...settings} className="variable-width mt-6" ref={sliderRef}>
          {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PopularProperties;
