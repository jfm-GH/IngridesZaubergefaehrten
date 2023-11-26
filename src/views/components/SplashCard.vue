<template>
  <div class="card mb-3 bg-splash">
    <div class="p-3 card-body">
      <div class="card-title">
        <h1>Ingride's Zaubergefährten</h1>
      </div>

    
    </div>
  </div>
</template>

<script>

export default {
  name: "AboutTheArtist",
  props: {
    image: {
      type: Object,
      default: () => { },
    }
  },
};
</script>
<style scoped>
.bg-splash {
  background-image: url('../../assets/img/gallery-images/Header.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

.artist-info img {
  /* Style for the artist's image */
}

/* Additional styling as needed */
</style>
