import { useState } from 'react';

export default function DoctorNoteAssist() {
  const [notes, setNotes] = useState('');
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notes.trim()) return;

    setLoading(true);
    setError('');
    setDraft('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/note-draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      setDraft(data.draft);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Doctor Note Assistant</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste raw visit notes here..."
          className="w-full p-3 border rounded-lg h-40 mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Generating Draft...' : 'Generate Clean Draft'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {draft && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-medium mb-2">AI Draft:</h3>
          <pre className="whitespace-pre-wrap text-sm">{draft}</pre>
        </div>
      )}
    </div>
  );
}