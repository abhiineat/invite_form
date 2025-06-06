import React from 'react';
import {
  AbsoluteFill,
  Img,
  Video,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

type MyVideoProps = {
  imageUrl: string;
  theme: string;
  title: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  capacity?: string | number;
};

export const MyVideo: React.FC<MyVideoProps> = ({
  imageUrl,
  theme,
  title,
  startTime,
  endTime,
  location,
  description,
  capacity,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title scale spring animation (frame 0-30)
  const titleScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: { damping: 200 },
  });

  // Helper to animate sliding in from a direction with fade in
  const slideFadeIn = (startFrame: number, durationFrames: number, fromX = 0, fromY = 0) => {
    if (frame < startFrame) return { opacity: 0, transform: `translateX(${fromX}px) translateY(${fromY}px)` };

    const progress = Math.min((frame - startFrame) / durationFrames, 1);
    const easedProgress = Easing.out(Easing.cubic)(progress);

    const opacity = easedProgress;
    const translateX = fromX * (1 - easedProgress);
    const translateY = fromY * (1 - easedProgress);

    return { opacity, transform: `translateX(${translateX}px) translateY(${translateY}px)` };
  };

  // Define animation start frames for each detail, staggered
  // Each detail animates over 20 frames, starting after the title animation (which ends ~frame 30)
  const detailDuration = 20;
  const startOffset = 30;

  const animations = {
    startTime: slideFadeIn(startOffset, detailDuration, -100, 0), // from left
    endTime: slideFadeIn(startOffset + detailDuration, detailDuration, 100, 0), // from right
    location: slideFadeIn(startOffset + 2 * detailDuration, detailDuration, 0, -50), // from top
    description: slideFadeIn(startOffset + 3 * detailDuration, detailDuration, 0, 50), // from bottom
    capacity: slideFadeIn(startOffset + 4 * detailDuration, detailDuration, -100, 0), // from left again
  };

  const isVideo = imageUrl?.startsWith('data:video') || imageUrl?.includes('.mp4');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      }}
    >
      {/* Background */}
      {imageUrl ? (
        isVideo ? (
          <Video
            src={imageUrl}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            muted
            loop
          />
        ) : (
          <Img
            src={imageUrl}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )
      ) : (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
          }}
        />
      )}

      {/* Overlay content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            marginBottom: 20,
            textShadow: '2px 2px 10px rgba(0,0,0,0.7)',
            transform: `scale(${titleScale})`,
            opacity: frame < 10 ? 0 : 1, // fade in smoothly with scale
            transition: 'opacity 0.3s ease',
          }}
        >
          {title}
        </h1>

        {/* Animated Details */}
        {startTime && (
          <p style={{ fontSize: 24, margin: 5, ...animations.startTime }}>Start: {startTime}</p>
        )}
        {endTime && (
          <p style={{ fontSize: 24, margin: 5, ...animations.endTime }}>End: {endTime}</p>
        )}
        {location && (
          <p style={{ fontSize: 24, margin: 5, ...animations.location }}>Location: {location}</p>
        )}
        {description && (
          <p style={{ fontSize: 20, margin: 10, maxWidth: 700, ...animations.description }}>
            {description}
          </p>
        )}
        {capacity && (
          <p style={{ fontSize: 24, margin: 5, ...animations.capacity }}>Capacity: {capacity}</p>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
