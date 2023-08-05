import React, { useState } from 'react';
import { Button } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { updateIsFeaturedByPropertyId } from '../apis/properties';

const FavoriteButton = (propertyInfo) => {
  const [isFavorite, setIsFavorite] = useState(propertyInfo.isFeatured);

  const handleFavoriteClick = () => {
    updateIsFeaturedByPropertyId(propertyInfo.id, !isFavorite);
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      type="text"
      onClick={handleFavoriteClick}
      icon={isFavorite ? <StarFilled style={{ color: '#1677ff' }} /> : <StarOutlined />}
    />
  );
};

export default FavoriteButton;