'use client';

import { Player } from '@remotion/player';
import { MyVideo } from '../../remotion/MyVideo'; // adjust import path
import { useEffect, useState } from 'react';

type VideoProps = {
  imageUrl: string;
  theme: string;
  title: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  capacity?: string | number;
};

export default function PreviewPage() {
  const [videoProps, setVideoProps] = useState<VideoProps | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('invite-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setVideoProps({
        imageUrl: parsed.themeFileBase64 ?? '',
        theme: parsed.themeFileType?.includes('dark') ? 'dark' : 'light',
        title: parsed.eventName ?? '',
        startTime: parsed.startTime,
        endTime: parsed.endTime,
        location: parsed.location,
        description: parsed.description,
        capacity: parsed.capacity,
      });
    }
  }, []);

  if (!videoProps) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Loading preview...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <Player
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        compositionWidth={1080}
        compositionHeight={720}
        controls
        inputProps={videoProps}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
