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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left - Visual Placeholder */}
      <div className="relative w-full h-[25rem] bg-gray-200 rounded-lg overflow-hidden">
  {imageUrl ? (
    <img
      src={imageUrl}
      alt="Custom"
      className="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    <img
    src="/def.png"
    alt="Location Icon"
    className="absolute inset-0 w-full h-full object-cover"
  />
  )}

<label className="absolute bottom-4 right-4 z-20 bg-white text-white p-3 rounded-full hover:bg-white transition cursor-pointer flex items-center justify-center w-12 h-12">
  <img
    src="/image.svg"
    alt="Upload"
    className="inline-block"
  />
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
</label>

</div>


      {/* Right - Form */}
      <div className="space-y-5">
      <div className="flex justify-between mb-5">
  <button className="flex items-center gap-2 px-4 py-1.5 bg-[#502d50] text-white rounded-full text-sm font-medium hover:bg-pink-300 transition">
    <span className="w-3 h-3 bg-pink-400 rounded-full"></span>
    Personal Calendar
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <button className="flex items-center gap-2 px-4 py-1.5 bg-[#502d50] text-white rounded-full text-sm font-medium hover:bg-purple-900 transition">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z" />
    </svg>
    Public
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
</div>

<input
  placeholder="Event Name"
  className="w-full bg-transparent border-none outline-none text-white placeholder-[#502d50]  text-5xl font-semibold"
  value={eventName}
  onChange={(e) => setEventName(e.target.value)}
/>





<div className="flex items-start gap-4 p-4 bg-[#3a1d3a] rounded-xl">
  {/* Start & End Labels with Dotted Line */}
  <div className="flex flex-col items-center gap-2 pt-2 relative">
    {/* Start Circle */}
    <div className="flex items-center gap-2 text-white text-sm font-medium opacity-70">
      <span className="w-2 h-2 rounded-full bg-white opacity-40"></span> Start
    </div>

    {/* Dotted Line */}
    <div className="w-px h-5 border-l border-dotted border-white opacity-30"></div>

    {/* End Circle */}
    <div className="flex items-center gap-2 text-white text-sm font-medium opacity-70">
      <span className="w-2 h-2 rounded-full bg-white opacity-20"></span> End
    </div>
  </div>

  {/* Date & Time Inputs */}
  <div className="flex flex-col gap-4">
    <div className="flex gap-2">
      <input
        type="date"
        className="px-3 py-2 bg-[#502d50] rounded-md text-white text-sm font-medium focus:outline-none"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        className="px-3 py-2 bg-[#502d50] rounded-md text-white text-sm font-medium focus:outline-none"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
    </div>
    <div className="flex gap-2">
      <input
        type="date"
        className="px-3 py-2 bg-[#502d50] rounded-md text-white text-sm font-medium focus:outline-none"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type="time"
        className="px-3 py-2 bg-[#502d50] rounded-md text-white text-sm font-medium focus:outline-none"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
  </div>

  {/* Timezone Display */}
  <div className="flex flex-col items-start px-4 py-2 bg-[#502d50] rounded-md text-white text-sm font-medium whitespace-nowrap">
    <div className="flex items-center gap-1 opacity-80">
      🌐 GMT+05:30
    </div>
    <div className="text-xs opacity-70">Calcutta</div>
  </div>
</div>


<div className="w-full flex items-center px-4 py-2 bg-[#502d50] rounded-md">
  <img
    src="/gps.png"
    alt="Location Icon"
    className="w-5 h-5 mr-3"
  />
  <input
    placeholder="Add Event Location"
    className="flex-1 bg-transparent outline-none border-none text-white placeholder-white placeholder-opacity-70 text-base font-medium"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  />
</div>


        <textarea
          placeholder="Add Description"
          className="w-full px-4 py-2 bg-[#502d50] rounded-md text-white font-medium placeholder-white placeholder-opacity-70"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

<div className="bg-[#3a1d3a] p-4 rounded-xl space-y-4">
  <h3 className="text-white font-semibold text-sm">Event Options</h3>

  {/* Tickets Row */}
  <div className="flex items-center justify-between text-white/80 text-sm">
    <div className="flex items-center gap-2">
      <img src="/ticket-icon.svg" alt="Tickets" className="w-4 h-4 opacity-70" />
      <span>Tickets</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="opacity-60">Free</span>
      <img src="/edit-icon.svg" alt="Edit" className="w-3 h-3 opacity-50" />
    </div>
  </div>

  {/* Require Approval Row */}
  <div className="flex items-center justify-between text-white/80 text-sm">
    <div className="flex items-center gap-2">
      <img src="/user-check-icon.svg" alt="Approval" className="w-4 h-4 opacity-70" />
      <span>Require Approval</span>
    </div>
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={requireApproval}
        onChange={() => setRequireApproval(!requireApproval)}
      />
      <div className="w-9 h-5 bg-gray-600 peer-checked:bg-purple-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-purple-300 transition-all relative">
        <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 peer-checked:translate-x-4 transition-transform"></div>
      </div>
    </label>
  </div>

  {/* Capacity Row */}
  <div className="flex items-center justify-between text-white/80 text-sm">
    <div className="flex items-center gap-2">
      <img src="/capacity-icon.svg" alt="Capacity" className="w-4 h-4 opacity-70" />
      <span>Capacity</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="opacity-60">{capacity || 'Unlimited'}</span>
      <img src="/edit-icon.svg" alt="Edit" className="w-3 h-3 opacity-50" />
    </div>
  </div>

  {/* Theme Upload */}
  <div className="text-white/80 text-sm">
    <label className="block mb-1">Theme (Image or MP4)</label>
    <input
      type="file"
      accept="image/*,video/mp4"
      onChange={handleThemeFileChange}
      className="text-xs file:bg-purple-600 file:text-white file:px-3 file:py-1 file:rounded file:border-0"
    />
  </div>
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
