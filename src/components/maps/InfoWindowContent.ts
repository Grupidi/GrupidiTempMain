export function createInfoWindowContent(place: google.maps.places.PlaceResult): string {
  const photos = place.photos || [];
  const photoGallery = photos.length > 0 
    ? `
      <div class="photo-gallery" style="display: flex; overflow-x: auto; margin: 8px -16px;">
        ${photos.slice(0, 3).map(photo => `
          <img 
            src="${photo.getUrl({ maxWidth: 100, maxHeight: 100 })}" 
            alt="${place.name}" 
            style="width: 100px; height: 100px; object-fit: cover; margin-right: 8px; border-radius: 4px;"
          />
        `).join('')}
      </div>
    ` 
    : '';

  const openNow = place.opening_hours?.isOpen?.() 
    ? '<span style="color: #10B981;">Open now</span>' 
    : '<span style="color: #EF4444;">Closed</span>';

  const priceLevel = place.price_level 
    ? '•' + '💰'.repeat(place.price_level) 
    : '';

  const rating = place.rating 
    ? `
      <div style="display: flex; align-items: center; margin-top: 4px;">
        <span style="color: #F59E0B;">★</span>
        <span style="margin-left: 4px;">${place.rating}</span>
        ${place.user_ratings_total ? `
          <span style="margin-left: 4px; color: #6B7280; font-size: 0.875rem;">
            (${place.user_ratings_total} reviews)
          </span>
        ` : ''}
      </div>
    `
    : '';

  const phoneNumber = place.formatted_phone_number
    ? `
      <div style="margin-top: 8px;">
        <a href="tel:${place.formatted_phone_number}" style="color: #3B82F6; text-decoration: none;">
          📞 ${place.formatted_phone_number}
        </a>
      </div>
    `
    : '';

  const saveButtonId = `save-button-${place.place_id}`;

  // Define the save handler function before creating the content
  if (typeof window !== 'undefined' && !window.handleSaveLocation) {
    window.handleSaveLocation = function(placeId: string) {
      const button = document.getElementById(`save-button-${placeId}`);
      if (button) {
        const originalText = button.innerHTML;
        button.classList.add('saving');
        button.classList.add('saved');
        button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>Location Saved!';
        
        setTimeout(() => {
          button.classList.remove('saving');
          button.classList.remove('saved');
          button.innerHTML = originalText;
        }, 1500);
        
        // Call the original save handler
        if (window.originalHandleSaveLocation) {
          window.originalHandleSaveLocation(placeId);
        }
      }
    };
  }

  return `
    <div style="padding: 8px; max-width: 300px;">
      <h3 style="margin: 0 0 4px; font-weight: 600; font-size: 1.125rem;">${place.name}</h3>
      <div style="color: #4B5563; font-size: 0.875rem;">
        ${openNow} ${priceLevel}
      </div>
      ${rating}
      ${photoGallery}
      <div style="margin-top: 8px; color: #4B5563;">
        ${place.vicinity || ''}
      </div>
      ${phoneNumber}
      ${place.website ? `
        <a 
          href="${place.website}" 
          target="_blank" 
          rel="noopener noreferrer"
          style="display: inline-block; margin-top: 8px; color: #3B82F6; text-decoration: none;"
        >
          🌐 Visit website
        </a>
      ` : ''}
      <button 
        id="${saveButtonId}"
        onclick="handleSaveLocation('${place.place_id}')"
        style="
          margin-top: 12px;
          padding: 8px 16px;
          background-color: #EC4899;
          color: white;
          border: none;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        "
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
        Save Location
        <div class="save-overlay" style="
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #EC4899, #F472B6);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        "></div>
      </button>
    </div>
    <style>
      @keyframes saveSuccess {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
      }
      
      .saving {
        animation: saveSuccess 0.5s ease;
      }
      
      .saved .save-overlay {
        transform: translateX(0) !important;
      }
    </style>
  `;
}

// Add type declaration for window.handleSaveLocation
declare global {
  interface Window {
    handleSaveLocation: (placeId: string) => void;
    originalHandleSaveLocation: (placeId: string) => void;
  }
}