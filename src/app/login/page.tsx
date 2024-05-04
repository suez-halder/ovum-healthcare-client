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

const LoginPage = () => {
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
                                Patient Login
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <form>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={6}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
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
