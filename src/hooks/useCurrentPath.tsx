import { matchRoutes, useLocation } from "react-router-dom";

export interface UseCurrentPathProps {}

const TabRoutes = [
  { path: "/dashboard" },
  { path: "/add-record" },
  { path: "/records" },
];

export const useCurrentPath = (): string | undefined => {
  const location = useLocation();
  const routes = matchRoutes(TabRoutes, location);
  return routes?.[0]?.route?.path;
};

export default useCurrentPath;
