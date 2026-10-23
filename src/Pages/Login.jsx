
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import heroImage from "../assets/hero.png";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const navigate = useNavigate();

  const mostrarError = (mensaje) => {
    setError(mensaje);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const obtenerMensajeError = (status) => {
    switch (status) {
      case 400:
        return "Los datos enviados no son válidos.";
      case 401:
        return "Correo o contraseña incorrectos.";
      case 403:
        return "No tiene autorización para ingresar.";
      case 404:
        return "No se encontró el recurso solicitado.";
      case 500:
        return "Error interno del servidor.";
      case 502:
        return "El servidor no respondió. Intente nuevamente.";
      case 503:
        return "El servicio no está disponible.";
      default:
        return `No se pudo iniciar sesión. Código: ${status}`;
    }
  };

  const ingresar = async () => {
    setError("");

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

      const responseText = await response.text();

      console.log("Código HTTP:", response.status);
      console.log("Respuesta Power Automate:", responseText);

      let data = {};

      try {
        data = JSON.parse(responseText);
      } catch {
        data = {};
      }

      if (response.status === 200) {
        localStorage.setItem("correo", correo.trim());
        localStorage.setItem("dni", dni.trim());

        navigate("/home");
        return;
      }

      const mensajeError =
        data?.mensaje ||
        data?.error?.message ||
        obtenerMensajeError(response.status);

      mostrarError(mensajeError);
    } catch (error) {
      console.error("Error al conectar con Power Automate:", error);

      mostrarError(
        "No se pudo conectar con el servidor. Intente nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  const manejarEnter = (event) => {
    if (event.key === "Enter" && !cargando) {
      ingresar();
    }
  };

  const estilosCampo = {
    mb: 2.5,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "#F8FAFC",
      minHeight: { xs: 60, sm: 58 },
      fontSize: { xs: 16, sm: 15 },
      "& fieldset": {
        borderColor: "#D3E8DB",
      },
      "&:hover fieldset": {
        borderColor: "#16A34A",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#16A34A",
        borderWidth: 2,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "center",
        p: { xs: 0, md: 3, lg: 4 },
        background: {
          xs: "#F4FAF7",
          md: "#EAF5EF",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1500,
          minHeight: { xs: "100vh", md: "min(900px, 94vh)" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.12fr 0.88fr" },
          overflow: "hidden",
          borderRadius: { xs: 0, md: "28px" },
          background: "#F7FCF9",
          boxShadow: {
            xs: "none",
            md: "0 24px 80px rgba(15, 70, 40, 0.12)",
          },
        }}
      >
        {/* PANEL VISUAL: PC. Se conserva el diseño original. */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            px: { md: 5, lg: 8 },
            py: 6,
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(247,252,249,0.99) 0%,
                rgba(247,252,249,0.95) 38%,
                rgba(247,252,249,0.58) 65%,
                rgba(247,252,249,0.05) 100%
              ),
              url("${heroImage}")
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 520 }}>
            <Typography
              sx={{
                fontSize: { md: 36, lg: 48 },
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: "-1.5px",
                color: "#17315B",
                mb: 2,
              }}
            >
              Tu operación, siempre activa.
            </Typography>

            <Typography
              sx={{
                maxWidth: 440,
                fontSize: { md: 16, lg: 19 },
                lineHeight: 1.65,
                color: "#526783",
                mb: 4,
              }}
            >
              Gestión de reportes técnicos, equipos y operadores en un solo
              lugar.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {[
                {
                  icon: <DescriptionOutlinedIcon />,
                  text: "Reportes centralizados",
                },
                {
                  icon: <AccessTimeOutlinedIcon />,
                  text: "Seguimiento en tiempo real",
                },
              ].map((item) => (
                <Box
                  key={item.text}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "#17315B",
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#159447",
                      border: "2px solid #159447",
                      borderRadius: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "1px solid rgba(22,163,74,0.18)",
              bottom: -190,
              left: -100,
            }}
          />
        </Box>

        {/* IMAGEN SUPERIOR: MÓVIL */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            height: { xs: 150, sm: 280 },
            width: "100%",
            position: "relative",
            backgroundColor: "#F4FAF7",
            backgroundImage: `
              linear-gradient(
                180deg,
                rgba(244,250,247,0.02) 0%,
                rgba(244,250,247,0.04) 45%,
                rgba(244,250,247,0.48) 72%,
                #F4FAF7 100%
              ),
              url("${heroImage}")
            `,
            backgroundSize: "cover",
            backgroundPosition: "center 48%",
            backgroundRepeat: "no-repeat",
            flexShrink: 0,
          }}
        />

        {/* PANEL DEL FORMULARIO */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "center",
            px: { xs: 2.5, sm: 4, md: 4, lg: 6 },
            pt: { xs: 0, sm: 0, md: 4 },
            pb: { xs: 4, sm: 5, md: 4 },
            mt: { xs: -2, sm: -3, md: 0 },
            position: "relative",
            zIndex: 1,
            background: { xs: "transparent", md: "#F7FCF9" },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 490,
              p: {
                xs: 3,
                sm: 4,
                md: 3.5,
                lg: 4.5,
              },
              borderRadius: { xs: "24px", sm: "26px", md: 5 },
              background: "#FFFFFF",
              border: "1px solid #D8EDE0",
              boxShadow: {
                xs: "0 12px 35px rgba(15,70,40,0.09)",
                md: "0 12px 40px rgba(15,70,40,0.05)",
              },
            }}
          >
            {/* ENCABEZADO */}
            <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4 } }}>
              {/* Logo solo en PC, como en el diseño original */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  width: 86,
                  height: 86,
                  borderRadius: "25px",
                  background: "#16A34A",
                  margin: "0 auto",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontWeight: 900,
                  boxShadow: "0 10px 24px rgba(22,163,74,0.2)",
                }}
              >
                COMA
              </Box>

              <Typography
                sx={{
                  mt: { xs: 0, md: 3 },
                  fontWeight: 900,
                  color: "#17315B",
                  fontSize: { xs: 27, sm: 29, md: 31 },
                  lineHeight: 1.2,
                  letterSpacing: "-0.7px",
                }}
              >
                MANTENIMIENTO
                <br />
                COMA SA
              </Typography>

      
<Typography
  sx={{
    mt: 1.5,
    color: "#718198",
    fontSize: { xs: 17, sm: 15, md: 14 },
    lineHeight: 1.6,
  }}
>
  Ingrese sus datos para continuar
</Typography>

            </Box>

            {/* USUARIO */}
            <Typography
              sx={{
                mb: 1,
                fontWeight: 700,
                fontSize: { xs: 18, sm: 14, md: 14  },
                color: "#17315B",
              }}
            >
              Usuario
            </Typography>

            <TextField
              fullWidth
              type="email"
              placeholder="ejemplo@coma.com.ar"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              onKeyDown={manejarEnter}
              disabled={cargando}
              autoComplete="username"
              sx={estilosCampo}
            />

            {/* CONTRASEÑA */}
            <Typography
              sx={{
                mb: 1,
                fontWeight: 700,
                fontSize: { xs: 18, sm: 14, md: 14  },
                color: "#17315B",
              }}
            >
              Contraseña
            </Typography>

            <TextField
              fullWidth
              type={mostrarPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              onKeyDown={manejarEnter}
              disabled={cargando}
              autoComplete="current-password"
              sx={estilosCampo}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        mostrarPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      edge="end"
                      disabled={cargando}
                    >
                      {mostrarPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* ERROR */}
            {error && (
              <Box
                role="alert"
                sx={{
                  mb: 2.5,
                  p: 1.5,
                  borderRadius: 2.5,
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                }}
              >
                <Typography
                  sx={{
                    color: "#B91C1C",
                    fontSize: 13,
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
                cargando ? (
                  <CircularProgress size={19} color="inherit" />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              sx={{
                py: 1.8,
                minHeight: { xs: 60, sm: 58 },
                borderRadius: "12px",
                background: "#119B4A",
                fontSize: { xs: 17, sm: 16 },
                fontWeight: 800,
                boxShadow: "0 8px 20px rgba(22,163,74,0.18)",
                "&:hover": {
                  background: "#15803D",
                  boxShadow: "0 10px 25px rgba(22,163,74,0.25)",
                },
                "&.Mui-disabled": {
                  background: "#86C99D",
                  color: "#FFFFFF",
                },
              }}
            >
              {cargando ? "Verificando..." : "Continuar"}
            </Button>

            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
                color: "#94A3B8",
                fontSize: { xs: 13, sm: 12 },
              }}
            >
              Acceso exclusivo para operadores
            </Typography>

            <Typography
              sx={{
                mt: 1,
                textAlign: "center",
                color: "#A3B1C2",
                fontSize: 11,
              }}
            >
              COMA SA · Sistema de mantenimiento
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
