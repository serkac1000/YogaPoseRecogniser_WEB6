
const { execSync } = require('child_process');

async function uploadToGithub() {
  try {
    // Initialize git if not already initialized
    execSync('git init');
    
    // Configure git (replace with your info)
    execSync('git config user.name "Your Name"');
    execSync('git config user.email "your.email@example.com"');
    
    // Add all files
    execSync('git add .');
    
    // Commit changes
    execSync('git commit -m "Initial commit: Yoga Pose Recognizer"');
    
    // Add your GitHub repository URL (replace with your repo URL)
    execSync('git remote add origin YOUR_GITHUB_REPO_URL');
    
    // Push to GitHub
    execSync('git push -u origin main');
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
  }
}

uploadToGithub();
