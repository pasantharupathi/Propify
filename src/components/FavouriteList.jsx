import { useState, useRef } from 'react';
import '../styles/main.css';

const FavouriteList = ({ favourites, onRemove, onClearAll, onDrop }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const sidebarRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price);
  };

    const handleDragStart = (e, property) => {
        setDraggedItem(property);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', property.id);
        e.dataTransfer.setData('application/json', JSON.stringify(property));
        e.currentTarget.classList.add('dragging-away');
    };

    const handleDragEnd = (e, property) => {
    const sidebarElement = sidebarRef.current;

        if (!sidebarElement) {
        setDraggedItem(null);
        return;
        }

        const dropTarget = document.elementFromPoint(e.clientX, e.clientY);

        if (!dropTarget) {
            const sidebarRect = sidebarElement.getBoundingClientRect();
            const distanceX = Math.abs(e.clientX - sidebarRect.right);
            const distanceY = Math.abs(e.clientY - sidebarRect.top);

            if (distanceX > 150 || distanceY > 150) {
                if (onRemove) {
                    onRemove(property.id);
                }
            }
            setDraggedItem(null);
            return;
        }

        const isOutsideSidebar = !sidebarElement.contains(dropTarget);
        const propertiesContainer = document.querySelector('.properties-results');
    const isInPropertiesList = propertiesContainer && propertiesContainer.contains(dropTarget);
    
    
    if (!isInsideSidebar && !isInPropertiesList) {
      
      const sidebarRect = sidebarElement.getBoundingClientRect();
      if (e.clientX < sidebarRect.left - 100) {
        if (onRemove) {
          onRemove(property.id);
        }
      } else {
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !mainContent.contains(dropTarget)) {
          if (onRemove) {
            onRemove(property.id);
          }
        }
      }
    }
    
    
    const draggingElements = document.querySelectorAll('.dragging-away');
    draggingElements.forEach(el => el.classList.remove('dragging-away'));
    
    setDraggedItem(null);
  };

  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    try {
      const propertyData = e.dataTransfer.getData('application/json');
      if (propertyData) {
        const property = JSON.parse(propertyData);
        if (onDrop) {
          onDrop(property);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
    
    setDraggedItem(null);
  };

  if (favourites.length === 0) {
    return (
      <div
        ref={sidebarRef}
        className={`favourites-sidebar ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="favourites-header">
          <h3>Favourites</h3>
        </div>
        <div className="favourites-empty">
          <p>No favourites yet</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Drag properties here to add to favourites
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sidebarRef}
      className={`favourites-sidebar ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="favourites-header">
        <h3>Favourites ({favourites.length})</h3>
        {favourites.length > 0 && (
          <button
            className="btn btn-outline"
            onClick={onClearAll}
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Clear All
          </button>
        )}
      </div>
      <div
        className="favourites-list"
        style={{ minHeight: '100px' }}
      >
        {favourites.map((property) => (
          <div
            key={property.id}
            className={`favourite-item ${draggedItem?.id === property.id ? 'dragging' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, property)}
            onDragEnd={(e) => handleDragEnd(e, property)}
            title="Drag to remove from favourites"
          >
            {property.picture && (
              <img
                src={property.picture}
                alt={`${property.type} in ${property.location}`}
                className="favourite-item-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="favourite-item-info">
              <div className="favourite-item-title">{property.type}</div>
              <div className="favourite-item-price">{formatPrice(property.price)}</div>
              {property.location && (
                <div className="favourite-item-location" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {property.location.length > 30 ? property.location.substring(0, 30) + '...' : property.location}
                </div>
              )}
            </div>
            <button
              className="favourite-item-remove"
              onClick={() => onRemove(property.id)}
              aria-label="Remove from favourites"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteList;