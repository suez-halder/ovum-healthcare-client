import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";

import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import OvumFullScreenModal from "@/components/Shared/OvumModal/OvumFullScreenModal";
import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";
import OvumSelectField from "@/components/Forms/OvumSelectField";
import { Gender } from "@/types";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
    const handleFormSubmit = async (values: FieldValues) => {
        console.log(values);
    };

    const defaultValues = {
        doctor: {
            email: "",
            name: "",
            contactNumber: "",
            address: "",
            registrationNumber: "",
            gender: "",
            experience: 0,
            appointmentFee: 0,
            qualification: "",
            currentWorkingPlace: "",
            designation: "",
            profilePhoto: "",
        },
        password: "",
    };

    return (
        <OvumFullScreenModal
            open={open}
            setOpen={setOpen}
            title="Create New Doctor"
        >
            <OvumForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
                <Grid container spacing={2} sx={{ my: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.name"
                            label="Name"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.email"
                            type="email"
                            label="Email"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="password"
                            type="password"
                            label="Password"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.contactNumber"
                            label="Contract Number"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.address"
                            label="Address"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.registrationNumber"
                            label="Registration Number"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.experience"
                            type="number"
                            label="Experience"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumSelectField
                            items={Gender}
                            name="doctor.gender"
                            label="Gender"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.appointmentFee"
                            type="number"
                            label="AppointmentFee"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.qualification"
                            label="Qualification"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.currentWorkingPlace"
                            label="Current Working Place"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="doctor.designation"
                            label="Designation"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>

                <Button type="submit">Create</Button>
            </OvumForm>
        </OvumFullScreenModal>
    );
};

export default DoctorModal;
