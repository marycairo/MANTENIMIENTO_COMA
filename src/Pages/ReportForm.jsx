import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import emailjs from "@emailjs/browser";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

// ======================================================
// PEGAR AQUÍ LA URL DE POWER AUTOMATE
// ======================================================

const ENDPOINT_INTERNOS = "https://default56df1b06d1b74f83a8dcdb4e6ad0ab.79.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/31/workflows/850a0f14a32349aab8f885b3840a4d9e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DoP6rQVb-q7-T_LX1j4pi2s_2J6XyVP_BtwqCEkYAV4";
// ======================================================

export default function ReportForm() {

  const navigate = useNavigate();

  const dni = localStorage.getItem("dni") || "";

  // ------------------------------------------------------
  // FORMULARIO
  // ------------------------------------------------------

  const [formulario, setFormulario] = useState({
  interno: "",
  equipo: "",
  marca: "",
  modelo: "",
  codigoObra: "",
  nombreObra: "",
  horas: "",
  sistema: "",
  criticidad: "",
  detenido: "",
  descripcion: ""
});

  // ------------------------------------------------------
  // INTERNOS DEL OPERADOR
  // ------------------------------------------------------

  const [internos, setInternos] = useState([]);

  const [cargandoInternos, setCargandoInternos] = useState(false);

  const [errorInternos, setErrorInternos] = useState("");

  // ------------------------------------------------------
  // OBTENER INTERNOS DESDE POWER AUTOMATE
  // ------------------------------------------------------

  useEffect(() => {

    const obtenerInternos = async () => {

      if (!dni) {
        setErrorInternos("No se encontró el DNI del operador.");
        return;
      }

      if (
        !ENDPOINT_INTERNOS ||
        ENDPOINT_INTERNOS === "PEGAR_AQUI_EL_ENDPOINT"
      ) {
        setErrorInternos(
          "Este usuario aún no tiene internos asignados"
        );
        return;
      }

      setCargandoInternos(true);
      setErrorInternos("");

      try {

        const respuesta = await fetch(ENDPOINT_INTERNOS, {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            dni: dni
          })

        });

        if (!respuesta.ok) {

          throw new Error(
            `Power Automate respondió con código ${respuesta.status}`
          );

        }

const datos = await respuesta.json();

console.log("Respuesta de Power Automate:", datos);

setInternos(datos.internos || []);
      } catch (error) {

        console.error(
          "Error obteniendo internos:",
          error
        );

        setErrorInternos(
          "No se pudieron cargar los internos. Verifique la conexión con el sistema."
        );

      } finally {

        setCargandoInternos(false);

      }

    };

    obtenerInternos();

  }, [dni]);

  // ------------------------------------------------------
  // CAMBIO DE CAMPOS
  // ------------------------------------------------------

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Si cambia el interno
    if (name === "interno") {

      const internoSeleccionado = internos.find(
  (item) => item.interno === value
);

      // Si encontramos los datos del interno
      if (internoSeleccionado) {

  setFormulario({
    ...formulario,

    interno: internoSeleccionado.interno,

    equipo: internoSeleccionado.equipo,

    marca: internoSeleccionado.marca,

    modelo: internoSeleccionado.modelo,

    codigoObra: internoSeleccionado.codigoObra,

    nombreObra: internoSeleccionado.nombreObra,

    horas: ""
  });



      }else {

  setFormulario({

    ...formulario,

    interno: value,

    equipo: "",
    marca: "",
    modelo: "",
    codigoObra: "",
    nombreObra: "",
    horas: ""

  });

}

      return;

    }

    setFormulario({

      ...formulario,

      [name]: value

    });

  };

  // ------------------------------------------------------
  // ENVIAR REPORTE
  // ------------------------------------------------------

  const enviarReporte = () => {

    const fecha = new Date();

    const parametros = {

      correo: localStorage.getItem("correo"),

      dni: dni,

      equipo: formulario.equipo,

      interno: formulario.interno,

      obra: formulario.obra,

      horas: formulario.horas,

      sistema: formulario.sistema,

      criticidad: formulario.criticidad,

      detenido: formulario.detenido,

      descripcion: formulario.descripcion,

      fecha: fecha.toLocaleDateString("es-AR"),

      hora: fecha.toLocaleTimeString("es-AR")

    };

    emailjs.send(

      "service_q4olojs",

      "template_pkwo1pj",

      parametros,

      "J8VbYGxQmJyTpuJWP"

    )

    .then(() => {

      alert("✅ Reporte enviado correctamente");

      navigate("/home");

    })

    .catch((error) => {

      console.log(error);

      alert("Error al enviar el reporte");

    });

  };

  // ======================================================
  // INTERFAZ
  // ======================================================

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4FAF7",
        px: 2,
        py: 3
      }}
    >

      {/* ==================================================
          HEADER
      ================================================== */}

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

      {/* ==================================================
          OPERADOR
      ================================================== */}

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

  {/* ======================================================
    01 — EQUIPO
====================================================== */}

<Paper
  elevation={0}
  sx={{
    p: { xs: 2.5, sm: 3.5 },
    borderRadius: 4,
    border: "1px solid #E2E8F0",
    mb: 3,
    background: "#FFFFFF",
  }}
>
  {/* ENCABEZADO */}

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 1,
    }}
  >
    <Box
      sx={{
        width: 34,
        height: 34,
        borderRadius: "10px",
        background: "#F0FDF4",
        color: "#16A34A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 14,
      }}
    >
      01
    </Box>

    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1F2937",
          lineHeight: 1.2,
        }}
      >
        Equipo
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "#64748B",
          mt: 0.3,
        }}
      >
        Seleccione el equipo sobre el que desea reportar
      </Typography>
    </Box>
  </Box>

  {/* SELECTOR */}

  <Box sx={{ mt: 3 }}>
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 700,
        color: "#334155",
        mb: 1,
      }}
    >
      Interno
    </Typography>

    <TextField
      select
      fullWidth
      name="interno"
      value={formulario.interno}
      onChange={handleChange}
      disabled={cargandoInternos}
      error={Boolean(errorInternos)}
      helperText={
        errorInternos
          ? errorInternos
          : cargandoInternos
            ? "Buscando internos asignados..."
            : internos.length > 0
              ? `${internos.length} interno(s) disponible(s)`
              : "No hay internos asignados"
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          background: "#F8FAFC",
          minHeight: 56,
          transition: "all .2s ease",

          "&:hover": {
            background: "#F1F5F9",
          },

          "&.Mui-focused": {
            background: "#FFFFFF",
          },
        },

        "& .MuiFormHelperText-root": {
          ml: 0.5,
        },
      }}
    >
      <MenuItem value="">
        {cargandoInternos
          ? "Cargando internos..."
          : "Seleccione un interno"}
      </MenuItem>

      {internos.map((item, index) => {
        const interno =
          item.interno ??
          item.Interno ??
          item.intern ??
          item.id ??
          item;

        return (
          <MenuItem
            key={index}
            value={String(interno)}
          >
            Interno {String(interno)}
          </MenuItem>
        );
      })}
    </TextField>
  </Box>

  {/* ==================================================
      TARJETA EQUIPO SELECCIONADO
  ================================================== */}

  {formulario.interno && (
    <Box
      sx={{
        mt: 3,
        borderRadius: 3.5,
        border: "1px solid #DDEDE4",
        overflow: "hidden",
        background: "#F8FAFC",
      }}
    >
      {/* CABECERA EQUIPO */}

      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
          background:
            "linear-gradient(135deg, #F0FDF4 0%, #F8FAFC 100%)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            color: "#16A34A",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Equipo seleccionado
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 21, sm: 23 },
            fontWeight: 750,
            color: "#1F2937",
            mt: 0.6,
          }}
        >
          {formulario.equipo || "Equipo"}
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            mt: 1,
            px: 1.5,
            py: 0.6,
            borderRadius: 2,
            background: "#FFFFFF",
            border: "1px solid #DDEDE4",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
            }}
          >
            Interno {formulario.interno}
          </Typography>
        </Box>
      </Box>

      {/* DATOS DEL EQUIPO */}

      <Box
        sx={{
          p: { xs: 2.5, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 800,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Marca
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {formulario.marca || "-"}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 800,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Modelo
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {formulario.modelo || "-"}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 800,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Código
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {formulario.codigoObra || "-"}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 800,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Obra
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {formulario.nombreObra || "-"}
            </Typography>
          </Box>
        </Box>

        {/* HORÓMETRO */}

        <Box
          sx={{
            mt: 3,
            pt: 2.5,
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
              mb: 1,
            }}
          >
            Horómetro actual
          </Typography>

          <TextField
            fullWidth
            name="horas"
            value={formulario.horas}
            onChange={handleChange}
            type="number"
            placeholder="Ej. 12450"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "#FFFFFF",
              },
            }}
          />

          <Typography
            sx={{
              fontSize: 12,
              color: "#94A3B8",
              mt: 1,
            }}
          >
            Ingrese las horas que indica actualmente el equipo.
          </Typography>
        </Box>
      </Box>
    </Box>
  )}
</Paper>


{/* ======================================================
    02 — NOVEDAD
====================================================== */}

<Paper
  elevation={0}
  sx={{
    p: { xs: 2.5, sm: 3.5 },
    borderRadius: 4,
    border: "1px solid #E2E8F0",
    mb: 3,
    background: "#FFFFFF",
  }}
>
  {/* ENCABEZADO */}

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 3,
    }}
  >
    <Box
      sx={{
        width: 34,
        height: 34,
        borderRadius: "10px",
        background: "#F0FDF4",
        color: "#16A34A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 14,
      }}
    >
      02
    </Box>

    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1F2937",
          lineHeight: 1.2,
        }}
      >
        Novedad
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "#64748B",
          mt: 0.3,
        }}
      >
        Indique qué está ocurriendo con el equipo
      </Typography>
    </Box>
  </Box>

  {/* SISTEMA */}

  <Typography
    sx={{
      fontSize: 13,
      fontWeight: 700,
      color: "#334155",
      mb: 1,
    }}
  >
    Sistema afectado
  </Typography>

  <TextField
    select
    fullWidth
    name="sistema"
    value={formulario.sistema}
    onChange={handleChange}
    sx={{
      mb: 3,
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        background: "#F8FAFC",
      },
    }}
  >
    <MenuItem value="">
      Seleccione el sistema
    </MenuItem>

    <MenuItem value="Motor">
      Motor
    </MenuItem>

    <MenuItem value="Hidráulico">
      Hidráulico
    </MenuItem>

    <MenuItem value="Eléctrico">
      Eléctrico
    </MenuItem>

    <MenuItem value="Neumáticos">
      Neumáticos
    </MenuItem>

    <MenuItem value="Pluma">
      Pluma
    </MenuItem>

    <MenuItem value="Otro">
      Otro
    </MenuItem>
  </TextField>


  {/* CRITICIDAD */}

  <Typography
    sx={{
      fontSize: 13,
      fontWeight: 700,
      color: "#334155",
      mb: 1.5,
    }}
  >
    Nivel de criticidad
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(3, 1fr)",
      },
      gap: 1.5,
      mb: 3,
    }}
  >
    {["Baja", "Media", "Alta"].map((nivel) => (
      <Button
        key={nivel}
        variant="outlined"
        onClick={() =>
          setFormulario({
            ...formulario,
            criticidad: nivel,
          })
        }
        sx={{
          py: 1.5,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 700,
          borderColor:
            formulario.criticidad === nivel
              ? "#16A34A"
              : "#E2E8F0",
          color:
            formulario.criticidad === nivel
              ? "#15803D"
              : "#64748B",
          background:
            formulario.criticidad === nivel
              ? "#F0FDF4"
              : "#FFFFFF",

          "&:hover": {
            borderColor: "#16A34A",
            background: "#F0FDF4",
          },
        }}
      >
        {nivel}
      </Button>
    ))}
  </Box>


  {/* EQUIPO DETENIDO */}

  <Box
    sx={{
      p: 2,
      borderRadius: 3,
      background: "#F8FAFC",
      border: "1px solid #E2E8F0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
    }}
  >
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: "#334155",
        }}
      >
        ¿El equipo quedó detenido?
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          color: "#94A3B8",
          mt: 0.3,
        }}
      >
        Indique si la falla impide continuar trabajando.
      </Typography>
    </Box>

    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        p: 0.5,
        borderRadius: 2.5,
        background: "#E2E8F0",
        flexShrink: 0,
      }}
    >
      {["No", "Sí"].map((opcion) => (
        <Button
          key={opcion}
          onClick={() =>
            setFormulario({
              ...formulario,
              detenido: opcion,
            })
          }
          sx={{
            minWidth: 55,
            borderRadius: 2,
            py: 0.7,
            textTransform: "none",
            fontWeight: 700,
            fontSize: 13,
            background:
              formulario.detenido === opcion
                ? "#FFFFFF"
                : "transparent",
            color:
              formulario.detenido === opcion
                ? "#16A34A"
                : "#64748B",
            boxShadow:
              formulario.detenido === opcion
                ? "0 1px 4px rgba(15,23,42,0.08)"
                : "none",

            "&:hover": {
              background: "#FFFFFF",
            },
          }}
        >
          {opcion}
        </Button>
      ))}
    </Box>
  </Box>


  {/* DESCRIPCIÓN */}

  <Box sx={{ mt: 3 }}>
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 700,
        color: "#334155",
        mb: 1,
      }}
    >
      Descripción de la novedad
    </Typography>

    <TextField
      fullWidth
      multiline
      rows={5}
      name="descripcion"
      value={formulario.descripcion}
      onChange={handleChange}
      placeholder="Describa detalladamente la falla detectada..."
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          background: "#F8FAFC",
        },
      }}
    />
  </Box>
</Paper>


{/* ======================================================
    03 — EVIDENCIA
====================================================== */}

<Paper
  elevation={0}
  sx={{
    p: { xs: 2.5, sm: 3.5 },
    borderRadius: 4,
    border: "1px solid #E2E8F0",
    mb: 4,
    background: "#FFFFFF",
  }}
>
  {/* ENCABEZADO */}

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 3,
    }}
  >
    <Box
      sx={{
        width: 34,
        height: 34,
        borderRadius: "10px",
        background: "#F0FDF4",
        color: "#16A34A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 14,
      }}
    >
      03
    </Box>

    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1F2937",
          lineHeight: 1.2,
        }}
      >
        Evidencia
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "#64748B",
          mt: 0.3,
        }}
      >
        Agregue fotografías que ayuden a identificar la falla
      </Typography>
    </Box>
  </Box>


  {/* BOTÓN FOTOGRAFÍAS */}

  <Button
    component="label"
    fullWidth
    variant="outlined"
    startIcon={<PhotoCameraIcon />}
    sx={{
      py: 2,
      borderRadius: 3,
      textTransform: "none",
      fontWeight: 700,
      fontSize: 14,
      borderColor: "#BBF7D0",
      color: "#15803D",
      background: "#F0FDF4",

      "&:hover": {
        borderColor: "#86EFAC",
        background: "#DCFCE7",
      },
    }}
  >
    Agregar fotografías

    <input
      hidden
      type="file"
      multiple
      accept="image/*"
      capture="environment"
    />
  </Button>

  <Typography
    sx={{
      textAlign: "center",
      fontSize: 12,
      color: "#94A3B8",
      mt: 1.5,
    }}
  >
    Puede seleccionar una o varias fotografías
  </Typography>
</Paper>

      {/* ==================================================
          ENVIAR
      ================================================== */}

      <Button
        fullWidth
        variant="contained"
        onClick={enviarReporte}
        disabled={
          !formulario.interno ||
          cargandoInternos
        }
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