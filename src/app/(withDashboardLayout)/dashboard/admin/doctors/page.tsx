"use client";

import {
    useDeleteDoctorMutation,
    useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DoctorModal from "./components/DoctorModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import EditIcon from "@mui/icons-material/Edit";

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const query: Record<string, any> = {};
    const [searchTerm, setSearchTerm] = useState<string>("");

    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 1000,
    });

    if (!!debouncedTerm) {
        query["searchTerm"] = searchTerm;
    }

    const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
    const doctors = data?.doctors;
    const meta = data?.meta;

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
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "contactNumber", headerName: "Contact No.", flex: 1 },
        { field: "qualification", headerName: "Qualification", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "appointmentFee", headerName: "Appointment Fee", flex: 1 },

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
                        <EditIcon />
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
                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    placeholder="Search Doctors"
                />
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
