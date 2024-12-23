import React, {memo, useRef, useState} from "react";
import {Altair} from "../altair/Altair";
import ControlTray from "../control-tray/ControlTray";
import './MobilePanel.scss'
import cn from "classnames";

const MobilePanel: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    return (
        <div className="mobile-panel">
            <div className="video-area">
                <Altair/>
                <video
                    className={cn("stream", {
                        hidden: !videoRef.current || !videoStream,
                    })}
                    ref={videoRef}
                    autoPlay
                    playsInline
                />
            </div>
            <ControlTray videoRef={videoRef} supportsVideo={true} onVideoStreamChange={setVideoStream}></ControlTray>
        </div>
    )
}

export default memo(MobilePanel);