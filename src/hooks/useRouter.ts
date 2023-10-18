 
import { useHistory } from "react-router";
import { entries } from "../helpers/object";
import { ROUTE_NAMES } from "../Router";

export const useRouter = () => {
  const history = useHistory();

  const goTo = (path: string) => {
    if (!ROUTE_NAMES.includes(path)) {
      throw new Error(`Unknown route name "${path}"`);
    }

    history.push(path);
  };

  const resetSearch = () => {
    if(location.search) {
      setSearch({});
    }
  };
  const setSearch = (params: Record<string, string | boolean | number>) => {
    if(location.search) {
      const search = entries(params).map(([key, value]) => `${key}=${value}`).join("&");
      location.search = search ? "" : `?${search}`;
    }
  };

  return {
    goTo,
    resetSearch,
    setSearch
  };
};