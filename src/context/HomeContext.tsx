import { createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

interface HomeContextData {
    videoRef: MutableRefObject<HTMLVideoElement>;
    video: string;
    isPlaying: boolean;
    isMute: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    toonglePlayPause: ()=>void;
    configMute: ()=> void;
    configVolume: (volume: number)=> void;
    configCurrentTime: (time: number) => void;
}

export const HomeContext = createContext({} as HomeContextData);

interface HomeContextProviderProps {
    children: ReactNode;
}

export const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [video, setVideo] = useState<string>("");
    const [volume, setVolume] = useState<number>(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(1);
    const [lastVolume, setLastVolume] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);

    useEffect(()=>{
        configVideo("./videos/video.mp4");
    }, []);

    const configVideo = (videoUrl:string) => {
        setVideo(videoUrl);

        const video = videoRef.current;
        
        video.onloadedmetadata = () => {
            setTotalTime(video.duration);
        }
    }

    const toonglePlayPause = () => {
        const updatedIsPlaying = !isPlaying;
        if (isPlaying) {
            pause();
        }
        else {
            play();
        }
        setIsPlaying(updatedIsPlaying);
    }

    const configMute = () => {
        const updatedMute = !isMute;
        const video = videoRef.current;
        video.muted = updatedMute;
        setIsMute(updatedMute);
        if (updatedMute) {
            setLastVolume(volume);
            video.volume = 0;
            setVolume(0);
        }
        else {
            video.volume = lastVolume;
            setVolume(lastVolume);
        }
    }

    const configCurrentTime = (time: number) => {
        const video = videoRef.current;
        video.currentTime = time;
        setCurrentTime(time);
    }

    const configVolume = (value: number) => {
        const video = videoRef.current;
        video.volume = value;
        setLastVolume(volume);
        setVolume(value);
        if (value === 0) {
            video.muted = true;
            setIsMute(true);

        }
        else {
            video.muted = false;
            setIsMute(false);
        }
    }

    const play = ()=> {
        const video = videoRef.current;
        video.play();
    }

    const pause = () => {
        const video = videoRef.current;
        video.pause();
    }

    return (
        <HomeContext.Provider value={
            {
                videoRef,
                video,
                isPlaying,
                isMute,
                volume,
                currentTime,
                totalTime,
                toonglePlayPause,
                configMute,
                configVolume,
                configCurrentTime
            }
        }>
        {
            children
        }
        </HomeContext.Provider>
    );
}