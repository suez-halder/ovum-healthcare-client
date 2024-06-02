import { Box, List, Stack, Typography } from "@mui/material";

import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const { role } = getUserInfo() as any;
        setUserRole(role);
    }, []);

    return (
        <Box>
            <Stack
                sx={{
                    py: 1,
                    mt: 1,
                }}
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
                component={Link}
                href="/"
            >
                <Image
                    src={assets.svgs.logo}
                    alt="logo"
                    width={40}
                    height={40}
                />
                <Typography
                    variant="h6"
                    component="h1"
                    sx={{
                        cursor: "pointer",
                    }}
                >
                    Ovum Health Care
                </Typography>
            </Stack>
            <List>
                {drawerItems(userRole as UserRole).map((item, index) => (
                    <SidebarItem key={index} item={item} />
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;