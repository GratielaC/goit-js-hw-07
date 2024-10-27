import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

// Generate gallery markup
const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
  })
  .join('');

// Insert the markup into the DOM
galleryContainer.innerHTML = galleryMarkup;

// Handle gallery item clicks
galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  
  const isImage = event.target.classList.contains('gallery__image');
  if (!isImage) return;
  
  const largeImageURL = event.target.dataset.source;
  openModal(largeImageURL);
}

// Open modal using basicLightbox
function openModal(imageUrl) {
  const instance = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
  `);

  instance.show();

  // Close modal with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      instance.close();
    }
  });
}
