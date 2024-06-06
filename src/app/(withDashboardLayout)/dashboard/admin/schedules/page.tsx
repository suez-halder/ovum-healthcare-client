"use client";

import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import SchedulesModal from "./components/SchedulesModal";

const SchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>
                Create Schedule
            </Button>
            <SchedulesModal open={isModalOpen} setOpen={setIsModalOpen} />
            <Box my={5}>Display Schedule</Box>
        </Box>
    );
};

export default SchedulesPage;
