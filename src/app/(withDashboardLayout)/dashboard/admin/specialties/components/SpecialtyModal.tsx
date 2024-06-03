import OvumFileUploader from "@/components/Forms/OvumFileUploader";
import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";
import OvumModal from "@/components/Shared/OvumModal/OvumModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
    const [createSpecialty] = useCreateSpecialtyMutation();

    const handleFormSubmit = async (values: FieldValues) => {
        const data = modifyPayload(values);

        try {
            const res = await createSpecialty(data).unwrap();
            if (res?.id) {
                toast.success("Specialty created successfully!");
                setOpen(false);
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };
    return (
        <OvumModal open={open} setOpen={setOpen} title="Create A New Specialty">
            <OvumForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <OvumInput name="title" label="Title" />
                    </Grid>
                    <Grid item md={6}>
                        <OvumFileUploader name="file" />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">
                    Create
                </Button>
            </OvumForm>
        </OvumModal>
    );
};

export default SpecialtyModal;
