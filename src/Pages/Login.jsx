import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login() {

  const [correo, setCorreo] = useState("");
  const [dni, setDni] = useState("");

  const navigate = useNavigate();

  const ingresar = () => {

    if (!correo || !dni) return;

    localStorage.setItem("correo", correo);
    localStorage.setItem("dni", dni);

    navigate("/home");

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4FAF7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 5,
          p: 4,
          border: "1px solid #DDEDE4",
          background: "#FFFFFF"
        }}
      >

        {/* LOGO */}

        <Box
          sx={{
            textAlign: "center",
            mb: 5
          }}
        >

          <Box
            sx={{
              width: 85,
              height: 85,
              borderRadius: "24px",
              background: "#16A34A",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(22,163,74,0.25)"
            }}
          >
            COMA
          </Box>

          <Typography
            sx={{
              mt: 3,
              fontWeight: 800,
              color: "#1F2937",
              fontSize: 24
            }}
          >
            MANTENIMIENTO
            <br />
            COMA SA
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#64748B",
              fontSize: 14
            }}
          >
            Ingrese sus datos para continuar
          </Typography>

        </Box>

        {/* CORREO */}

        <Typography
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#334155"
          }}
        >
          Correo electrónico
        </Typography>

        <TextField
          fullWidth
          type="email"
          placeholder="ejemplo@coma.com.ar"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {

              borderRadius: 3,

              background: "#F8FAFC",

              "& fieldset": {
                borderColor: "#D1E8D8"
              },

              "&:hover fieldset": {
                borderColor: "#16A34A"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#16A34A"
              }

            }

          }}
        />

        {/* DNI */}

        <Typography
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#334155"
          }}
        >
          DNI
        </Typography>

        <TextField
          fullWidth
          placeholder="Ej: 12345678"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          sx={{

            mb: 3,

            "& .MuiOutlinedInput-root": {

              borderRadius: 3,

              background: "#F8FAFC",

              "& fieldset": {
                borderColor: "#D1E8D8"
              },

              "&:hover fieldset": {
                borderColor: "#16A34A"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#16A34A"
              }

            }

          }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={ingresar}
          endIcon={<ArrowForwardIcon />}
          sx={{

            py: 1.8,

            borderRadius: 3,

            background: "#16A34A",

            fontSize: 16,

            fontWeight: 800,

            textTransform: "none",

            boxShadow: "0 8px 18px rgba(22,163,74,0.25)",

            "&:hover": {
              background: "#15803D",
              boxShadow: "0 10px 25px rgba(22,163,74,0.35)"
            }

          }}
        >
          Continuar
        </Button>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "#94A3B8",
            fontSize: 12
          }}
        >
          Acceso exclusivo para operadores
        </Typography>

      </Paper>

    </Box>

  );

}