import {
  Box,
  Typography,
  Paper
} from "@mui/material";
import Button from "@mui/material/Button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const dni = localStorage.getItem("dni");

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4FAF7",
        px: 2,
        py: 4
      }}
    >

{/* Header */}

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 5
  }}
>

  <Box>

    <Typography
      sx={{
        fontSize: 26,
        fontWeight: 800,
        color: "#1F2937"
      }}
    >
      MANTENIMIENTO COMA SA
    </Typography>

    <Typography
      sx={{
        mt: 1,
        color: "#64748B",
        fontSize: 15
      }}
    >
      Sistema de Reporte de Novedades
    </Typography>

  </Box>

  <Button
    variant="outlined"
    color="error"
    startIcon={<LogoutRoundedIcon />}
    onClick={() => {
      localStorage.removeItem("dni");
      navigate("/");
    }}
    sx={{
      borderRadius: 2,
      textTransform: "none",
      fontWeight: 600
    }}
  >
    Salir
  </Button>

</Box>

      {/* Bienvenida */}

      <Box sx={{ mb: 4 }}>

        <Typography
          sx={{
            fontWeight: 700,
            color: "#334155",
            fontSize: 18
          }}
        >
          Bienvenido
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            mt: .5
          }}
        >
          DNI: {dni}
        </Typography>

      </Box>

      {/* Reportar */}

      <Paper

        elevation={0}

        onClick={() => navigate("/reportar")}

        sx={{

          display: "flex",

          alignItems: "center",

          p: 2.5,

          mb: 2,

          borderRadius: 3,

          border: "1px solid #DDEDE4",

          cursor: "pointer",

          transition: ".2s",

          "&:hover": {

            borderColor: "#16A34A",

            background: "#FAFCFB"

          }

        }}

      >

        <BuildRoundedIcon

          sx={{

            color: "#16A34A",

            fontSize: 34,

            mr: 2

          }}

        />

        <Box flex={1}>

          <Typography fontWeight={700}>
            Reportar novedad
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: 14,
              mt: .3
            }}
          >
            Registrar una nueva incidencia.
          </Typography>

        </Box>

        <ChevronRightRoundedIcon
          sx={{
            color: "#94A3B8"
          }}
        />

      </Paper>

      {/* Historial */}

      <Paper

        elevation={0}

        onClick={() => navigate("/historial")}

        sx={{

          display: "flex",

          alignItems: "center",

          p: 2.5,

          borderRadius: 3,

          border: "1px solid #DDEDE4",

          cursor: "pointer",

          transition: ".2s",

          "&:hover": {

            borderColor: "#16A34A",

            background: "#FAFCFB"

          }

        }}

      >

        <HistoryRoundedIcon

          sx={{

            color: "#16A34A",

            fontSize: 34,

            mr: 2

          }}

        />

        <Box flex={1}>

          <Typography fontWeight={700}>
            Historial de Reportes
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              fontSize: 14,
              mt: .3
            }}
          >
            Consultar reportes enviados.
          </Typography>

        </Box>

        <ChevronRightRoundedIcon
          sx={{
            color: "#94A3B8"
          }}
        />

      </Paper>

    </Box>

  );

}