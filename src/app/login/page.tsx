"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";
import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async (values: FieldValues) => {
        // console.log(values);
        try {
            const res = await userLogin(values);
            if (res?.data?.accessToken) {
                toast.success(res?.message);
                storeUserInfo({ accessToken: res?.data?.accessToken });
                router.push("/dashboard");
            } else {
                setError(res?.message);
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <Container>
            <Stack
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Box
                    sx={{
                        maxWidth: 600,
                        width: "100%",
                        boxShadow: 1,
                        borderRadius: 1,
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    <Stack
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Image
                                src={assets.svgs.logo}
                                alt="logo"
                                width={50}
                                height={50}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={600}>
                                Login to Ovum Healthcare
                            </Typography>
                        </Box>
                    </Stack>

                    {error && (
                        <Box>
                            <Typography
                                color="white"
                                sx={{
                                    backgroundColor: "red",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    marginTop: "5px",
                                }}
                            >
                                {error}
                            </Typography>
                        </Box>
                    )}

                    <Box>
                        <OvumForm
                            onSubmit={handleLogin}
                            resolver={zodResolver(validationSchema)}
                            defaultValues={{
                                email: "",
                                password: "",
                            }}
                        >
                            <Grid container spacing={2} my={1}>
                                <Grid item md={6}>
                                    <OvumInput
                                        name="email"
                                        label="Email"
                                        type="email"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <OvumInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                mb={1}
                                textAlign="end"
                                component="p"
                                fontWeight={300}
                            >
                                Forgot Password?
                            </Typography>
                            <Button
                                fullWidth={true}
                                sx={{
                                    margin: "10px 0",
                                }}
                                type="submit"
                            >
                                Login
                            </Button>
                            <Typography component="p" fontWeight={300}>
                                Don&apos; have an account?{" "}
                                <Box component="span" color="primary.main">
                                    <Link href="/register">Register</Link>
                                </Box>
                            </Typography>
                        </OvumForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;
