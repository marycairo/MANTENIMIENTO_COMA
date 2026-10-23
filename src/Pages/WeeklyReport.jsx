
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

// ======================================================
// 1. URL PARA CONSULTAR LOS INTERNOS DEL OPERADOR
// ======================================================

const ENDPOINT_INTERNOS =
  "https://default56df1b06d1b74f83a8dcdb4e6ad0ab.79.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/31/workflows/850a0f14a32349aab8f885b3840a4d9e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DoP6rQVb-q7-T_LX1j4pi2s_2J6XyVP_BtwqCEkYAV4";

// ======================================================
// 2. URL PARA ENVIAR EL REPORTE SEMANAL
// ======================================================

const ENDPOINT_REPORTE_SEMANAL =
  "https://default56df1b06d1b74f83a8dcdb4e6ad0ab.79.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/20/workflows/6451c8083ec244c4b70cc8603976172a/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=12KZJdWQIww-HYQQR7-HjaXYSJQjdA5cQb6ceSgQvTA";

// ======================================================
// 3. COMPONENTE
// ======================================================

export default function WeeklyReport() {
  const navigate = useNavigate();

  const dni = localStorage.getItem("dni") || "";
  const correo = localStorage.getItem("correo") || "";

  // ====================================================
  // DATOS DEL FORMULARIO
  // ====================================================

  const [formulario, setFormulario] = useState({
    interno: "",
    equipo: "",
    marca: "",
    modelo: "",
    codigoObra: "",
    nombreObra: "",
    motivo: "",
    obra: "",
    observaciones: ""
  });

  // ====================================================
  // INTERNOS DEL OPERADOR
  // ====================================================

  const [internos, setInternos] = useState([]);
  const [cargandoInternos, setCargandoInternos] = useState(false);
  const [errorInternos, setErrorInternos] = useState("");

  // ====================================================
  // FOTOGRAFÍA Y ENVÍO
  // ====================================================

  const [imagen, setImagen] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [lecturaHorometro, setLecturaHorometro] = useState("");


  // ====================================================
  // OBTENER INTERNOS DESDE POWER AUTOMATE
  // ====================================================

  useEffect(() => {
    const obtenerInternos = async () => {
      if (!dni) {
        setErrorInternos("No se encontró el DNI del operador.");
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
          body: JSON.stringify({ dni })
        });

        if (!respuesta.ok) {
          throw new Error(
            `Power Automate respondió con código ${respuesta.status}`
          );
        }

        const datos = await respuesta.json();

        const lista = Array.isArray(datos.internos)
          ? datos.internos
          : [];

        setInternos(lista);

        if (lista.length === 0) {
          setErrorInternos(
            "Este operador no tiene internos asignados."
          );
        }
      } catch (error) {
        console.error("Error cargando internos:", error);

        setErrorInternos(
          "No se pudieron cargar los internos. Verifique la conexión con el sistema."
        );
      } finally {
        setCargandoInternos(false);
      }
    };

    obtenerInternos();
  }, [dni]);

  // ====================================================
  // CAMBIAR CAMPOS Y SELECCIONAR INTERNO
  // ====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "interno") {
      const seleccionado = internos.find((item) => {
        const numero =
          item.interno ??
          item.Interno ??
          item.intern ??
          item.id ??
          item;

        return String(numero) === String(value);
      });

      if (!seleccionado) {
        setFormulario((prev) => ({
          ...prev,
          interno: value,
          equipo: "",
          marca: "",
          modelo: "",
          codigoObra: "",
          nombreObra: "",
          obra: ""
        }));

        return;
      }

      const numero =
        seleccionado.interno ??
        seleccionado.Interno ??
        seleccionado.intern ??
        seleccionado.id ??
        seleccionado;

      const nombreObra =
        seleccionado.nombreObra ??
        seleccionado.NombreObra ??
        seleccionado.obra ??
        seleccionado.Obra ??
        "";

      setFormulario((prev) => ({
        ...prev,
        interno: String(numero),
        equipo:
          seleccionado.equipo ??
          seleccionado.Equipo ??
          "",
        marca:
          seleccionado.marca ??
          seleccionado.Marca ??
          "",
        modelo:
          seleccionado.modelo ??
          seleccionado.Modelo ??
          "",
        codigoObra:
          seleccionado.codigoObra ??
          seleccionado.CodigoObra ??
          "",
        nombreObra,
        obra: nombreObra
      }));

      return;
    }

    setFormulario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ====================================================
  // SELECCIONAR FOTOGRAFÍA DEL HORÓMETRO
  // ====================================================

  const handleImagen = (e) => {
    const archivo = e.target.files?.[0];

    if (archivo) {
      setImagen(archivo);
    }

    // Permite volver a seleccionar el mismo archivo.
    e.target.value = "";
  };

  // ====================================================
  // ELIMINAR FOTOGRAFÍA
  // ====================================================

  const eliminarImagen = () => {
    setImagen(null);
  };

  // ====================================================
  // CONVERTIR IMAGEN A BASE64
  // ====================================================

  const convertirImagenBase64 = (archivo) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const resultado = reader.result;

        if (typeof resultado !== "string") {
          reject(
            new Error("No se pudo leer la fotografía.")
          );
          return;
        }

        resolve(resultado.split(",")[1]);
      };

      reader.onerror = () => {
        reject(
          new Error("Error leyendo la fotografía.")
        );
      };

      reader.readAsDataURL(archivo);
    });

  // ====================================================
  // ENVIAR REPORTE SEMANAL A POWER AUTOMATE
  // ====================================================

  const enviarReporte = async () => {
    if (enviando) {
      return;
    }

    // -----------------------------------------------
    // VALIDACIONES
    // -----------------------------------------------

    if (!dni) {
      alert("No se encontró el DNI del operador.");
      return;
    }

    if (!formulario.interno) {
      alert("Seleccione un interno.");
      return;
    }

    if (!imagen) {
      alert("Cargue una fotografía del horómetro.");
      return;
    }
    if (

  lecturaHorometro.trim() === "" ||
  !Number.isFinite(Number(lecturaHorometro)) ||
  Number(lecturaHorometro) < 0
) {
  alert("Ingrese una lectura válida del horómetro.");
  return;
}

    if (
      !ENDPOINT_REPORTE_SEMANAL ||
      ENDPOINT_REPORTE_SEMANAL ===
        "PEGAR_AQUI_EL_LINK_DE_POWER_AUTOMATE"
    ) {
      alert(
        "Falta configurar el enlace de Power Automate para el reporte semanal."
      );
      return;
    }

    setEnviando(true);

    try {
      // ---------------------------------------------
      // CONVERTIR FOTOGRAFÍA
      // ---------------------------------------------

      const contenido =
        await convertirImagenBase64(imagen);

      // ---------------------------------------------
      // DATOS ENVIADOS A POWER AUTOMATE
      // Se conservan los campos del reporte semanal.
      // ---------------------------------------------

      const datosReporte = {
        dni,
        correo,
        interno: String(formulario.interno),
        equipo: formulario.equipo,
        marca: formulario.marca,
        modelo: formulario.modelo,
        codigoObra: formulario.codigoObra,
        nombreObra: formulario.nombreObra,
        motivo: formulario.motivo.trim(),
        obra: formulario.obra.trim(),
        observaciones: formulario.observaciones.trim(),
        lecturaHorometro: Number(lecturaHorometro),

        fotoHorometro: {
          nombre: imagen.name || "horometro.jpg",
          contenido
        }
      };

      console.log(
        "================================="
      );

      console.log(
        "DATOS ENVIADOS AL REPORTE SEMANAL:"
      );

      console.log(
        JSON.stringify(datosReporte, null, 2)
      );

      console.log(
        "================================="
      );

      // ---------------------------------------------
      // ENVIAR SOLICITUD
      // ---------------------------------------------

      const respuesta = await fetch(
        ENDPOINT_REPORTE_SEMANAL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosReporte)
        }
      );

      if (!respuesta.ok) {
        const detalle = await respuesta.text();

        console.error(
          "Respuesta de Power Automate:",
          detalle
        );

        throw new Error(
          `Power Automate respondió con código ${respuesta.status}`
        );
      }

      console.log(
        "Reporte semanal enviado correctamente."
      );

      alert("✅ Reporte semanal enviado correctamente.");

      navigate("/home");
    } catch (error) {
      console.error(
        "Error enviando reporte semanal:",
        error
      );

      alert(
        "❌ No se pudo enviar el reporte semanal. Verifique la conexión con el sistema e inténtelo nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  // ====================================================
  // ESTILOS COMPARTIDOS DE LOS CAMPOS
  // ====================================================

  const estiloCampo = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      background: "#F8FAFC",
      transition: "all .2s ease",

      "&:hover": {
        background: "#F1F5F9"
      },

      "&.Mui-focused": {
        background: "#FFFFFF"
      },

      "&.Mui-focused fieldset": {
        borderColor: "#16A34A",
        borderWidth: 2
      }
    },

    "& .MuiFormHelperText-root": {
      ml: 0.5
    }
  };

  // ====================================================
  // ENCABEZADO DE SECCIÓN
  // ====================================================

  const encabezadoSeccion = (numero, titulo, subtitulo) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 3
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          minWidth: 34,
          borderRadius: "10px",
          background: "#F0FDF4",
          color: "#16A34A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 14
        }}
      >
        {numero}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1F2937",
            lineHeight: 1.2
          }}
        >
          {titulo}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "#64748B",
            mt: 0.3
          }}
        >
          {subtitulo}
        </Typography>
      </Box>
    </Box>
  );

  // ====================================================
  // INTERFAZ
  // ====================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F4FAF7",
        px: 2,
        py: 3,
        boxSizing: "border-box"
      }}
    >
      {/* ================================================
          ENCABEZADO PRINCIPAL
      ================================================ */}

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
        {/* CÍRCULOS DECORATIVOS */}

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

        {/* NAVEGACIÓN */}

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

        {/* TÍTULO */}

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

        {/* OPERADOR */}

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

      {/* ================================================
          DATOS DEL OPERADOR
      ================================================ */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #DDEDE4",
          mb: 3,
          background: "#FFFFFF"
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
          sx={estiloCampo}
        />
      </Paper>

      {/* ================================================
          01 — EQUIPO
      ================================================ */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5
          },
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          mb: 3,
          background: "#FFFFFF"
        }}
      >
        {encabezadoSeccion(
          "01",
          "Equipo",
          "Seleccione el equipo cuyo horómetro desea registrar"
        )}

        {/* SELECTOR DE INTERNO */}

        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
              mb: 1
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
              ...estiloCampo,

              "& .MuiOutlinedInput-root": {
                ...estiloCampo["& .MuiOutlinedInput-root"],
                minHeight: 56
              }
            }}
          >
            <MenuItem value="">
              {cargandoInternos
                ? "Cargando internos..."
                : "Seleccione un interno"}
            </MenuItem>

            {internos.map((item, index) => {
              const numero =
                item.interno ??
                item.Interno ??
                item.intern ??
                item.id ??
                item;

              return (
                <MenuItem
                  key={`${String(numero)}-${index}`}
                  value={String(numero)}
                >
                  Interno {String(numero)}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>

        {/* TARJETA DEL EQUIPO SELECCIONADO */}

        {formulario.interno && (
          <Box
            sx={{
              mt: 3,
              borderRadius: 3.5,
              border: "1px solid #DDEDE4",
              overflow: "hidden",
              background: "#F8FAFC"
            }}
          >
            {/* CABECERA DEL EQUIPO */}

            <Box
              sx={{
                p: {
                  xs: 2.5,
                  sm: 3
                },
                background:
                  "linear-gradient(135deg, #F0FDF4 0%, #F8FAFC 100%)",
                borderBottom: "1px solid #E2E8F0"
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#16A34A",
                  letterSpacing: 1,
                  textTransform: "uppercase"
                }}
              >
                Equipo seleccionado
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 21,
                    sm: 23
                  },
                  fontWeight: 750,
                  color: "#1F2937",
                  mt: 0.6,
                  overflowWrap: "anywhere"
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
                  border: "1px solid #DDEDE4"
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#475569"
                  }}
                >
                  Interno {formulario.interno}
                </Typography>
              </Box>
            </Box>

            {/* INFORMACIÓN DEL EQUIPO */}

            <Box
              sx={{
                p: {
                  xs: 2.5,
                  sm: 3
                }
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "repeat(4, 1fr)"
                  },
                  gap: 2
                }}
              >
                {[
                  ["Marca", formulario.marca],
                  ["Modelo", formulario.modelo],
                  ["Código", formulario.codigoObra],
                  ["Obra", formulario.nombreObra]
                ].map(([etiqueta, valor]) => (
                  <Box key={etiqueta}>
                    <Typography
                      sx={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        letterSpacing: 0.5
                      }}
                    >
                      {etiqueta}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#334155",
                        overflowWrap: "anywhere"
                      }}
                    >
                      {valor || "-"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      {/* ================================================
          02 — DATOS DEL REPORTE
      ================================================ */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5
          },
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          mb: 3,
          background: "#FFFFFF"
        }}
      >
        {encabezadoSeccion(
          "02",
          "Datos del reporte",
          "Complete la información correspondiente al registro semanal"
        )}

        {/* MOTIVO */}

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
              mb: 1
            }}
          >
            Motivo de la carga (si corresponde)
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            name="motivo"
            value={formulario.motivo}
            onChange={handleChange}
            placeholder="Indique el motivo de la carga, si corresponde..."
            sx={estiloCampo}
          />
        </Box>

        {/* OBSERVACIONES */}

        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
              mb: 1
            }}
          >
            Observaciones
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            name="observaciones"
            value={formulario.observaciones}
            onChange={handleChange}
            placeholder="Escriba las observaciones que correspondan..."
            sx={estiloCampo}
          />
        </Box>
      </Paper>

      {/* ================================================
          03 — EVIDENCIA
      ================================================ */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5
          },
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          mb: 4,
          background: "#FFFFFF"
        }}
      >
        {encabezadoSeccion(
          "03",
          "Evidencia",
          "Adjunte una fotografía clara del horómetro del equipo"
        )}

        <Typography
          sx={{
            fontSize: 13,
            color: "#64748B",
            mb: 2
          }}
        >
          La fotografía debe mostrar claramente la lectura actual del horómetro.
        </Typography>

        {/* BOTÓN PARA CARGAR FOTO */}

        {!imagen && (
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
                background: "#DCFCE7"
              }
            }}
          >
            Adjuntar/Subir foto del horómetro

            <input
              hidden
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImagen}
            />
          </Button>
        )}

        {/* PREVISUALIZACIÓN DE LA FOTO */}

        {imagen && (
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 350,
                margin: "0 auto",
                aspectRatio: "1 / 1",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                background: "#F8FAFC"
              }}
            >
              <Box
                component="img"
                src={URL.createObjectURL(imagen)}
                alt="Fotografía del horómetro"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }}
              />

              <Button
                onClick={eliminarImagen}
                aria-label="Eliminar fotografía"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  minWidth: 32,
                  width: 32,
                  height: 32,
                  p: 0,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.65)",
                  color: "#FFFFFF",
                  fontSize: 18,

                  "&:hover": {
                    background: "rgba(0,0,0,0.8)"
                  }
                }}
              >
                ×
              </Button>
            </Box>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: 12,
                color: "#16A34A",
                mt: 1.5,
                fontWeight: 600,
                overflowWrap: "anywhere"
              }}
            >
              ✓ Fotografía cargada: {imagen.name}
            </Typography>

            {/* PERMITE CAMBIAR LA FOTO */}

            <Button
              component="label"
              fullWidth
              variant="outlined"
              startIcon={<PhotoCameraIcon />}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 14,
                borderColor: "#BBF7D0",
                color: "#15803D",
                background: "#F0FDF4",

                "&:hover": {
                  borderColor: "#86EFAC",
                  background: "#DCFCE7"
                }
              }}
            >
              Cambiar fotografía

              <input
                hidden
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImagen}
              />
            </Button>


            {/* LECTURA A REGISTRAR */}
            
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#334155",
                  mb: 1.2
                }}
              >
                Lectura a registrar (h)
              </Typography>
            
              <TextField
                fullWidth
                type="number"
                name="lecturaHorometro"
                value={lecturaHorometro}
                onChange={(e) => setLecturaHorometro(e.target.value)}
                placeholder="Ej.: 1250.5"
                inputProps={{
                  min: 0,
                  step: "any"
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#FFFFFF",
                    minHeight: 56,
                    fontSize: 16
                  },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#16A34A",
                    borderWidth: 2
                  }
                }}
              />
            </Box>
            
          </Box>
        )}
      </Paper>

      {/* ================================================
          BOTÓN ENVIAR
      ================================================ */}

      <Button
        fullWidth
        variant="contained"
        onClick={enviarReporte}
        disabled={
          !formulario.interno ||
          cargandoInternos ||
          enviando
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
          },

          "&.Mui-disabled": {
            background: "#BBF7D0",
            color: "#FFFFFF"
          }
        }}
      >
        {enviando
          ? "Enviando reporte..."
          : "Enviar reporte semanal"}
      </Button>
    </Box>
  );
}
