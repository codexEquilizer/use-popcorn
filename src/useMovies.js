import { useEffect, useState } from "react";

const API = "cd52b243";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(""); // Reseting the error
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res || !res.ok) throw new Error("Something went wrong!");
        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    // cleanup fn
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
