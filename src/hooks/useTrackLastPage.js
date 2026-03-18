import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useTrackLastPage() {
  const location = useLocation();

  useEffect(() => {
    // Track all pages except the home page
    if (location.pathname !== "/") {
      localStorage.setItem("lastVisitedPage", location.pathname);
    }
  }, [location.pathname]);
}
