"use client";

import {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
} from "@/redux/api/myProfile";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DoctorProfilePage = () => {
    const { data, isLoading } = useGetMyProfileQuery({});
    // console.log(data);

    const [updateMyProfile, { isLoading: uploading }] =
        useUpdateMyProfileMutation({});

    const fileUploadHandler = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({}));
        updateMyProfile(formData);
    };

    if (isLoading) {
        <Typography>Loading....</Typography>;
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <Box
                        sx={{
                            height: 300,
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: 1,
                        }}
                    >
                        <Image
                            src={data?.profilePhoto}
                            alt="user photo"
                            height={300}
                            width={300}
                        />
                    </Box>

                    {uploading ? (
                        <Typography>Uploading...</Typography>
                    ) : (
                        <AutoFileUploader
                            name="file"
                            label="Choose Your Profile Photo"
                            icon={<CloudUploadIcon />}
                            onFileUpload={fileUploadHandler}
                            variant="text"
                        />
                    )}
                </Grid>
                <Grid xs={12} md={8}>
                    <DoctorInformation data={data} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default DoctorProfilePage;
