
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
let currentPose = 0;
const poses = ["Pose1", "Pose2", "Pose3"];
let timer = 3;
const POSE_THRESHOLD = 0.46; // Increased threshold for better accuracy

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/export-github', async (req, res) => {
  try {
    execSync('git add .');
    execSync('git commit -m "Export: Yoga Pose Recognition App"');
    execSync('git push origin main');
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'poseDetection') {
      const confidence = message.confidence;
      if (confidence > POSE_THRESHOLD) {
        timer = Math.max(0, timer - 1);
        if (timer === 0) {
          currentPose = (currentPose + 1) % poses.length;
          timer = 3;
          ws.send(JSON.stringify({
            type: 'nextPose',
            pose: poses[currentPose],
            timer: timer
          }));
        } else {
          ws.send(JSON.stringify({
            type: 'timer',
            timeLeft: timer
          }));
        }
      }
    }
  });
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
