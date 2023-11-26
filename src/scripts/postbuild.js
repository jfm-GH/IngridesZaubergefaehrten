// scripts/postbuild.js
const { exec } = require('child_process');

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

// Call the function to run the deploy script
runDeploy();
