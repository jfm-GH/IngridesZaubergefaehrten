const { encode } = require('blurhash');
const { loadImage, createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const galleryImages = require('@/data/galleryImages.js'); // Update the path to your galleryImages.js

async function encodeImageToBlurhash(imagePath) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  } catch (error) {
    console.error('Error encoding image:', error);
    return null;
  }
}

async function generateBlurHashes() {
  const updatedGalleryImages = await Promise.all(
    galleryImages.map(async (img) => {
      const blurHash = await encodeImageToBlurhash(path.join(__dirname, img.path));
      return { ...img, blurHash };
    })
  );

  fs.writeFileSync(
    path.join(__dirname, '../data/updatedGalleryImages.js'), // Update the output file path
    `module.exports = ${JSON.stringify(updatedGalleryImages, null, 2)};`
  );
}

generateBlurHashes();
