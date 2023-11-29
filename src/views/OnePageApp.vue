<template>

  
  <!-- TESTING -->
  <div class="imgs">
    <img
      :src="splash1"
      data-img
      id="img-1"
      class="top-section-img show"
    />
    <img :src="splash2" data-img id="img-2" />
    <img :src="splash3" data-img id="img-3" />
  </div>

  <section class="top-section full-screen-section">
    <div class="left">
      <h1 class="animated fadeInDown">Ingride's Zaubergefährten</h1>
      <p>
        Zaubergefährten aus Ton in leidenschaftlicher Handarbeit gefertigt.
      </p>
    </div>
    <argon-avatar
      class="w-30 mt-2"
      :img="splash2"
      alt="logo" />
    <div class="right"></div>
  </section>

  <section class="full-screen-section first-main-section">
    <h1>Completely Visual</h1>
    <p>Never touch the command line, from provision to production.</p>
    <div data-img-to-show="#img-1"></div>
  </section>

  <section class="full-screen-section">
    <h1>Full Stack</h1>
    <p>
      Never manage infrastructure again. One click gets you: a database, APIs,
      deployments, hosting, etc.
    </p>
    <div data-img-to-show="#img-2"></div>
  </section>

  <section class="full-screen-section">
    <h1>Launch Faster</h1>
    <p>Logical can get systems to market in minutes instead of weeks.</p>
    <!--<div data-img-to-show="#img-3"></div>-->
  </section>

  <section class="full-screen-section">
    <h1>Testing avatar</h1>
    <p>Will it hold up?</p>
    <div class="fadeIn4">
      <argon-avatar
        class="w-30 mt-2"
        :img="splash2"
        alt="logo" />
    </div>
  </section>
  <!-- END TESTING -->


  <div class="py-4 container-fluid">
    
    <!-- Main row -->
    <div class="row">
      <!-- Artist Info Wrapper -->
      <div class="col-lg-6 col-md-12">
        <div class="sticky-top">
          <about-the-artist :image="filteredArtistImage" />
        </div>
      </div>
      <!-- Gallery section -->
      <div class="col-lg-6 col-md-12">
        <div class="row gy-4">
          <div class="col-sm-6 col-md-4" v-for="(image, index) in filteredGalleryImages" :key="index">
            <gallery-image :imagePath="image.path" :blurHash="image.blurHash" :alt="image.alt" :caption="image.caption"
              @click="setCurrentImage(image)" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="currentImage" class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h5 class="modal-title text-light" id="imageModalLabel">{{ currentImage.caption }}</h5>
            <button type="button" class="btn-close btn-primary" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="currentImage.path" class="img-fluid" :alt="currentImage.alt" v-touch:swipe.left="goToNextImage"
              v-touch:swipe.right="goToPreviousImage">
            <!-- Modal Navigation Buttons -->
            <button class="btn btn-primary position-absolute top-50 translate-middle-y fs-4 text-white bg-transparent border-0"
              style="left: 10px;" @click="goToPreviousImage">&#10094;</button>

            <button class="btn btn-primary position-absolute top-50 translate-middle-y fs-4 text-white bg-transparent border-0"
              style="right: 10px;" @click="goToNextImage">&#10095;</button>
            <!-- Share button -->
            <button class="btn btn-primary mt-2" @click="shareImage">Teilen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AboutTheArtist from "./components/AboutTheArtist.vue";
import GalleryImage from "./components/GalleryImage.vue";
import ArgonAvatar from "../components/ArgonAvatar.vue";
import images from "@/data/updatedImages.js"
import * as bootstrap from 'bootstrap';
import { nextTick } from 'vue';
import "@/assets/js/scrollAnimations.js";
import "@/assets/css/scrollAnimations.css";
import {onIntersect} from "@/composables/IntersectionObserver.js";

import splash1 from "@/assets/img/gallery-images/Header.png";
import splash2 from "@/assets/img/gallery-images/Header03.png";

import splash3 from "@/assets/img/gallery-images/20231108_191340_neu.png";

//import splash2 from "@/assets/img/gallery-images/20231110_145506_neu.png";
//import splash3 from "@/assets/img/gallery-images/20231108_190940.jpg";

window.bootstrap = bootstrap;

export default {
  name: "home",
  components: {
    AboutTheArtist,
    GalleryImage,
    ArgonAvatar,
  },
  data() {
    return {
      galleryImages: images,
      currentImage: null,
      currentImageIndex: null,
      splash1: splash1,
      splash2: splash2,
      splash3: splash3,
    };
  },
  mounted() {
    console.log("mounted")
    document.querySelectorAll("[data-img-to-show]").forEach(section => {
      console.log("section", section)
      onIntersect(section, this.setImageVisibility, undefined, false, {threshold: 0.5});
    })
    
  },
  computed: {
    filteredGalleryImages() {
      return this.galleryImages.filter(image => image.category === 'gallery');
    },
    filteredArtistImage() {
      const filteredImages = this.galleryImages.filter(image => image.category === 'AboutTheArtist');
      return filteredImages.length > 0 ? filteredImages[0] : null; // Return the first image or null if none found
    },
  },
  methods: {
    setCurrentImage(image) {
      this.currentImage = image;
      this.currentImageIndex = this.galleryImages.findIndex(img => img.path === image.path);
      nextTick(() => {
        new bootstrap.Modal(document.getElementById('imageModal')).show();
      });
    },
    goToNextImage() {
      if (this.currentImageIndex < this.galleryImages.length - 1) {
        this.currentImageIndex++;
        this.currentImage = this.galleryImages[this.currentImageIndex];
      }
    },
    goToPreviousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
        this.currentImage = this.galleryImages[this.currentImageIndex];
      }
    },
    shareImage() {
      if (navigator.share) {
        navigator.share({
          title: this.currentImage.caption,
          url: this.currentImage.path,
        }).then(() => {
          console.log('Thanks für\'s teilen!');
        })
          .catch(console.error);
      } else {
        // Fallback for browsers that do not support the Web Share API
        alert('Ihr Browser unterstützt das Teilen via Web Share API nicht.');
      }
    },
    setImageVisibility(target) {
      console.log("setImageVisibility");
      console.log("entry", target);
      document.querySelectorAll("[data-img]").forEach(img => {
        img.classList.remove("show")
      })
      const img = document.querySelector(target.dataset.imgToShow)
      img?.classList.add("show")
    },
  }
}
</script>