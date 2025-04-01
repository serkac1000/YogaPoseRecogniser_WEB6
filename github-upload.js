
import { execSync } from 'child_process';

async function uploadToGithub() {
  try {
    // Configure git
    execSync('git config --global user.name "YogaPoseRecognizer"', { stdio: 'inherit' });
    execSync('git config --global user.email "yoga@example.com"', { stdio: 'inherit' });
    
    // Initialize git if needed
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit: Yoga Pose Recognition App"', { stdio: 'inherit' });
    
    // Push to GitHub
    const repoUrl = process.env.GIT_URL;
    if (!repoUrl) {
      throw new Error('Please add your GitHub repository URL with token to Secrets as GIT_URL');
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
