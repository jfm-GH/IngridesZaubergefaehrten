// scripts/postbuild.js
const { execSync, exec } = require('child_process');
const readlineSync = require('readline-sync');

console.log('Post-build script running...');

// Function to execute the deploy command
const runDeploy = () => {
    exec('npm run deploy', (error, stdout, stderr) => {
      if (error) {
        console.error(`Deployment error: ${error}`);
        return;
      }
      console.log(`Deployment output: ${stdout}`);
      if (stderr) {
        console.error(`Deployment error output: ${stderr}`);
      }
    });
  };

// Function to execute the GitHub Pages update command
const updateGitHubPages = () => {
  try {
    execSync('git subtree push --prefix dist origin gh-pages', { stdio: 'inherit' });
    console.log('GitHub Pages updated successfully.');
  } catch (error) {
    console.error('Failed to update GitHub Pages:', error);
  }
};


// Call the function to run the deploy script
runDeploy();

// Ask the user if they want to update GitHub Pages
const update = readlineSync.question('Do you want to update GitHub Pages? (y/n) ');

if (update.toLowerCase() === 'y') {
  console.log('Updating GitHub Pages...');
  updateGitHubPages();
} else {
  console.log('Skipping GitHub Pages update.');
}


