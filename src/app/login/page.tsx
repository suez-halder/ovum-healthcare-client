"use client";

import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";

export type TFormValues = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<TFormValues>();

    const router = useRouter();

    const onSubmit: SubmitHandler<TFormValues> = async (values) => {
        // console.log(values);
        try {
            const res = await userLogin(values);
            if (res?.data?.accessToken) {
                toast.success(res?.message);
                storeUserInfo({ accessToken: res?.data?.accessToken });
                router.push("/");
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
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("email")}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("password")}
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
                        </form>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginPage;
