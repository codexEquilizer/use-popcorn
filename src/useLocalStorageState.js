import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  // const [watched, setWatched] = useState([]);
  // NOTE: A state can accept a callback function, but the function should be pure. This function will only execute on initial render.
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key));
    return storedValue || initialState;
    // return storedValue ? storedValue : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
