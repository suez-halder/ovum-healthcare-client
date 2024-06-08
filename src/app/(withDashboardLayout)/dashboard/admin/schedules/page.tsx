"use client";

import {
    useDeleteScheduleMutation,
    useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import SchedulesModal from "./components/SchedulesModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { TSchedule } from "@/types/schedule";

const SchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetAllSchedulesQuery({});
    const [allSchedule, setAllSchedule] = useState<any>([]);

    const schedules = data?.schedules;
    const meta = data?.meta;

    // console.log(schedules);

    useEffect(() => {
        const updateData = schedules?.map(
            (schedule: TSchedule, index: number) => {
                return {
                    sl: index + 1,
                    id: schedule?.id,
                    startDate: dateFormatter(schedule.startDateTime),
                    endDate: dateFormatter(schedule.endDateTime),
                    startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
                    endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
                };
            }
        );
        setAllSchedule(updateData);
    }, [schedules]);

    const [deleteSchedule] = useDeleteScheduleMutation();

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteSchedule(id).unwrap();
            if (res?.id) {
                toast.success("Schedule deleted successfully!");
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const columns: GridColDef[] = [
        { field: "sl", headerName: "SL" },
        { field: "startDate", headerName: "StartDate", flex: 1 },
        { field: "endDate", headerName: "End Date", flex: 1 },
        { field: "startTime", headerName: "Start Time", flex: 1 },
        { field: "endTime", headerName: "End Time", flex: 1 },

        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            },
        },
    ];
    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>
                Create Schedule
            </Button>
            <SchedulesModal open={isModalOpen} setOpen={setIsModalOpen} />
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid
                        rows={allSchedule ?? []}
                        columns={columns}
                        hideFooter={true}
                    />
                </Box>
            ) : (
                <h1>Loading...</h1>
            )}
        </Box>
    );
};

export default SchedulesPage;
