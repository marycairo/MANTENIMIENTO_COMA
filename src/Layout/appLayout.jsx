import { Box } from "@mui/material";

export default function AppLayout({ children }) {

  return (
    <Box
      sx={{
        minHeight:"100vh",
        width:"100%",
        background:"#F4FAF7",
        display:"flex",
        justifyContent:"center",
      }}
    >

      <Box
        sx={{
          width:"100%",
          maxWidth:"420px",
          minHeight:"100vh",
          background:"#FFFFFF",
          overflow:"hidden"
        }}
      >

        {children}

      </Box>

    </Box>
  )
}