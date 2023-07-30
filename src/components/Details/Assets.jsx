import React, { useRef } from "react";
import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Assets = ({ imageList }) => {
  const carouselRef = useRef();

  const goToPrev = () => {
    carouselRef.current.prev();
  };

  const goToNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="relative w-2/3 max-w-2xl overflow-hidden rounded-lg border-2">
      <Carousel ref={carouselRef}>
        {imageList.map(asset => (
          <div key={asset.id}>
            <img alt="Home" className="w-full object-cover" src={asset || ""} />
          </div>
        ))}
      </Carousel>
      <div className="carousel-arrows absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
        <Button
          className="primary-text flex items-center justify-around bg-white opacity-75"
          icon={<LeftOutlined />}
          shape="circle"
          type="primary"
          onClick={goToPrev}
        />
        <Button
          className="primary-text flex items-center justify-around bg-white opacity-75"
          icon={<RightOutlined />}
          shape="circle"
          type="primary"
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default Assets;
