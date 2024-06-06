import OvumDatePicker from "@/components/Forms/OvumDatePicker";
import OvumForm from "@/components/Forms/OvumForm";
import OvumTimePicker from "@/components/Forms/OvumTimePicker";
import OvumModal from "@/components/Shared/OvumModal/OvumModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulesModal = ({ open, setOpen }: TProps) => {
    const [createSchedule] = useCreateScheduleMutation();

    const handleFormSubmit = async (values: FieldValues) => {
        values.startDate = dateFormatter(values.startDate);
        values.endDate = dateFormatter(values.endDate);
        values.startTime = timeFormatter(values.startTime);
        values.endTime = timeFormatter(values.endTime);

        try {
            const res = await createSchedule(values).unwrap();
            if (res?.length) {
                toast.success("Schedule created successfully!");
                setOpen(false);
            }
            console.log(res);
        } catch (err: any) {
            console.error(err.message);
        }
    };
    return (
        <OvumModal open={open} setOpen={setOpen} title="Create Schedule">
            <OvumForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2} sx={{ width: "400px" }}>
                    <Grid item md={12}>
                        <OvumDatePicker name="startDate" label="Start Date" />
                    </Grid>
                    <Grid item md={12}>
                        <OvumDatePicker name="endDate" label="End Date" />
                    </Grid>
                    <Grid item md={6}>
                        <OvumTimePicker name="startTime" label="Start Time" />
                    </Grid>
                    <Grid item md={6}>
                        <OvumTimePicker name="endTime" label="End Time" />
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
