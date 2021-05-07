import { createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

interface HomeContextData {
    videoRef: MutableRefObject<HTMLVideoElement>;
    video: string;
}

export const HomeContext = createContext({} as HomeContextData);

interface HomeContextProviderProps {
    children: ReactNode;
}

export const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const [video, setVideo] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(()=>{
        configVideo("./videos/video.mp4");
    }, []);

    const configVideo = (video:string) => {
        setVideo(video);
    }

    return (
        <HomeContext.Provider value={
            {
                videoRef,
                video
            }
        }>
        {
            children
        }
        </HomeContext.Provider>
    );
}