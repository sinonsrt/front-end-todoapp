import { ReactRoutes } from './routes';
import { Theme } from './themes/theme';

export const App = () => {
  return (
    <Theme>
      <ReactRoutes />
    </Theme>
  );
};
