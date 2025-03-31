
const { execSync } = require('child_process');

async function uploadToGithub() {
  try {
    // Initialize git if not already initialized
    execSync('git init');
    
    // Add all files
    execSync('git add .');
    
    // Commit changes
    execSync('git commit -m "Initial commit"');
    
    // Add your GitHub repository URL
    execSync('git remote add origin YOUR_GITHUB_REPO_URL');
    
    // Push to GitHub
    execSync('git push -u origin master');
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
  }
}

uploadToGithub();
