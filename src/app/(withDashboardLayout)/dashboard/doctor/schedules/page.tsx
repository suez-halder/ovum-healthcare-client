"use client";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormatter } from "@/utils/dateFormatter";
import { TSchedule } from "@/types/schedule";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorSchedulesApi";

const DoctorSchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [allSchedule, setAllSchedule] = useState<any>([]);
    const { data, isLoading } = useGetAllDoctorSchedulesQuery({});

    const schedules = data?.doctorSchedules;

    useEffect(() => {
        const updateData = schedules?.map(
            (schedule: TSchedule, index: number) => {
                return {
                    id: schedule?.scheduleId,
                    startDate: dateFormatter(schedule?.schedule?.startDateTime),
                    startTime: dayjs(schedule?.startDate).format("hh:mm a"),
                    endTime: dayjs(schedule?.endDate).format("hh:mm a"),
                };
            }
        );
        setAllSchedule(updateData);
    }, [schedules]);

    const columns: GridColDef[] = [
        { field: "startDate", headerName: "Date", flex: 1 },
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
                    <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            <Button
                onClick={() => setIsModalOpen(true)}
                endIcon={<AddIcon />}
                sx={{ mt: 3.5 }}
            >
                Create Doctor Schedule
            </Button>
            <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
            <Box sx={{ mb: 5 }}></Box>

            <Box>
                {!isLoading ? (
                    <Box my={2}>
                        <DataGrid
                            rows={allSchedule ?? []}
                            columns={columns}
                            hideFooterPagination
                        />
                    </Box>
                ) : (
                    <h1>Loading.....</h1>
                )}
            </Box>
        </Box>
    );
};

export default DoctorSchedulesPage;
