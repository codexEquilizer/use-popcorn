import { useEffect } from "react";

export function useKey(keyName, action) {
  // Clearing Movie details on keypress
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === keyName.toLowerCase()) {
        action();
        console.log("CLOSING");
      }
    };

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [action, keyName]);
}
