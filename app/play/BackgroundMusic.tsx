// play/BackgroundMusic.tsx
import { useEffect, useRef } from 'react';

const BackgroundMusic: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Error playing the audio:', error);
            });
        }
    }, []);

    return (
        <audio ref={audioRef} loop>
            <source src="/[Detective Conan OST] Main Theme (Extended).mp3" type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default BackgroundMusic;
