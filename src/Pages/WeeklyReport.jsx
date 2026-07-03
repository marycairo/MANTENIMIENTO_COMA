import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function WeeklyReport() {

  const navigate = useNavigate();

  const dni = localStorage.getItem("dni") || "";

  const [formulario, setFormulario] = useState({

    motivo: "",

    obra: "",

    observaciones: ""

  });

  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {

    setFormulario({

      ...formulario,

      [e.target.name]: e.target.value

    });

  };

  return (

    <Box

      sx={{

        minHeight: "100vh",

        background: "#F4FAF7",

        px: 2,

        py: 3

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
            right: -80,
            bottom: -80,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(22,163,74,0.05)"
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: -30,
            bottom: -90,
            width: 170,
            height: 170,
            borderRadius: "50%",
            background: "rgba(22,163,74,0.08)"
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            position: "relative",
            zIndex: 1
          }}
        >

          <ArrowBackIosNewRoundedIcon
            onClick={() => navigate("/home")}
            sx={{
              color: "#16A34A",
              cursor: "pointer"
            }}
          />

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => {

              localStorage.removeItem("dni");
              localStorage.removeItem("correo");

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

        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 700,
            color: "#1F2937",
            position: "relative",
            zIndex: 1
          }}
        >
          Reporte semanal
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: 14,
            mb: 3,
            position: "relative",
            zIndex: 1
          }}
        >
          Registro fotográfico de horómetros
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1,
            borderRadius: 20,
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            position: "relative",
            zIndex: 1
          }}
        >

          <AccountCircleRoundedIcon
            sx={{
              color: "#16A34A",
              fontSize: 26
            }}
          />

          <Box>

            <Typography
              sx={{
                fontSize: 11,
                color: "#64748B"
              }}
            >
              Operador
            </Typography>

            <Typography fontWeight={700}>
              {dni}
            </Typography>

          </Box>

        </Box>

      </Paper>

      {/* DATOS */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #DDEDE4",
          mb: 3
        }}
      >

        <Typography
          fontWeight={700}
          mb={2}
        >
          Datos del reporte
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Motivo de la carga (si corresponde)"
          name="motivo"
          value={formulario.motivo}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Obra"
          name="obra"
          value={formulario.obra}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Observaciones"
          name="observaciones"
          value={formulario.observaciones}
          onChange={handleChange}
        />

      </Paper>

      {/* FOTO */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #DDEDE4",
          mb: 4
        }}
      >

        <Typography
          fontWeight={700}
          mb={2}
        >
          Fotografía del horómetro
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: 14,
            mb: 2
          }}
        >
          La fotografía debe mostrar claramente el horómetro del equipo.
        </Typography>

        <Button
          component="label"
          fullWidth
          variant="outlined"
          startIcon={<PhotoCameraIcon />}
          sx={{
            py: 1.6,
            borderRadius: 3,
            textTransform: "none",
            borderColor: "#16A34A",
            color: "#16A34A"
          }}
        >

          {imagen ? imagen.name : "Cargar imagen del horómetro"}

          <input

            hidden

            type="file"

            accept="image/*"

            capture="environment"

            onChange={(e) => {

              if (e.target.files[0]) {

                setImagen(e.target.files[0]);

              }

            }}

          />

        </Button>

      </Paper>

      <Button

        fullWidth

        variant="contained"

        sx={{

          py: 1.8,

          borderRadius: 3,

          background: "#16A34A",

          fontWeight: 700,

          fontSize: 16,

          textTransform: "none",

          boxShadow: "0 8px 18px rgba(22,163,74,0.25)",

          "&:hover": {

            background: "#15803D"

          }

        }}

      >

        Enviar reporte semanal

      </Button>

    </Box>

  );

}