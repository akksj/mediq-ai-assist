import { useState } from 'react';

export default function SymptomChat() {
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError('');
    setSummary('');

    try {
      const token = localStorage.getItem('token'); // Adjust to your auth storage
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/symptom-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Describe Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example: Fever since 2 days, headache, mild cough..."
          className="w-full p-3 border rounded-lg h-32 mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating Summary...' : 'Get AI Summary'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-medium mb-2">Summary for Doctor:</h3>
          <pre className="whitespace-pre-wrap text-sm">{summary}</pre>
        </div>
      )}
    </div>
  );
}