"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ScrollCategory = () => {
    const { data } = useGetAllSpecialtiesQuery(undefined);
    // console.log(data);

    const [value, setValue] = useState("");

    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/doctors?specialties=${newValue}`);
    };

    return (
        <Box sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {data?.map((specialty: any) => (
                    <Tab
                        key={specialty.id}
                        label={specialty.title}
                        value={specialty.title}
                        sx={{
                            fontWeight: 500,
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default ScrollCategory;
