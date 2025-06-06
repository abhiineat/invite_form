import { Composition } from 'remotion';
import { MyVideo } from './MyVideo';

export const RemotionVideo = () => {
  return (
    <Composition
      id="my-comp"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        imageUrl: '',
        theme: 'light',
        title: 'Your Event Title',
        startTime: '2025-06-10T18:00',
        endTime: '2025-06-10T21:00',
        location: 'Venue Name',
        description: 'Event description goes here.',
        capacity: 'Unlimited',
      }}
    />
  );
};
