
import { execSync } from 'child_process';

async function uploadToGithub() {
  try {
    // Configure git
    execSync('git config --global user.name "YogaPoseRecognizer"', { stdio: 'inherit' });
    execSync('git config --global user.email "yoga@example.com"', { stdio: 'inherit' });
    
    // Add and commit changes
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Update: Yoga Pose Recognition App"', { stdio: 'inherit' });
    
    // Push to GitHub using token from environment variable
    const repoUrl = process.env.GIT_URL;
    if (!repoUrl) {
      throw new Error('GitHub repository URL not found. Please add GIT_URL to your Secrets.');
    }
    
    execSync('git remote remove origin 2>/dev/null || true', { stdio: 'inherit' });
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
    execSync('git push -f origin main', { stdio: 'inherit' });
    
    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
    process.exit(1);
  }
}

uploadToGithub();
