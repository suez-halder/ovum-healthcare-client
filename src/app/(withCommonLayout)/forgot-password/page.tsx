"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";

import { FieldValues } from "react-hook-form";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import CheckIcon from "@mui/icons-material/Check";
import OvumForm from "@/components/Forms/OvumForm";
import OvumInput from "@/components/Forms/OvumInput";

const validationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
});

const ForgotPassword = () => {
    const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();

    const onSubmit = async (values: FieldValues) => {
        try {
            const res = await forgotPassword(values);
            if ("data" in res && res?.data?.status === 200) {
                toast.success("Reset link has been sent to your email.");
            } else {
                throw new Error("Something went wrong! Try again.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack
            sx={{
                alignItems: "center",
                justifyContent: "center",
                height: { sm: "100vh" },
            }}
        >
            <Box
                sx={{
                    px: 4,
                    py: 2,
                    maxWidth: 600,
                    width: "100%",
                    boxShadow: 1,
                    borderRadius: 1,
                }}
            >
                <Stack alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            "& svg": {
                                width: 100,
                                height: 100,
                            },
                        }}
                    >
                        <KeyIcon sx={{ color: "primary.main" }} />
                    </Box>
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                        Forgot password
                    </Typography>
                </Stack>

                {isSuccess && (
                    <Box>
                        <Alert
                            icon={<CheckIcon fontSize="inherit" />}
                            severity="success"
                        >
                            An Email with reset password link was sent to your
                            email
                        </Alert>
                    </Box>
                )}

                {!isSuccess && (
                    <OvumForm
                        onSubmit={onSubmit}
                        defaultValues={{ email: "" }}
                        resolver={zodResolver(validationSchema)}
                    >
                        <Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <OvumInput
                                    name="email"
                                    type="email"
                                    label="Your email"
                                    sx={{ mb: 2 }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" sx={{ width: "100%", my: 2 }}>
                            Forgot Password
                        </Button>
                    </OvumForm>
                )}
            </Box>
        </Stack>
    );
};

export default ForgotPassword;
