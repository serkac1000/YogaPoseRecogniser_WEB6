const { execSync } = require('child_process');

async function uploadToGithub() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GitHub token not found. Please add GITHUB_TOKEN to your Secrets.');
    }

    // Add and commit files
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Export: Yoga Pose Recognition App"', { stdio: 'inherit' });

    // Add remote and push
    execSync('git remote remove origin 2>/dev/null || true', { stdio: 'inherit' });
    execSync(`git remote add origin https://${token}@github.com/YogaPoseRecognizer/YogaPoseRecognition.git`, { stdio: 'inherit' });
    execSync('git push -f origin main', { stdio: 'inherit' });

    console.log('Successfully uploaded to GitHub!');
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
    process.exit(1);
  }
}

uploadToGithub();