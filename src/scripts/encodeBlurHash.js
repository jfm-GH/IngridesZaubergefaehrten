const { encode } = require('blurhash');
const { loadImage, createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const galleryImages = require('../data/images.js');

async function encodeImageToBlurhash(imagePath) {
  try {
    console.log(`Loading image: ${imagePath}`);
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const blurHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
    console.log(`\x1b[33mEncoded image: ${imagePath} -> BlurHash: ${blurHash}\x1b[0m`);
    console.log('\x1b[44m\x1b[37mIMPORTANT:\x1b[0m \x1b[1mPlease update this BlurHash in images.js file.\x1b[0m');
    return blurHash;
  } catch (error) {
    console.error(`Error encoding image ${imagePath}:`, error);
    return null;
  }
}

async function generateBlurHashes() {
  console.log('Starting to generate BlurHashes for gallery images...');
  let importStatements = '';
  const updatedGalleryImages = await Promise.all(
    galleryImages.map(async (img, index) => {
      const importName = `img${index + 1}`;
      importStatements += `import ${importName} from "${img.path.replace('../', '@/')}";\n`;

      if (!img.blurHash || img.blurHash.trim() === '') {
        const blurHash = await encodeImageToBlurhash(path.join(__dirname, img.path.replace('@', '../src')));
        return { path: importName, blurHash, alt: img.alt, caption: img.caption, category: img.category };
      } else {
        // Use existing data if blurHash is already present
        return { ...img, path: importName };
      }
    })
  );

  console.log('Finished generating BlurHashes. Writing to file...');

  // Custom stringification to avoid quotes around variable names
  const galleryImagesString = updatedGalleryImages.map(img => {
    return `{\n    path: ${img.path},\n    blurHash: "${img.blurHash}",\n    alt: "${img.alt}",\n    caption: "${img.caption}",\n    category: "${img.category}"\n  }`;
  }).join(',\n');

  const fileContent = `${importStatements}\n\nconst images = [\n${galleryImagesString}\n];\n\nexport default images;`;

  fs.writeFileSync(
    path.join(__dirname, '../data/updatedImages.js'),
    fileContent
  );
  console.log('Updated gallery images file has been written successfully.');
}

generateBlurHashes();
