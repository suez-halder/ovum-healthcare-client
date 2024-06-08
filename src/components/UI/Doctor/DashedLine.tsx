"use client";

import { Box, styled } from "@mui/system";

const StyledDashedLine = styled(Box)(() => ({
    borderBottom: "2px dashed",
    borderColor: "secondary.main",
    marginTop: 4,
    marginBottom: 4,
}));

const DashedLine = () => {
    return (
        <>
            <StyledDashedLine />
        </>
    );
};

export default DashedLine;
