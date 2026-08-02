import fs from 'fs';
import path from 'path';

// Local DB path vs Vercel Serverless /tmp path fallback
const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const TMP_DB_PATH = path.join('/tmp', 'db.json');

function getDbPath() {
  // If running in production/serverless and /tmp is available
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    if (!fs.existsSync(TMP_DB_PATH) && fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const data = fs.readFileSync(LOCAL_DB_PATH, 'utf8');
        fs.writeFileSync(TMP_DB_PATH, data, 'utf8');
      } catch (err) {
        console.error('Error seeding /tmp/db.json:', err);
      }
    }
    if (fs.existsSync(TMP_DB_PATH)) {
      return TMP_DB_PATH;
    }
  }
  return LOCAL_DB_PATH;
}

export function readDb() {
  try {
    const dbPath = getDbPath();
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading database:', error);
    // Return default initial data if read fails
    return {
      likes: {
        "IMG-20260709-WA0014.jpg": 142,
        "IMG-20260702-WA0016.jpg": 198,
        "IMG-20260630-WA0013.jpg": 165,
        "IMG-20260503-WA0106.jpg": 210,
        "IMG-20260715-WA0065.jpg": 330,
        "IMG-20260613-WA0014.jpg": 188,
        "IMG-20260311-WA0001.jpg": 174,
        "IMG-20260617-WA0031.jpg": 155
      },
      apologyStatus: {
        forgiven: false,
        timestamp: null,
        message: "Menunggu konfirmasi dari Sinta ❤️"
      },
      guestbook: []
    };
  }
}

export function writeDb(data) {
  try {
    const dbPath = getDbPath();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}
