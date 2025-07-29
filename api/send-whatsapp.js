
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, status, comment } = req.body;

  if (!phone || !status) {
    return res.status(400).json({ error: 'Missing phone or status' });
  }

  const chatId = phone.replace(/[^0-9]/g, '') + '@c.us';
  const apiUrl = 'https://7105.api.greenapi.com/instance7105291104/sendMessage/?token=0eefe9f5e5054317a8a260ed095667e27f818d3f58ba4a86a6';

  const payload = {
    chatId,
    message: `📦 CMA SEA LAND\nتم تحديث حالة تسجيلك إلى: ${status}\nملاحظات: ${comment || 'لا يوجد'}`
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message', details: error.toString() });
  }
}
