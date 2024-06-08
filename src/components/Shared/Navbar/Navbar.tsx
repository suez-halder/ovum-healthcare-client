"use client";

import useUserInfo from "@/hooks/useUserInfo";
import logoutUser from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
    // implemented lazy loading for button component --> to resolve hydration error.
    const AuthButton = dynamic(
        () => import("@/components/UI/AuthButton/AuthButton"),
        { ssr: false }
    );

    const userInfo = useUserInfo();
    const role = userInfo?.role;

    const router = useRouter();

    const handleLogout = () => {
        // removeUser();
        // localStorage.removeItem(authKey);
        // deleteCookies([authKey, "refreshToken"]);
        // router.push("/");
        // router.refresh();
        logoutUser(router);
    };

    return (
        <Box
            sx={{
                bgcolor: "primary.main",
            }}
        >
            <Container>
                <Stack
                    py={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h4"
                        component={Link}
                        href="/"
                        fontWeight={600}
                    >
                        <Box component="span" color="#ffff">
                            OVUM
                        </Box>{" "}
                        Health Care
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        gap={4}
                    >
                        <Typography color="#ffff">Consultation</Typography>
                        <Typography color="#ffff">Health Plans</Typography>
                        <Typography color="#ffff">Medicine</Typography>
                        <Typography color="#ffff">Diagnostics</Typography>
                        {userInfo?.email ? (
                            <Typography
                                color="#ffff"
                                component={Link}
                                href={`/dashboard/${role}`}
                            >
                                Dashboard
                            </Typography>
                        ) : null}
                    </Stack>

                    <AuthButton />
                    {/* {userInfo?.email ? (
                    <Button onClick={handleLogout} color="error">
                        Logout
                    </Button>
                ) : (
                    <Button component={Link} href="/login">
                        Login
                    </Button>
                )} */}
                </Stack>
            </Container>
        </Box>
    );
};

export default Navbar;
