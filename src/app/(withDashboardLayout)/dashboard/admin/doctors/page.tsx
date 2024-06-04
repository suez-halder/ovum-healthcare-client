"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Button onClick={() => setIsModalOpen(true)}>
                    Create New Doctor
                </Button>
                <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField size="small" placeholder="Search Doctors" />
            </Stack>
        </Box>
    );
};

export default DoctorsPage;
