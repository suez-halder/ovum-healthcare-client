import DashedLine from "@/components/UI/Doctor/DashedLine";
import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory";
import { Doctor } from "@/types/doctor";
import { Box, Container } from "@mui/material";
import React from "react";

interface PropType {
    searchParams: { specialties: string };
}

const Doctors = async ({ searchParams }: PropType) => {
    let res;
    if (searchParams?.specialties) {
        res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor?specialties=${searchParams?.specialties}`
        );
    } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor`);
    }

    const { data } = await res.json();

    // console.log(data);

    return (
        <Container>
            {/* <Box
                sx={{
                    borderBottom: "2px dashed",
                    borderColor: "secondary.main",
                    my: 4,
                }}
            /> */}
            <DashedLine />
            <ScrollCategory />
            <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
                {data?.map((doctor: Doctor, index: number) => (
                    <Box key={doctor.id}>
                        <DoctorCard doctor={doctor} />

                        {index === data?.length - 1 ? null : (
                            // <Box
                            //     sx={{
                            //         borderBottom: "2px dashed",
                            //         borderColor: "secondary.main",
                            //         my: 4,
                            //     }}
                            // />
                            <DashedLine />
                        )}
                    </Box>
                ))}
                {data?.length === 0 && (
                    <Box>No Doctor Found With This Specialty</Box>
                )}
            </Box>
        </Container>
    );
};

export default Doctors;
