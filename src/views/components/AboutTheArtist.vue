<template>
  <div class="card mb-3">
    <div class="p-3 card-body">
      <div class="card-title">
        <h6>Über die Künstlerin</h6>
      </div>

      <div class="artist-info">

        <div v-if="image">
          <gallery-image :imagePath="image.path" :blurHash="image.blurHash" :alt="image.alt" :caption="image.caption" />
        </div>

        <h5 class="card-subtitle mb-2 text-muted">Ingride Mateen</h5>
        <p class="text-s text-secondary mb-2">Email: <a
            href="mailto:IngrideTheArtist@gmail.com">IngrideTheArtist@gmail.com</a></p>
        <p class="text-s text-secondary mb-2">Telefon: <a href="tel:+49176123456">123-456-7890</a></p>
        <p class="text-s text-secondary mb-2">Ort: 33332 Gütersloh, Deutschland</p>
      </div>
      <div class="artist-bio">
        <p class="text-s">
          Brief biography or statement from the artist. This could include the artist's inspiration, style, achievements,
          or any other relevant information that introduces the artist to the website visitors.
        </p>
      </div>
    </div>
  </div>
</template>
  
<script>

import GalleryImage from "./GalleryImage.vue";

export default {
  name: "AboutTheArtist",
  props: {
    image: {
      type: Object,
      default: () => { },
    }
  },
  components: {
    GalleryImage
  },
};
</script>
  
<style scoped>
.artist-card {
  /* Add styles specific to the artist card */
}

.artist-info img {
  /* Style for the artist's image */
}

/* Additional styling as needed */
</style>
