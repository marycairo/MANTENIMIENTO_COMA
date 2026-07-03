import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const novedades = [
  {
    id: 1,
    equipo: "Grúa 201",
    sistema: "Sistema hidráulico",
    fecha: "27/06/2026"
  },
  {
    id: 2,
    equipo: "Grúa 154",
    sistema: "Motor",
    fecha: "26/06/2026"
  },
  {
    id: 3,
    equipo: "Grúa 089",
    sistema: "Sistema eléctrico",
    fecha: "24/06/2026"
  }
];

const horometros = [
  {
    id: 1,
    obra: "YPF Loma Campana",
    motivo: "Carga fuera del análisis",
    fecha: "27/06/2026"
  },
  {
    id: 2,
    obra: "Pan American Energy",
    motivo: "Sin observaciones",
    fecha: "20/06/2026"
  }
];

export default function Historial() {

  const navigate = useNavigate();

  const [tab, setTab] = useState(0);

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
          borderRadius: 5,
          border: "1px solid #DDEDE4",
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden"
        }}
      >

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
          Consulte los reportes enviados.
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          sx={{
            mt: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: "#16A34A",
              height: 3,
              borderRadius: 5
            }
          }}
        >

          <Tab
            label="Novedades"
            sx={{
              textTransform: "none",
              fontWeight: 700
            }}
          />

          <Tab
            label="Horómetros"
            sx={{
              textTransform: "none",
              fontWeight: 700
            }}
          />

        </Tabs>

      </Paper>

      {/* HISTORIAL NOVEDADES */}

      {tab === 0 && (

        novedades.map((reporte) => (

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

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                mb: 1
              }}
            >
              {reporte.equipo}
            </Typography>

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

      )}

      {/* HISTORIAL HORÓMETROS */}

      {tab === 1 && (

        horometros.map((reporte) => (

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

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                mb: 1
              }}
            >
              {reporte.obra}
            </Typography>

            <Typography
              sx={{
                color: "#475569",
                mb: 1
              }}
            >
              {reporte.motivo}
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

      )}

    </Box>

  );

}