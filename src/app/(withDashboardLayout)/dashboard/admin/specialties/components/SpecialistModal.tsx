import OvumModal from "@/components/Shared/OvumModal/OvumModal";
import { TextField } from "@mui/material";
import React from "react";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({ open, setOpen }: TProps) => {
    return (
        <OvumModal open={open} setOpen={setOpen} title="Create Specialty">
            <TextField />
        </OvumModal>
    );
};

export default SpecialistModal;
