import { ReactRoutes } from 'routes';
import { Theme, GlobalStyles } from 'themes';

export const App = () => {
  return (
    <Theme>
      <GlobalStyles />
      <ReactRoutes />
    </Theme>
  );
};
