import { useHistory } from 'react-router';
import { ROUTE_NAMES } from './Router';

export const useRouter = () => {
  const history = useHistory();
  const goTo = (path: string) => {
    if (!ROUTE_NAMES.includes(path)) {
      throw new Error(`Unknown route name "${path}"`);
    }

    history.push(path);
  }

  return {
    goTo
  }
};