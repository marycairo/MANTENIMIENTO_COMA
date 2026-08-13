import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const mostrarError = (mensaje) => {
    setError(mensaje);

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const ingresar = async () => {
    // Limpiar mensaje anterior
    setError("");

    // Validar que haya datos
    if (!correo.trim() || !dni.trim()) {
      mostrarError("Complete todos los campos.");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch(
        "https://default56df1b06d1b74f83a8dcdb4e6ad0ab.79.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/08/workflows/5b0b30da7a624486b9d1833ea5098022/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1zBghZskGlnNHy4Nu3IVfkZndzvFtj0aFeP4J8i7OvM",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo: correo.trim(),
            dni: dni.trim(),
          }),
        }
      );

      // Leer respuesta de Power Automate
      const data = await response.json();

      console.log("Respuesta Power Automate:", data);
      console.log("Código HTTP:", response.status);

      /*
       * SOLO PERMITIMOS EL INGRESO SI:
       *
       * 1. El servidor responde HTTP 200
       * 2. El flujo devuelve ok: true
       */

      if (response.status !== 200 || data.ok !== true) {
        mostrarError(
          data.mensaje || "Usuario no autorizado."
        );

        return;
      }

      /*
       * USUARIO AUTORIZADO
       *
       * Recién acá guardamos los datos.
       */

      localStorage.setItem(
        "correo",
        correo.trim()
      );

      localStorage.setItem(
        "dni",
        dni.trim()
      );

      // Ir al Home
      navigate("/home");
    } catch (error) {
      console.error(
        "Error al conectar con Power Automate:",
        error
      );

      mostrarError(
        "No se pudo conectar con el servidor. Intente nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4FAF7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
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
          background: "#FFFFFF",
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
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
              boxShadow:
                "0 8px 20px rgba(22,163,74,0.25)",
            }}
          >
            COMA
          </Box>

          <Typography
            sx={{
              mt: 3,
              fontWeight: 800,
              color: "#1F2937",
              fontSize: 24,
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
              fontSize: 14,
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
            color: "#334155",
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
          disabled={cargando}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "#F8FAFC",

              "& fieldset": {
                borderColor: "#D1E8D8",
              },

              "&:hover fieldset": {
                borderColor: "#16A34A",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#16A34A",
              },
            },
          }}
        />

        {/* DNI */}
        <Typography
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#334155",
          }}
        >
          DNI
        </Typography>

        <TextField
          fullWidth
          type="text"
          placeholder="Ej: 12345678"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          disabled={cargando}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "#F8FAFC",

              "& fieldset": {
                borderColor: "#D1E8D8",
              },

              "&:hover fieldset": {
                borderColor: "#16A34A",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#16A34A",
              },
            },
          }}
        />

        {/* MENSAJE DE ERROR */}
        {error && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              background: "#FEF2F2",
              border: "1px solid #FECACA",
            }}
          >
            <Typography
              sx={{
                color: "#B91C1C",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {/* BOTÓN */}
        <Button
          fullWidth
          variant="contained"
          onClick={ingresar}
          disabled={cargando}
          endIcon={
            !cargando ? <ArrowForwardIcon /> : null
          }
          sx={{
            py: 1.8,
            borderRadius: 3,
            background: "#16A34A",
            fontSize: 16,
            fontWeight: 800,
            textTransform: "none",
            boxShadow:
              "0 8px 18px rgba(22,163,74,0.25)",

            "&:hover": {
              background: "#15803D",
              boxShadow:
                "0 10px 25px rgba(22,163,74,0.35)",
            },

            "&.Mui-disabled": {
              background: "#86C99D",
              color: "#FFFFFF",
            },
          }}
        >
          {cargando ? "Verificando..." : "Continuar"}
        </Button>

        {/* TEXTO INFERIOR */}
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "#94A3B8",
            fontSize: 12,
          }}
        >
          Acceso exclusivo para operadores
        </Typography>
      </Paper>
    </Box>
  );
}