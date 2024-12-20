"use client"

import {useRive} from '@rive-app/react-canvas';
import { useState } from 'react';


export default () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationText, setAnimationText] = useState('');
  const { rive, RiveComponent: RiveComponentPlayback } = useRive({
    src: 'truck.riv',
    stateMachines: 'drive',
    artboard: 'Truck',
    autoplay: true,
    onPause: () => {
      setAnimationText('Animation paused!');
    },
    onPlay: () => {
      setAnimationText('Animation is playing..');
    },
  });

  const togglePlaying = () => {
    if (isPlaying) {
      rive.pause();
      setIsPlaying(false);
    } else {
      rive.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="center">
        <RiveComponentPlayback className="base-canvas-size" />
        <p>{animationText}</p>
        <button onClick={togglePlaying}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </>
  );
};
