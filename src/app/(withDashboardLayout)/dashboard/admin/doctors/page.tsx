"use client";

import {
    useDeleteDoctorMutation,
    useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data, isLoading } = useGetAllDoctorsQuery({});
    // console.log(data);
    const doctors = data?.doctors;
    const meta = data?.meta;

    console.log(doctors);

    const [deleteDoctor] = useDeleteDoctorMutation();

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteDoctor(id).unwrap();
            if (res?.id) {
                toast.success("Doctor deleted successfully!");
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 400 },

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
            <Stack direction="row" justifyContent="space-between">
                <Button onClick={() => setIsModalOpen(true)}>
                    Create New Doctor
                </Button>
                <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
                <TextField size="small" placeholder="Search Doctors" />
            </Stack>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid rows={doctors} columns={columns} />
                </Box>
            ) : (
                <h1>Loading...</h1>
            )}
        </Box>
    );
};

export default DoctorsPage;
