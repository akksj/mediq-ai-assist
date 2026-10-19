import SymptomChat from './components/SymptomChat';
import DoctorNoteAssist from './components/DoctorNoteAssist';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">MediQ AI Assist</h1>
        <p className="text-gray-600">Patient Symptom Summary + Doctor Note Draft</p>
      </div>
      <SymptomChat />
      <DoctorNoteAssist />
    </div>
  );
}

export default App;