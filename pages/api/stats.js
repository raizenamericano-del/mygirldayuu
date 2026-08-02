import { readDb } from '@/lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const db = readDb();
    
    // Calculate total likes across all photos
    const totalLikes = Object.values(db.likes || {}).reduce((acc, curr) => acc + curr, 0);
    const totalMessages = (db.guestbook || []).length;
    
    // Engagement / Love start date reference (customizable)
    const startDate = new Date('2024-08-02');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 365;

    return res.status(200).json({
      success: true,
      stats: {
        daysTogether,
        hoursTogether: daysTogether * 24,
        totalPhotoLikes: totalLikes,
        totalLoveNotes: totalMessages,
        loveLevel: '1000% Permanen ❤️',
        forgivenStatus: db.apologyStatus.forgiven
      }
    });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
