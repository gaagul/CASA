import React from "react";
import {
  Favorite,
  FavoriteBorder,
  KingBedOutlined,
  BathtubOutlined,
  AspectRatioOutlined,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${property.id}`);
  };

  return (
    <div
      className="h-64 w-52 rounded-lg border-2 shadow-md"
      onClick={handleClick}
    >
      <img
        alt="img"
        className="thumbnail h-1/2 w-full"
        src={property?.thumbnailUrl}
      />
      <div className="mt-2 flex flex-col px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-end">
            <Typography className="primary-text" fontSize={14}>
              ${property?.price}
            </Typography>
            <Typography fontSize={14}>
              {property?.forRent ? " /month" : ""}
            </Typography>
          </div>
          <IconButton
            size="small"
            style={{
              height: "30px",
            }}
          >
            {property?.favorite ? (
              <Favorite className="primary-text" />
            ) : (
              <FavoriteBorder className="primary-text" />
            )}
          </IconButton>
        </div>
        <Typography className="mt-1" fontSize={14} variant="h6">
          {property?.name}
        </Typography>
        <Typography className="property-card__address mt-1">
          {property?.address}
        </Typography>
        <div className="mt-2 border border-gray-300" />
        <div className="mt-2 flex justify-between">
          <div className="flex items-center gap-1">
            <KingBedOutlined className="primary-text" fontSize="10" />
            <p className="property-card__footer-item">{property?.beds} beds</p>
          </div>
          <div className="flex items-center gap-1">
            <BathtubOutlined className="primary-text" fontSize="10" />
            <p className="property-card__footer-item">
              {property?.baths} baths
            </p>
          </div>
          <div className="flex items-center gap-1">
            <AspectRatioOutlined className="primary-text" fontSize="10" />
            <p className="property-card__footer-item">{property?.area} m2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
