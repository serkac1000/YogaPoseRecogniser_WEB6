
import { execSync } from 'child_process';

async function uploadToGithub() {
  try {
    // Configure git
    execSync('git config --global user.name "YogaPoseRecognizer"', { stdio: 'inherit' });
    execSync('git config --global user.email "yogapose@example.com"', { stdio: 'inherit' });
    
    // Initialize if needed and add files
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Update: Yoga Pose Recognition App"', { stdio: 'inherit' });
    
    // Push to GitHub
    execSync('git remote remove origin 2>/dev/null || true', { stdio: 'inherit' });
    execSync('git remote add origin https://github.com/serkac1000/YogaPoseRecogniser_WEB6.git', { stdio: 'inherit' });
    execSync('git branch -M main', { stdio: 'inherit' });
    execSync('git push -u origin main --force', { stdio: 'inherit' });
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
    process.exit(1);
  }
}

uploadToGithub();
