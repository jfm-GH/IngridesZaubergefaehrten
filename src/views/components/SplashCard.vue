<template>
  <span class="card mb-3" :style="backgroundStyle">
  </span>
</template>

<script>
export default {
  name: "AboutTheArtist",
  props: {
    imagePath: String
  },
  computed: {
  backgroundStyle() {
    return {
      backgroundImage: `url(${this.imagePath})`,
      backgroundSize: 'contain', // Resize the background image to be fully visible
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat', // Don't repeat the background image
      height: '100vh', // Set the container height to the full viewport height
      width: '100vw', // Set the container width to the full viewport width
      margin: '0',
      padding: '0',
      objectFit: 'contain', // Maintain the aspect ratio of the image
      display: 'flex', // Optional: For aligning inner content
      justifyContent: 'center', // Optional: For centering horizontally
      alignItems: 'center' // Optional: For centering vertically
    };
  }
}
};
</script>

<style scoped>
/* Styles for .bg-splash moved to computed property */

.artist-info img {
  /* Style for the artist's image */
}

/* Additional styling as needed */
</style>
