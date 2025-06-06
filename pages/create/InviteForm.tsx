'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function InviteForm() {
  const router = useRouter();

  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requireApproval, setRequireApproval] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [themeFileBase64, setThemeFileBase64] = useState<string | null>(null);
  const [themeFileType, setThemeFileType] = useState<string | null>(null);

  const handleThemeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThemeFileType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      setThemeFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const saveToLocalStorage = () => {
    const data = {
      eventName,
      startTime,
      endTime,
      location,
      description,
      capacity: capacity === '' ? 'Unlimited' : capacity,
      requireApproval,
      themeFileBase64,
      themeFileType,
    };

    localStorage.setItem('invite-data', JSON.stringify(data));
  };

  const handleSave = () => {
    saveToLocalStorage();
    alert('Invite data saved to localStorage!');
  };

  const handlePreview = () => {
    saveToLocalStorage();
    router.push('/view'); // Go to preview
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left - Visual Placeholder */}
      <div className="bg-black aspect-square relative rounded-xl overflow-hidden">
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
          <input
            type="datetime-local"
            className="flex-1 px-4 py-2 bg-purple-800 rounded-md text-white"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="datetime-local"
            className="flex-1 px-4 py-2 bg-purple-800 rounded-md text-white"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <input
          placeholder="Add Event Location"
          className="w-full px-4 py-2 bg-purple-800 rounded-md text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Add Description"
          className="w-full px-4 py-2 bg-purple-800 rounded-md text-white"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-between items-center">
          <label className="text-white">Require Approval</label>
          <input
            type="checkbox"
            checked={requireApproval}
            onChange={() => setRequireApproval(!requireApproval)}
          />
        </div>

        <div>
          <label className="text-white">Capacity</label>
          <input
            type="number"
            placeholder="Unlimited"
            className="w-full px-4 py-2 bg-purple-800 rounded-md text-white"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white">Theme (Image or MP4)</label>
          <input
            type="file"
            accept="image/*,video/mp4"
            onChange={handleThemeFileChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-white text-black rounded-md"
            onClick={handleSave}
          >
            Save Invite
          </button>
          <button
            className="px-6 py-2 bg-gray-300 text-black rounded-md"
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
