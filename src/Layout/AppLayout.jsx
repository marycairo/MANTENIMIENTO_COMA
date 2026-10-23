
import { Box } from "@mui/material";

export default function AppLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: {
          xs: "#FFFFFF",
          md: "#F4FAF7",
        },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            md: "1200px",
            lg: "1400px",
          },
          minHeight: "100vh",
          background: "#FFFFFF",
          overflow: "hidden",
          boxShadow: {
            xs: "none",
            md: "0 0 30px rgba(15, 23, 42, 0.04)",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
