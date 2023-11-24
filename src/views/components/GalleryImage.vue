<template>
    <div class="gallery-item">
      <img :src="imagePath" :alt="alt" class="img-fluid clickable lazy"/>
      <p class="caption">{{ caption }}</p> <!-- Optional: Display caption -->
    </div>
</template>
  
  <script>
  export default {
    name: 'GalleryComponent',
    props: {
    imagePath: String,
    alt: String,
    caption: String
    }
  };
  </script>
  
  <style>
  .gallery-item {
    /* Add styles for your gallery item here */
    margin-bottom: 15px; /* Example style */
  }

  .gallery-item .clickable {
  cursor: zoom-in; /* This will change the cursor to a pointer when hovering over the image */
}
  
  .gallery-item img {
    /* Style for the images in the gallery */
    border-radius: 5px; /* Example style */
  }

  /* Custom modal styling */
.modal-dialog {
  max-height: 80vh;
  display: flex;
  align-items: center; /* This centers the modal vertically */
  margin: 0 auto;
}

.modal-content {
  height: auto; /* Adjust height automatically */
  max-height: 80vh; /* Maximum height */
  overflow-y: auto; /* Enable scrolling if content is larger than the modal */
}

.modal-body img {
  max-height: 70vh; /* Adjust the image height to be less than the modal to fit nicely */
  width: auto; /* Maintain aspect ratio */
}

  </style>
  