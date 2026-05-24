import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

function VirtualTour({ images }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const startTour = () => {
        if (intervalId) clearInterval(intervalId);
        const id = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length);
        }, 3000);
        setIntervalId(id);
        setIsPlaying(true);
    };

    const stopTour = () => {
        if (intervalId) clearInterval(intervalId);
        setIsPlaying(false);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <img src={images[currentImage]} alt="Virtual Tour" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {!isPlaying ? (
                    <button onClick={startTour} className="btn-primary"><FaPlay /> Start Virtual Tour</button>
                ) : (
                    <button onClick={stopTour} className="btn-secondary"><FaPause /> Stop Tour</button>
                )}
            </div>
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '10px' }}>
                {images.map((_, idx) => (
                    <button key={idx} onClick={() => { setCurrentImage(idx); stopTour(); }} style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentImage === idx ? '#667eea' : '#ccc', border: 'none', cursor: 'pointer' }} />
                ))}
            </div>
        </div>
    );
}

export default VirtualTour;
