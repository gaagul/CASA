import { Button, Typography } from "antd";
import {
  LeftOutlined,
  ShareAltOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ house }) => {
  const navigate = useNavigate();
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleBrowse = () => {
    navigate(`/listing?location=${house.zipcode}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <Link to="/listing">
        <div className="text primary-text flex items-center gap-1 text-sm">
          <LeftOutlined style={{ fontSize: "10px" }} />
          See all listings
        </div>
      </Link>
      <Typography.Title className="mb-0" level={2}>
        {house.name}
      </Typography.Title>
      <div className="flex justify-between">
        <Typography.Text className="text-base" type="secondary">
          {house.address}
        </Typography.Text>
        <div className="flex gap-3">
          <Button
            className="primary-text secondary-button-bg flex items-center"
            icon={<ShareAltOutlined />}
            type="secondary"
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            className="primary-text secondary-button-bg flex items-center"
            icon={<HeartOutlined />}
            type="secondary"
          >
            Favorite
          </Button>
          <Button
            className="primary-text secondary-button-bg flex items-center"
            icon={<SearchOutlined />}
            type="secondary"
            onClick={handleBrowse}
          >
            Browse listings nearby
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
