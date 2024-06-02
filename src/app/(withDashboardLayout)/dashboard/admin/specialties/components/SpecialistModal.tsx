import OvumFileUploader from "@/components/Forms/OvumFileUploader";
import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";
import OvumModal from "@/components/Shared/OvumModal/OvumModal";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({ open, setOpen }: TProps) => {
    const handleFormSubmit = (values: FieldValues) => {};
    return (
        <OvumModal open={open} setOpen={setOpen} title="Create A New Specialty">
            <OvumForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <OvumInput name="title" label="Title" />
                    </Grid>
                    <Grid item md={6}>
                        <OvumFileUploader />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">
                    Create
                </Button>
            </OvumForm>
        </OvumModal>
    );
};

export default SpecialistModal;
