const { encode } = require('blurhash');
const path = require('path');
const { loadImage, createCanvas } = require('canvas');

async function encodeImageToBlurhash(imagePath) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const blurhash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
    return blurhash;
  } catch (error) {
    console.error('Error encoding image:', error);
  }
}

// Example usage
encodeImageToBlurhash(path.join(__dirname, '/carousel-1.jpg')).then(blurhash => {
  console.log('BlurHash:', blurhash);
});
