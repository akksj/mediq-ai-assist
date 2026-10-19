const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Patient describes symptoms in normal language.
// This endpoint turns it into something a doctor can quickly scan.
router.post('/symptom-summary', auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a helpful medical assistant for a small neighborhood clinic.
Summarize the patient's symptoms clearly for the doctor. Do not diagnose or suggest medicines.
Only organize the information.

Patient input: ${message}

Return in this exact format:
- Main complaints:
- Duration (if mentioned):
- Severity (if mentioned):
- Other relevant details:
- Questions the doctor may want to ask:`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service failed. Try again.' });
  }
});

// Doctor pastes rough notes. This cleans them up a bit.
router.post('/note-draft', auth, async (req, res) => {
  try {
    const { notes } = req.body;
    if (!notes) return res.status(400).json({ error: 'Notes are required' });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Convert these doctor notes into a clear, professional, short summary for the patient record.
Keep it concise. Suggest one practical follow-up action if relevant. Do not add medical advice beyond the notes.

Doctor notes: ${notes}

Return format:
Summary:
Follow-up suggestion:`;

    const result = await model.generateContent(prompt);
    const draft = result.response.text();

    res.json({ draft });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service failed. Try again.' });
  }
});

module.exports = router;