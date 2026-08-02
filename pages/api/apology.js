import { readDb, writeDb } from '@/lib/db';

export default function handler(req, res) {
  const db = readDb();

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, apologyStatus: db.apologyStatus });
  }

  if (req.method === 'POST') {
    const { forgiven } = req.body;

    db.apologyStatus = {
      forgiven: Boolean(forgiven),
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB',
      message: forgiven
        ? "Resmi Dimaafkan 100% oleh Sinta Nuriya! ❤️ Janji Rifki makin sayang!"
        : "Menunggu konfirmasi dari Sinta ❤️"
    };

    writeDb(db);

    return res.status(200).json({ success: true, apologyStatus: db.apologyStatus });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
