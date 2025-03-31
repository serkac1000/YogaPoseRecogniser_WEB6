
const { execSync } = require('child_process');

async function uploadToGithub() {
  try {
    // Initialize git
    execSync('git init');
    
    // Create .gitignore
    execSync('echo "node_modules/\nelectron-dist/\n.DS_Store" > .gitignore');
    
    // Add all files
    execSync('git add .');
    
    // Commit changes
    execSync('git commit -m "Initial commit: Yoga Pose Recognition App"');
    
    // Add GitHub repository URL (replace with your repository URL)
    execSync('git remote add origin https://github.com/serkac1000/YogaPoseRecogniser_WEB6.git');
    
    // Push to GitHub
    execSync('git push -u origin main --force');
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error);
  }
}

uploadToGithub();
