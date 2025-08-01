import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

function App() {
  const [form, setForm] = useState({ name: '', platform: '', resource_type: '', difficulty: 3, hours: 0, notes: '' });
  const [skills, setSkills] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const recommendResources = (skills) => {
    const recommendations = [];
    skills.forEach(skill => {
      if (skill.name.toLowerCase().includes('react')) {
        recommendations.push('Learn Redux from Udemy');
      }
    });
    return recommendations;
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await axios.get(`${API}/skills`);
      setSkills(res.data);
      setRecommendations(recommendResources(res.data));
    };

    const fetchDashboard = async () => {
      const res = await axios.get(`${API}/dashboard`);
      setDashboard(res.data);
    };

    fetchSkills();
    fetchDashboard();
  }, []);

  const handleSubmit = async () => {
    await axios.post(`${API}/skills`, form);
    setForm({ name: '', platform: '', resource_type: '', difficulty: 3, hours: 0, notes: '' });
    const res = await axios.get(`${API}/skills`);
    setSkills(res.data);
    setRecommendations(recommendResources(res.data));
    const dash = await axios.get(`${API}/dashboard`);
    setDashboard(dash.data);
  };

  const handleUpdate = async (id, status, hours, notes) => {
    await axios.patch(`${API}/skills/${id}`, { status, hours, notes });
    const res = await axios.get(`${API}/skills`);
    setSkills(res.data);
    setRecommendations(recommendResources(res.data));
    const dash = await axios.get(`${API}/dashboard`);
    setDashboard(dash.data);
  };

  return (
      <div className="p-5 max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow mb-6 text-center">
        <h1 className="text-4xl font-bold text-pink-600">SkillStack Tracker</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 bg-white p-4 rounded shadow-lg text-gray-800 border">
        <input type="text" placeholder="Skill Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-2 border rounded w-full focus:outline-blue-300" />
        <input type="text" placeholder="Platform (Udemy, YT)" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="p-2 border rounded w-full focus:outline-blue-300" />
        <input type="text" placeholder="Type (Course, Video...)" value={form.resource_type} onChange={e => setForm({ ...form, resource_type: e.target.value })} className="p-2 border rounded w-full focus:outline-blue-300" />
        <input type="number" placeholder="Difficulty (1-5)" value={form.difficulty} onChange={e => setForm({ ...form, difficulty: parseInt(e.target.value) })} className="p-2 border rounded w-full focus:outline-blue-300" />
        <input type="number" placeholder="Hours Spent" value={form.hours} onChange={e => setForm({ ...form, hours: parseFloat(e.target.value) })} className="p-2 border rounded w-full focus:outline-blue-300" />
        <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="p-2 border rounded col-span-2 w-full focus:outline-blue-300" />
        <button onClick={handleSubmit} className="bg-blue text-black py-2 rounded hover:bg-blue-700 shadow-md transition col-span-2">➕ Add Skill</button>
      </div>

      {recommendations.length > 0 && (
        <div className="bg-yellow-100 p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold text-yellow-800">🔍 Recommended Resources</h2>
          <ul className="list-disc list-inside">
            {recommendations.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}

      <div className="bg-white p-5 rounded shadow-lg mb-6 text-gray-900 border">
        <h2 className="text-xl font-semibold text-indigo-900"> Dashboard Summary</h2>
        <p> Started: {dashboard['started']}</p>
        <p> In Progress: {dashboard['in-progress']}</p>
        <p> Completed: {dashboard['completed']}</p>
        <p> Total Hours: {dashboard['total_hours']}</p>
      </div>

      <div className="grid gap-2">
        {skills.map(skill => (
          <div key={skill.id} className="border p-4 rounded-lg shadow bg-white text-gray-800">
            <h2 className="text-xl font-semibold">{skill.name} ({skill.status})</h2>
            <p><b>Platform:</b> {skill.platform} | <b>Type:</b> {skill.resource_type}</p>
            <p><b>Category:</b> {skill.category} | <b>Difficulty:</b> {skill.difficulty}</p>
            <p>
              <b>Hours:</b>
              <input
                type="number"
                value={skill.hours}
                onChange={(e) => {
                  const updatedSkills = skills.map(s => s.id === skill.id ? { ...s, hours: parseFloat(e.target.value) } : s);
                  setSkills(updatedSkills);
                }}
                className="border p-1 rounded w-24 ml-2"
              />
            </p>
            <p>
              <b>Notes:</b>
              <textarea
                value={skill.notes}
                onChange={(e) => {
                  const updatedSkills = skills.map(s => s.id === skill.id ? { ...s, notes: e.target.value } : s);
                  setSkills(updatedSkills);
                }}
                className="border p-1 rounded w-full"
              />
            </p>
            <select value={skill.status} onChange={(e) => handleUpdate(skill.id, e.target.value, skill.hours, skill.notes)} className="mt-2 border p-1 rounded">
              <option value="started">Started</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              className="bg-blue-600 text-black px-3 py-2 mt-2 rounded hover:blue shadow-md transition"
              onClick={() => handleUpdate(skill.id, skill.status, skill.hours, skill.notes)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
