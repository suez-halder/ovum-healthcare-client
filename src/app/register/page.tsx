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
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";

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

    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values);
        try {
            const res = await registerPatient(data);
            if (res?.data?.id) {
                toast.success(res?.message);
                const result = await userLogin({
                    password: values.password,
                    email: values.patient.email,
                });
                if (result?.data?.accessToken) {
                    storeUserInfo({
                        accessToken: result?.data?.accessToken,
                    });
                    router.push("/");
                }
            }
        } catch (err: any) {
            toast.error(err.message);
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
                        <OvumForm onSubmit={handleRegister}>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={12}>
                                    <OvumInput
                                        name="patient.name"
                                        label="Name"
                                        size="small"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <OvumInput
                                        name="patient.email"
                                        label="Email"
                                        type="email"
                                        size="small"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <OvumInput
                                        name="password"
                                        label="Password"
                                        type="password"
                                        size="small"
                                        fullWidth={true}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <OvumInput
                                        name="patient.contactNumber"
                                        label="Contact Number"
                                        type="tel"
                                        size="small"
                                        fullWidth={true}
                                        required={false}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <OvumInput
                                        name="patient.address"
                                        label="Address"
                                        type="text"
                                        size="small"
                                        fullWidth={true}
                                        required={false}
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
                        </OvumForm>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default RegisterPage;
