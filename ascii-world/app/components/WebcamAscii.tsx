import { useEffect, useRef, useState } from 'react';
import { convertToAscii } from '@/utils/asciiConverter';

const WebcamAscii = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [asciiArt, setAsciiArt] = useState<string>('');

  useEffect(() => {
    const startWebcam = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } catch (error) {
          console.error('Error accessing webcam:', error);
        }
      }
    };

    startWebcam();
  }, []);

  useEffect(() => {
    const convertFrameToAscii = () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const ascii = convertToAscii(imageData);
          setAsciiArt(ascii);
        }
      }
    };

    const interval = setInterval(() => {
      convertFrameToAscii();
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} className="hidden"></video>
      <canvas ref={canvasRef} width={220} height={44} className="hidden"></canvas>
      <pre className="bg-black text-xs whitespace-pre-wrap">{asciiArt}</pre>
    </div>
  );
};

export default WebcamAscii;
