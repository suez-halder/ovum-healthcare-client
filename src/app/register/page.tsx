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
import { useForm, SubmitHandler } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IPatientData {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
}

interface IPatientRegisterFormData {
    password: string;
    patient: IPatientData;
}

const RegisterPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IPatientRegisterFormData>();

    const onSubmit: SubmitHandler<IPatientRegisterFormData> = async (
        values
    ) => {
        const data = modifyPayload(values);
        try {
            const res = await registerPatient(data);
            if (res?.data?.id) {
                toast.success(res?.message);
                router.push("/login");
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
                                Patient Register
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={12}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("patient.name")}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("patient.email")}
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
                                <Grid item md={6}>
                                    <TextField
                                        label="Contact Number"
                                        type="tej"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("patient.contactNumber")}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Address"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                        {...register("patient.address")}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth={true}
                                sx={{
                                    margin: "10px 0",
                                }}
                                type="submit"
                            >
                                Register
                            </Button>
                            <Typography component="p" fontWeight={300}>
                                Do you already have an account?{" "}
                                <Box component="span" color="primary.main">
                                    <Link href="/login">Login</Link>
                                </Box>
                            </Typography>
                        </form>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;
