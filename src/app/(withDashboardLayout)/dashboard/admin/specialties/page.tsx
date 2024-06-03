"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SpecialtyModal from "./components/SpecialtyModal";

const SpecialtiesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Button onClick={() => setIsModalOpen(true)}>
                    Create Specialty
                </Button>
                <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField size="small" placeholder="Search Specialist" />
            </Stack>
        </Box>
    );
};

export default SpecialtiesPage;
