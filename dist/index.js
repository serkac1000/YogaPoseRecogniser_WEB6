import express from 'express';
import { createServer } from 'http';
import { WebSocket } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
let currentPose = 0;
const poses = ["Pose1", "Pose2", "Pose3"];
let timer = 3;
const POSE_THRESHOLD = 0.75;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'poseDetection') {
      const confidence = message.confidence;
      if (confidence > POSE_THRESHOLD) {
        timer -= 1;
        if (timer <= 0) {
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
      } else {
        timer = 3;
      }
    }
  });
});

app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});


function log(message, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});