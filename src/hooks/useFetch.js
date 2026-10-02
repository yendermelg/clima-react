import { useState, useEffect } from "react";

export function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setDatos(null);
      setCargando(false);
      setError(null);
      return;
    }

    const controlador = new AbortController();

    async function pedir() {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await fetch(url, { signal: controlador.signal });

        if (!respuesta.ok) {
          throw new Error("Error " + respuesta.status);
        }

        const json = await respuesta.json();
        setDatos(json);
        setCargando(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setCargando(false);
      }
    }

    pedir();

    return () => controlador.abort();
  }, [url]);

  return { datos, cargando, error };
}