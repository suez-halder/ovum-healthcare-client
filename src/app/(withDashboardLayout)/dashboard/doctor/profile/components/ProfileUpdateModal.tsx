import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";
import OvumSelectField from "@/components/Forms/OvumSelectField";
import OvumFullScreenModal from "@/components/Shared/OvumModal/OvumFullScreenModal";
import {
    useGetDoctorQuery,
    useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Gender } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MultipleSelectFieldChip from "../../schedules/components/MultipleSelectFieldChip";
import MultipleSelectChip from "./MultipleSelectChip";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

const validationSchema = z.object({
    experience: z.preprocess(
        (x) => (x ? x : undefined),
        z.coerce.number().int().optional()
    ),
    appointmentFee: z.preprocess(
        (x) => (x ? x : undefined),
        z.coerce.number().int().optional()
    ),
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
    const { data: doctorInfo, refetch, isSuccess } = useGetDoctorQuery(id);
    // console.log(doctorInfo);
    const { data: allSpecialties } = useGetAllSpecialtiesQuery({});
    const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
    const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

    useEffect(() => {
        if (!isSuccess) return;
        setSelectedSpecialtiesIds(
            doctorInfo?.doctorSpecialties?.map((sp: any) => sp?.specialtiesId)
        );
    }, [isSuccess]);

    const submitHandler = async (values: FieldValues) => {
        const specialties = selectedSpecialtiesIds.map(
            (specialtiesId: string) => ({
                specialtiesId,
                isDeleted: false,
            })
        );

        const excludedFields: Array<keyof typeof values> = [
            "email",
            "id",
            "role",
            "needPasswordChange",
            "status",
            "createdAt",
            "updatedAt",
            "isDeleted",
            "averageRating",
            "review",
            "profilePhoto",
            "registrationNumber",
            "schedules",
            "doctorSpecialties",
        ];

        const updatedValues = Object.fromEntries(
            Object.entries(values).filter(([key]) => {
                return !excludedFields.includes(key);
            })
        );

        updatedValues.specialties = specialties;
        try {
            const res = await updateDoctor({
                body: updatedValues,
                id,
            }).unwrap();
            if (res?.id) {
                toast.success("Doctor information updated successfully!");
                refetch();
                setOpen(false);
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <OvumFullScreenModal
            open={open}
            setOpen={setOpen}
            title="Update Profile"
        >
            <OvumForm
                onSubmit={submitHandler}
                defaultValues={doctorInfo}
                resolver={zodResolver(validationSchema)}
            >
                <Grid container spacing={2} sx={{ my: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="name"
                            label="Name"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="email"
                            type="email"
                            label="Email"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="contactNumber"
                            label="Contract Number"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="address"
                            label="Address"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="registrationNumber"
                            label="Registration Number"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="experience"
                            type="number"
                            label="Experience"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumSelectField
                            items={Gender}
                            name="gender"
                            label="Gender"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="appointmentFee"
                            type="number"
                            label="AppointmentFee"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="qualification"
                            label="Qualification"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="currentWorkingPlace"
                            label="Current Working Place"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <OvumInput
                            name="designation"
                            label="Designation"
                            sx={{ mb: 2 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <MultipleSelectChip
                            allSpecialties={allSpecialties}
                            selectedIds={selectedSpecialtiesIds}
                            setSelectedIds={setSelectedSpecialtiesIds}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" disabled={updating}>
                    Save
                </Button>
            </OvumForm>
        </OvumFullScreenModal>
    );
};

export default ProfileUpdateModal;
