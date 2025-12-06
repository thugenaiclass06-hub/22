import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const parsed = insertContactMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: '請填寫所有必填欄位' });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
      INSERT INTO contact_messages (id, name, email, subject, message, created_at)
      VALUES (gen_random_uuid(), ${parsed.data.name}, ${parsed.data.email}, ${parsed.data.subject}, ${parsed.data.message}, NOW())
      RETURNING *
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: '發送失敗，請稍後再試' });
  }
}
