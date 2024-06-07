"use client";

import {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
} from "@/redux/api/myProfile";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const DoctorProfilePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <>
            <ProfileUpdateModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                id={data?.id}
            />
            <Container
                sx={{
                    mt: 4,
                }}
            >
                <Grid container spacing={4}>
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
                                height={500}
                                width={500}
                            />
                        </Box>

                        <Box my={1}>
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
                        </Box>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            fullWidth
                            endIcon={<ModeEditIcon />}
                        >
                            Edit Profile
                        </Button>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <DoctorInformation data={data} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default DoctorProfilePage;
