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
const POSE_THRESHOLD = 0.35;
const DEFAULT_CONFIDENCE = 0.37;

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/export-github', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.json({ success: false, error: 'GitHub token is required' });
  }
  try {
    execSync('git add .');
    execSync('git commit -m "Export: Yoga Pose Recognition App"');
    execSync(`git push https://${token}@github.com/serkac1000/YogaPoseRecogniser_WEB6.git main`);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'poseDetection') {
      const confidences = message.confidences || [0, 0, 0];
      const currentConfidence = confidences[currentPose];

      ws.send(JSON.stringify({
        type: 'updateDisplay',
        confidences: confidences,
        currentPose: currentPose,
        timer: timer
      }));

      if (currentConfidence > POSE_THRESHOLD) {
        if (timer > 0) {
          timer--;
          if (timer === 0) {
            currentPose = (currentPose + 1) % poses.length;
            timer = 3;
            ws.send(JSON.stringify({
              type: 'nextPose',
              pose: poses[currentPose]
            }));
          }
        }
      } else {
        timer = 3;
      }
    }
  });
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});