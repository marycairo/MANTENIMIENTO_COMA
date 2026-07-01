import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import  {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function ReportForm() {

  const navigate = useNavigate();

  const dni = localStorage.getItem("dni") || "";

  const [formulario, setFormulario] = useState({

    interno: "",
    equipo: "",
    obra: "",
    horas: "",

    sistema: "",
    criticidad: "",
    detenido: "",

    descripcion: ""

  });

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

  {/* Fondo */}

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
    Nueva solicitud
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
    Reporte de novedades
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

      <Typography
        sx={{
          fontWeight: 700
        }}
      >
        {dni}
      </Typography>
    </Box>

  </Box>

</Paper>

      {/* OPERADOR */}

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
  sx={{
    fontWeight: 700,
    mb: 2,
    color: "#1F2937",
    fontSize: 18
  }}
>
  Datos del operador
</Typography>

<TextField
  fullWidth
  value={dni}
  disabled
  placeholder="DNI"
  InputProps={{
    readOnly: true
  }}
/>


      </Paper>

      {/* EQUIPO */}

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

          mb={3}

        >

          Información del equipo

        </Typography>

        <TextField

          fullWidth

          label="Equipo"

          name="equipo"

          value={formulario.equipo}

          onChange={handleChange}

          placeholder="Ej. XCMG QY70K"

          sx={{ mb: 2 }}

        />

        <TextField

          fullWidth

          label="Interno"

          name="interno"

          value={formulario.interno}

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

          label="Horas del equipo"

          name="horas"

          value={formulario.horas}

          onChange={handleChange}

          type="number"

        />

      </Paper>
            {/* INFORMACIÓN DE LA FALLA */}

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
          mb={3}
        >
          Información de la falla
        </Typography>

        <TextField
          select
          fullWidth
          label="Sistema afectado"
          name="sistema"
          value={formulario.sistema}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Seleccione...</MenuItem>
          <MenuItem value="Motor">Motor</MenuItem>
          <MenuItem value="Hidráulico">Hidráulico</MenuItem>
          <MenuItem value="Eléctrico">Eléctrico</MenuItem>
          <MenuItem value="Neumáticos">Neumáticos</MenuItem>
          <MenuItem value="Pluma">Pluma</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Criticidad"
          name="criticidad"
          value={formulario.criticidad}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Seleccione...</MenuItem>
          <MenuItem value="Alta">Alta</MenuItem>
          <MenuItem value="Media">Media</MenuItem>
          <MenuItem value="Baja">Baja</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="¿El equipo quedó detenido?"
          name="detenido"
          value={formulario.detenido}
          onChange={handleChange}
        >
          <MenuItem value="">Seleccione...</MenuItem>
          <MenuItem value="Sí">Sí</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>

      </Paper>

      {/* DESCRIPCIÓN */}

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
          Descripción de la novedad
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          placeholder="Describa detalladamente la falla detectada..."
        />

      </Paper>

      {/* ADJUNTOS */}

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
          Fotografías
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
          Agregar fotografías

          <input
            hidden
            type="file"
            multiple
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

        Enviar solicitud

      </Button>

    </Box>

  );

}