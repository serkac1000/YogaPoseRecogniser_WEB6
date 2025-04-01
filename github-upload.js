
const { execSync } = require('child_process');

async function uploadToGithub() {
  try {
    // Configure git if not already done
    execSync('git config --global user.name "YogaPoseRecognizer"');
    execSync('git config --global user.email "yoga@example.com"');
    
    // Initialize git if needed
    execSync('git init');
    
    // Add remote if not exists
    try {
      execSync('git remote add origin https://github.com/serkac1000/YogaPoseRecogniser_WEB6.git');
    } catch (error) {
      // Remote might already exist
    }
    
    // Add all files
    execSync('git add .');
    
    // Commit changes
    execSync('git commit -m "Update: Yoga Pose Recognition App"');
    
    // Force push to GitHub
    execSync('git push -f origin main');
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
  }
}

uploadToGithub();
