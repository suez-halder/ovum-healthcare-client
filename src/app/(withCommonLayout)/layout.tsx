import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { Box } from "@mui/material";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {/* <div className="min-h-screen">{children}</div> */}
            <Box
                sx={{
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default CommonLayout;
