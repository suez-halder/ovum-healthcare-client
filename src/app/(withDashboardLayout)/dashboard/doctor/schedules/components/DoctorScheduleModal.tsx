import OvumModal from "@/components/Shared/OvumModal/OvumModal";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import { Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorSchedulesApi";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({ open, setOpen }: TProps) => {
    const [selectedDate, setSelectedDate] = useState(
        dayjs(new Date()).toISOString()
    );

    const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>(
        []
    );

    const query: Record<string, any> = {};

    if (!!selectedDate) {
        query["startDate"] = dayjs(selectedDate)
            .hour(0)
            .minute(0)
            .millisecond(0)
            .toISOString();
        query["endDate"] = dayjs(selectedDate)
            .hour(23)
            .minute(59)
            .millisecond(999)
            .toISOString();
    }

    const { data } = useGetAllSchedulesQuery(query);
    const schedules = data?.schedules;

    const [createDoctorSchedule, { isLoading }] =
        useCreateDoctorScheduleMutation();

    const onSubmit = async () => {
        try {
            const res = await createDoctorSchedule({
                scheduleIds: selectedScheduleIds,
            }).unwrap();
            if (res?.count > 0) {
                toast.success("Doctor schedule created successfully!");
                setOpen(false);
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <OvumModal open={open} setOpen={setOpen} title="Select Doctor Schedule">
            <Stack direction={"column"} gap={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        value={dayjs(selectedDate)}
                        onChange={(newValue) =>
                            setSelectedDate(dayjs(newValue).toISOString())
                        }
                        sx={{ width: "100%" }}
                    />
                </LocalizationProvider>
                <MultipleSelectFieldChip
                    schedules={schedules!}
                    selectedScheduleIds={selectedScheduleIds}
                    setSelectedScheduleIds={setSelectedScheduleIds}
                />
                <LoadingButton
                    size="small"
                    onClick={onSubmit}
                    loading={isLoading}
                    loadingIndicator="Submitting..."
                    variant="contained"
                >
                    <span>Submit</span>
                </LoadingButton>
            </Stack>
        </OvumModal>
    );
};

export default DoctorScheduleModal;
