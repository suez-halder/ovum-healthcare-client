import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Specialist = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/specialties`,
        {
            next: {
                revalidate: 30,
            },
        }
    );
    const { data: specialties } = await res.json();
    // console.log(specialties);
    return (
        <Container>
            <Box
                sx={{
                    margin: "40px 0px",
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        textAlign: "start",
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Explore Treatments Across Specialties
                    </Typography>
                    <Typography component="p" fontWeight={300} fontSize="18px">
                        Experienced Doctors Across All Specialties
                    </Typography>
                </Box>
                <Stack direction="row" gap={5} mt={5}>
                    {specialties?.map((specialty: any) => (
                        <Box
                            key={specialty.id}
                            sx={{
                                flex: 1,
                                width: "150px",
                                backgroundColor: "rgba(245, 245, 245, 0.75)",
                                border: "1px solid rgba(250, 250, 250, 1)",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "30px 10px",
                                "& img": {
                                    width: "50px",
                                    height: "50px",
                                    margin: "0 auto",
                                },
                                "&:hover": {
                                    border: "1px solid #1586FD",
                                    cursor: "pointer",
                                    padding: "30px 10px",
                                    borderRadius: "10px",
                                },
                            }}
                        >
                            <Image
                                src={specialty.icon}
                                width={100}
                                height={100}
                                alt="specialty icon"
                            />
                            <Box>
                                <Typography
                                    component="p"
                                    fontWeight={600}
                                    fontSize="18px"
                                    mt={2}
                                >
                                    {specialty.title}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
                <Button
                    variant="outlined"
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    View All
                </Button>
            </Box>
        </Container>
    );
};

export default Specialist;
