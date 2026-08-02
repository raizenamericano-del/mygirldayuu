import { readDb, writeDb } from '@/lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const db = readDb();
    return res.status(200).json({ success: true, messages: db.guestbook || [] });
  } 
  
  if (req.method === 'POST') {
    const { author, text, avatar } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'Pesan tidak boleh kosong' });
    }

    const db = readDb();
    const newMsg = {
      id: Date.now().toString(),
      author: author && author.trim() ? author.trim() : 'Sinta Nuriya ❤️',
      avatar: avatar || '💕',
      text: text.trim(),
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB',
      likes: 1
    };

    db.guestbook = [newMsg, ...db.guestbook];
    writeDb(db);

    return res.status(201).json({ success: true, message: newMsg, messages: db.guestbook });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
