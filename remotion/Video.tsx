import { Composition } from 'remotion';
import { registerRoot } from 'remotion';
import React from 'react';

const MyVideo: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: 'white',
        fontSize: 40,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      Hello from Remotion!
    </div>
  );
};

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

// ✅ This is required
registerRoot(RemotionRoot);
