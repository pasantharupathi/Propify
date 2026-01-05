import { useState } from 'react';
import '../styles/main.css';

const ImageGallery = ({ property }) => {
  const generateImagePaths = () => {
    const images = [];
    for (let i = 1; i <= 6; i++) {
      images.push(property[`p${i}`]);
    }
    return images;
  };

  const [images] = useState(generateImagePaths(property.id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const getPlaceholderImage = (index) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext fill="%236B7280" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EProperty Image ${index + 1}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div className="image-gallery">
      <img
        src={images[currentImageIndex]}
        alt={`${property.type} - Image ${currentImageIndex + 1}`}
        className="image-gallery-main"
        onError={(e) => {
          e.target.src = getPlaceholderImage(currentImageIndex);
        }}
      />
      <div className="image-gallery-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`image-gallery-thumbnail ${
              index === currentImageIndex ? 'active' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
            onError={(e) => {
              e.target.src = getPlaceholderImage(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
