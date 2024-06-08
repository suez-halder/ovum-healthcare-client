import VideoCall from "@/components/UI/VideoCall/VideoCall";
import React from "react";

const VideoCallingPage = ({
    searchParams,
}: {
    searchParams: {
        videoCallingId: string;
    };
}) => {
    const videoCallingId = searchParams?.videoCallingId;

    return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCallingPage;
