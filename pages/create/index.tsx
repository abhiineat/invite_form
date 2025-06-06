// app/create/page.tsx
import InviteForm from './InviteForm';
import { useThemeStore } from '@/store/useThemeStore';

export default function CreatePage() {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <div className="flex min-h-screen  text-white">
      <button
      onClick={toggleDarkMode}
      className={`fixed top-4 right-4 w-14 h-8 rounded-full transition-colors duration-300
        ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
      <InviteForm />
    </div>
  );
}
