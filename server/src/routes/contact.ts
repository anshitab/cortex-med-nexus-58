import { Router, Request, Response } from 'express';
import { Contact } from '../models/Contact';

const router = Router();

// POST /api/contact
router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone, company, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }

  try {
    const contact = await Contact.create({ name, email, phone, company, message });
    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    console.error('Failed to save contact:', err);
    res.status(500).json({ error: 'Failed to save your inquiry. Please try again.' });
  }
});

export default router;
