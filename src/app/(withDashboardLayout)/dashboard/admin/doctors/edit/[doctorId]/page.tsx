"use client";

import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";
import OvumSelectField from "@/components/Forms/OvumSelectField";
import {
    useGetDoctorQuery,
    useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
    params: {
        doctorId: string;
    };
};

const DoctorUpdatePage = ({ params }: TParams) => {
    // console.log(params.doctorId);
    const id = params?.doctorId;
    const { data, isLoading } = useGetDoctorQuery(id);
    const [updateDoctor] = useUpdateDoctorMutation();
    const router = useRouter();

    const handleFormSubmit = async (values: FieldValues) => {
        values.experience = Number(values.experience);
        values.appointmentFee = Number(values.appointmentFee);
        values.id = id;

        // console.log({ id: values.id, body: values });

        try {
            const res = await updateDoctor({
                id: values.id,
                body: values,
            }).unwrap();

            if (res?.id) {
                toast.success("Doctor info updated successfully!");
                router.push("/dashboard/admin/doctors");
            }
        } catch (err: any) {
            console.error(err);
        }
    };

    const defaultValues = {
        email: data?.email || "",
        name: data?.name || "",
        contactNumber: data?.contactNumber || "",
        address: data?.address || "",
        registrationNumber: data?.registrationNumber || "",
        gender: data?.gender || "",
        experience: data?.experience || 0,
        appointmentFee: data?.appointmentFee || 0,
        qualification: data?.qualification || "",
        currentWorkingPlace: data?.currentWorkingPlace || "",
        designation: data?.designation || "",
    };

    return (
        <Box>
            <Typography component="h5" variant="h5">
                Update Doctor Info
            </Typography>
            {isLoading ? (
                "Loading..."
            ) : (
                <OvumForm
                    onSubmit={handleFormSubmit}
                    defaultValues={data && defaultValues}
                >
                    <Grid container spacing={2} sx={{ my: 5 }}>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="name"
                                label="Name"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="email"
                                type="email"
                                label="Email"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="contactNumber"
                                label="Contract Number"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="address"
                                label="Address"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="registrationNumber"
                                label="Registration Number"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="experience"
                                type="number"
                                label="Experience"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumSelectField
                                items={Gender}
                                name="gender"
                                label="Gender"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="appointmentFee"
                                type="number"
                                label="AppointmentFee"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="qualification"
                                label="Qualification"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="currentWorkingPlace"
                                label="Current Working Place"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <OvumInput
                                name="designation"
                                label="Designation"
                                fullWidth={true}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit">Update</Button>
                </OvumForm>
            )}
        </Box>
    );
};

export default DoctorUpdatePage;
