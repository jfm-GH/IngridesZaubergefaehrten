const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const readlineSync = require('readline-sync');
const { execSync } = require('child_process');

const imagesFilePath = path.join(__dirname, '../data/images.js');
const hashFilePath = path.join(__dirname, '../data/images-hash.txt');

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return md5(content);
}

function hasFileChanged() {
  const currentHash = getFileHash(imagesFilePath);
  if (fs.existsSync(hashFilePath)) {
    const previousHash = fs.readFileSync(hashFilePath, 'utf8');
    return currentHash !== previousHash;
  }
  return true; // No previous hash, assume changed
}

function updateHashFile() {
  const currentHash = getFileHash(imagesFilePath);
  fs.writeFileSync(hashFilePath, currentHash);
}

const isBuild = process.argv.includes('--build');
const fileChanged = hasFileChanged();

if (fileChanged) {
  if (isBuild) {
    console.log('\x1b[33mWarning: images.js has changed. Consider running "npm run encode-blur-hash" before building.\x1b[0m');
    const choices = ['Continue without encoding', 'Run encode-blur-hash and build', 'Cancel build'];
    const index = readlineSync.keyInSelect(choices, 'Choose an option:');
    
    if (index === 0) {
      console.log('Continuing build process without encoding...');
    } else if (index === 1) {
      console.log('Running encode-blur-hash...');
      try {
        execSync('npm run encode-blur-hash', { stdio: 'inherit' });
        console.log('Continuing build process after encoding...');
      } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1);
      }
    } else {
      console.log('Build cancelled.');
      process.exit(1);
    }
  } else {
    console.log('\x1b[44m\x1b[37mIMPORTANT:\x1b[0m \x1b[1mimages.js has changed. Run "npm run encode-blur-hash" to include the changes.\x1b[0m');
  }
}

updateHashFile();