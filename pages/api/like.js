import { readDb, writeDb } from '@/lib/db';

export default function handler(req, res) {
  const db = readDb();

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, likes: db.likes || {} });
  }

  if (req.method === 'POST') {
    const { photoId } = req.body;

    if (!photoId) {
      return res.status(400).json({ success: false, error: 'photoId wajib diisi' });
    }

    if (!db.likes[photoId]) {
      db.likes[photoId] = 0;
    }

    db.likes[photoId] += 1;
    writeDb(db);

    return res.status(200).json({
      success: true,
      photoId,
      newLikes: db.likes[photoId],
      likes: db.likes
    });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
