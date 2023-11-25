<template>
    <div class="gallery-item" >
      <div class="gallery-image" :style="backgroundStyle">
        <img :src="imagePath" :alt="alt" class="img-fluid clickable lazy" @load="onImageLoad" />
        <p class="caption">{{ caption }}</p> <!-- Optional: Display caption -->
      </div>
    </div>
</template>
  
<script>
import { decode } from 'blurhash';

export default {
  name: 'GalleryComponent',
  props: {
  imagePath: String,
  blurHash: String,
  alt: String,
  caption: String
  },
  data() {
    return {
      imageLoaded: false,
      backgroundStyle: {}, // This will store the background style
    }
  },
  mounted() {
    this.displayBlurHash();
  },
  methods: {
    displayBlurHash() {
      const pixels = decode(this.blurHash, 32, 32); // Adjust dimensions as needed
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 32; // BlurHash dimensions
      canvas.height = 32;
      const imageData = new ImageData(pixels, 32, 32); // Adjust dimensions as needed
      ctx.putImageData(imageData, 0, 0);

      // Convert canvas to data URL and set as background
      const dataUrl = canvas.toDataURL();
      this.backgroundStyle = { "backgroundImage": `url(${dataUrl})`,
        "width": "291px",
        "height": "388px"
       };
    },
    onImageLoad() {
      this.imageLoaded = true;
      console.log('Image loaded');
      this.backgroundStyle = {}; // Clear the background style
    }
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
    width: 100%;
    aspect-ratio: auto;
    display: block;
  }
  .gallery-item .gallery-image {
    /* Style for the images in the gallery */
    border-radius: 5px; /* Example style */
    display: block;
    background-size: cover;
    background-position: center;
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
    width: 100%; /* Maintain aspect ratio */
    display: block;
    aspect-ratio: 1 / 1;
    object-position: center;
    object-fit: cover;
  }
</style>
  