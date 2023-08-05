import React, { useEffect, useRef } from "react";
import { Button, Typography } from "antd";
import { isEmpty } from "ramda";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import PropertyCard from "./PropertyCard";
import { useLocation } from "react-router";
import { useFetchFeaturedAssets } from "../hooks/usePropertiesApi";
import { useQueryClient } from "@tanstack/react-query";

const PopularProperties = () => {
  const sliderRef = useRef();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: properties = [] } = useFetchFeaturedAssets();

  useEffect(()=>{
    if(location.pathname === "/")
    {
      queryClient.invalidateQueries("propertiesList");
    }
  }, [location])

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
        <div>
        <Typography.Title className="heading-text-home" level={5}>
          Best Choice
        </Typography.Title>
        <Typography.Title style={{color: "#1F3E72", marginTop: "10px"}} level={1}>
          Popular Residences
        </Typography.Title>
        </div>
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
