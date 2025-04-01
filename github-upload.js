
const { execSync } = require('child_process');

async function uploadToGithub() {
  try {
    // Configure git
    execSync('git config --global user.name "YogaPoseRecognizer"');
    execSync('git config --global user.email "yoga@example.com"');
    
    // Initialize git if needed
    execSync('git init');
    
    // Add and commit files
    execSync('git add .');
    execSync('git commit -m "Initial commit: Yoga Pose Recognition App"');
    
    // Push to new repository using token
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GitHub token not found in environment variables');
    }
    
    execSync('git remote remove origin');  // Remove if exists
    execSync(`git remote add origin https://${token}@github.com/YogaPoseRecognizer/Yoga9.git`);
    execSync('git push -f origin main');
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
    throw error;
  }
}

uploadToGithub();
