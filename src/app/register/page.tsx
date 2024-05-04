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

const RegisterPage = () => {
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
                        <form>
                            <Grid container spacing={2} my={1}>
                                <Grid item md={12}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
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
                                <Grid item md={6}>
                                    <TextField
                                        label="Contact Number"
                                        type="tej"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        label="Address"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth={true}
                                sx={{
                                    margin: "10px 0",
                                }}
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
