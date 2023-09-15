import { Box, CircularProgress } from "@mui/material";

const LoadingState = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <CircularProgress size={80} />
    </Box>
  );
};

export default LoadingState;
