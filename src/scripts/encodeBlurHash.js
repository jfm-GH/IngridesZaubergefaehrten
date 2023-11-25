import { encode } from 'blurhash';
import { loadImage, createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import galleryImages from '../data/galleryImages-cjs.js';

/*
function getCurrentDirectory(importMetaUrl) {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  } else {
    return path.dirname(new URL(importMetaUrl).pathname);
  }
}
*/

async function encodeImageToBlurhash(imagePath) {
  try {
    console.log(`Loading image: ${imagePath}`);
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const blurHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
    console.log(`Encoded image: ${imagePath} -> BlurHash: ${blurHash}`);
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
        return { path: importName, blurHash, alt: img.alt, caption: img.caption };
      } else {
        // Use existing data if blurHash is already present
        return Object.assign({}, img, { path: importName });
      }
    })
  );
  
  console.log('Finished generating BlurHashes. Writing to file...');

  // Custom stringification to avoid quotes around variable names
  const galleryImagesString = updatedGalleryImages.map(img => {
    return `{\n    path: ${img.path},\n    blurHash: "${img.blurHash}",\n    alt: "${img.alt}",\n    caption: "${img.caption}"\n  }`;
  }).join(',\n');

  const fileContent = `${importStatements}\n\nconst galleryImages = [\n${galleryImagesString}\n];\n\nexport default galleryImages;`;
  const currentDirectory = __dirname;
  //const currentDirectory = getCurrentDirectory(import.meta.url);
  const filePath = path.join(currentDirectory, '../data/updatedGalleryImages.js');

  fs.writeFileSync(filePath, fileContent);
  console.log('Updated gallery images file has been written successfully.');
}

generateBlurHashes();
