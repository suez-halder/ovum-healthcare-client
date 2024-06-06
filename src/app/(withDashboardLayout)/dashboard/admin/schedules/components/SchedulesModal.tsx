import OvumDatePicker from "@/components/Forms/OvumDatePicker";
import OvumForm from "@/components/Forms/OvumForm";
import OvumModal from "@/components/Shared/OvumModal/OvumModal";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulesModal = ({ open, setOpen }: TProps) => {
    const handleFormSubmit = async (values: FieldValues) => {
        try {
            console.log(values);
        } catch (err: any) {
            console.error(err.message);
        }
    };
    return (
        <OvumModal open={open} setOpen={setOpen} title="Create Schedule">
            <OvumForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <OvumDatePicker name="startDate" />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">
                    Create
                </Button>
            </OvumForm>
        </OvumModal>
    );
};

export default SchedulesModal;
