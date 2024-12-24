import React, {memo, useEffect, useRef, useState} from "react";
import {Altair} from "../altair/Altair";
import ControlTray from "../control-tray/ControlTray";
import './MobilePanel.scss'
import cn from "classnames";

const MobilePanel: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sampleVideoRef = useRef<HTMLVideoElement>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const sampleVideos = useRef([
        {src: "https://rplus-global-aws.rplushealth.com/rplus-migrate/video_original/zh_CN/157197395955637.mp4", name: "High-legged running"},  // 原地高抬腿跑
        {src: "https://rplus-global-aws.rplushealth.com/rplus-migrate/video_original/zh_CN/1200329678909476864.mp4", name: "Bend over and touch your toes"},    // 俯身摸脚尖
        {src: "https://rplus-global-aws.rplushealth.com/rplus-migrate/video_original/zh_CN/160424145273675776.mp4", name: "Standing contralateral elbow and knee touch"}, // 站立位对侧肘膝
    ])

    useEffect(()=> {
       if (sampleVideoRef.current) {
           if (videoStream) {
               sampleVideoRef.current.play();
           } else {
               sampleVideoRef.current.pause();
           }
       }
    });

    return (
        <div className="mobile-panel">
            <Altair/>
            <div className="video-area">
                <video
                    className={cn("stream", {
                        hidden: !videoRef.current || !videoStream,
                    })}
                    ref={videoRef}
                    autoPlay
                    playsInline
                />
            </div>
            <div className="sample-video">
                <video
                    className={cn("stream", {
                        hidden: !videoRef.current || !videoStream,
                    })}
                    autoPlay
                    loop
                    muted
                    width="100%"
                    height="100%"
                    src={sampleVideos.current[0].src}
                    ref={sampleVideoRef}/>
            </div>
            <ControlTray videoRef={videoRef} supportsVideo={true} onVideoStreamChange={setVideoStream}></ControlTray>
        </div>
    )
}

export default memo(MobilePanel);