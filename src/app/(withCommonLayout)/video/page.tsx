import React from "react";

const VideoCallingPage = ({
    searchParams,
}: {
    searchParams: {
        videoCallingId: string;
    };
}) => {
    const videoCallingId = searchParams?.videoCallingId;
    return <div>VideoCallingPage</div>;
};

export default VideoCallingPage;
