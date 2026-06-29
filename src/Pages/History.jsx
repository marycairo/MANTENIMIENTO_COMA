import { useNavigate } from "react-router-dom";

import {
  Box,
  Chip,
  Paper,
  Typography
} from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const reportes = [
  {
    id: 1,
    equipo: "Grúa 201",
    sistema: "Sistema hidráulico",
    fecha: "27/06/2026",
    estado: "Pendiente"
  },
  {
    id: 2,
    equipo: "Grúa 154",
    sistema: "Motor",
    fecha: "26/06/2026",
    estado: "En proceso"
  },
  {
    id: 3,
    equipo: "Grúa 089",
    sistema: "Sistema eléctrico",
    fecha: "24/06/2026",
    estado: "Resuelto"
  }
];

export default function Historial() {

  const navigate = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4FAF7",
        p: 2
      }}
    >

      {/* HEADER */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          border: "1px solid #DDEDE4",
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden"
        }}
      >

        {/* Fondo decorativo */}

        <Box
          sx={{
            position: "absolute",
            right: -70,
            bottom: -70,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(22,163,74,.05)"
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: -30,
            bottom: -90,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(22,163,74,.08)"
          }}
        />

        <Box
          display="flex"
          alignItems="center"
        >

          <ArrowBackIosNewRoundedIcon
            onClick={() => navigate("/home")}
            sx={{
              color: "#16A34A",
              cursor: "pointer",
              mr: 1
            }}
          />

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1F2937"
            }}
          >
            Historial
          </Typography>

        </Box>

        <Typography
          sx={{
            mt: 1,
            color: "#64748B"
          }}
        >
          Consulte el estado de los reportes enviados.
        </Typography>

        {/* Resumen */}

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 3,
            flexWrap: "wrap"
          }}
        >

          <Chip
            label="1 Pendiente"
            color="error"
            size="small"
          />

          <Chip
            label="1 En proceso"
            color="warning"
            size="small"
          />

          <Chip
            label="1 Resuelto"
            color="success"
            size="small"
          />

        </Box>

      </Paper>

      {/* TARJETAS */}

      {

        reportes.map((reporte) => (

          <Paper

            key={reporte.id}

            elevation={0}

            sx={{

              p: 2.5,

              mb: 2,

              borderRadius: 4,

              border: "1px solid #DDEDE4"

            }}

          >

            <Box

              display="flex"

              justifyContent="space-between"

              alignItems="center"

              mb={2}

            >

              <Typography

                sx={{

                  fontWeight: 700,

                  fontSize: 18

                }}

              >

                {reporte.equipo}

              </Typography>

              <Chip

                label={reporte.estado}

                size="small"

                color={

                  reporte.estado === "Resuelto"

                    ? "success"

                    : reporte.estado === "Pendiente"

                    ? "error"

                    : "warning"

                }

              />

            </Box>

            <Typography

              sx={{

                color: "#475569",

                mb: 1

              }}

            >

              {reporte.sistema}

            </Typography>

            <Typography

              sx={{

                color: "#94A3B8",

                fontSize: 13

              }}

            >

              {reporte.fecha}

            </Typography>

          </Paper>

        ))

      }

    </Box>

  );

}