'use client';

import { useState } from 'react';

export default function InviteForm() {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requireApproval, setRequireApproval] = useState(false);
  const [capacity, setCapacity] = useState('Unlimited');
  const [themeType, setThemeType] = useState<'image' | 'video'>('image');
  const [themeFile, setThemeFile] = useState<File | null>(null);
  const handleSave = () => {
    const data = {
      eventName,
      startTime,
      endTime,
      description,
      capacity,
      requireApproval,
    };
    localStorage.setItem('invite-data', JSON.stringify(data));
    alert('Saved!');
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left - Preview */}
      <div className="bg-black aspect-square relative rounded-xl overflow-hidden">
        {/* Theme background with overlay */}
        <p className="absolute top-6 left-6 text-4xl font-bold leading-tight text-pink-400">
          IT’S<br />GOING<br />TO BE<br />OUT<br />OF THE<br />WORLD
        </p>
      </div>

      {/* Right - Form */}
      <div className="space-y-5">
        <input
          placeholder="Event Name"
          className="w-full px-4 py-3 rounded-md bg-purple-800 text-white"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <div className="flex gap-4">
          <input type="datetime-local" className="flex-1 px-4 py-2 bg-purple-800 rounded-md" />
          <input type="datetime-local" className="flex-1 px-4 py-2 bg-purple-800 rounded-md" />
        </div>
        <input
          placeholder="Add Event Location"
          className="w-full px-4 py-2 bg-purple-800 rounded-md"
        />
        <textarea
          placeholder="Add Description"
          className="w-full px-4 py-2 bg-purple-800 rounded-md"
        />
        <div className="flex justify-between items-center">
          <label>Require Approval</label>
          <input type="checkbox" checked={requireApproval} onChange={() => setRequireApproval(!requireApproval)} />
        </div>
        <div>
          <label>Capacity</label>
          <input type="number" placeholder="Unlimited" className="w-full px-4 py-2 bg-purple-800 rounded-md" />
        </div>
        <div>
          <label>Theme (Image or MP4)</label>
          <input type="file" accept="image/*,video/mp4" onChange={(e) => setThemeFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-black rounded-md">Save Invite</button>
          <button className="px-6 py-2 bg-gray-300 text-black rounded-md">Preview</button>
        </div>
      </div>
    </div>
  );
}
