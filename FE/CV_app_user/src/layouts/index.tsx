import AppLayout from './app';
import { SnackbarProvider } from '@/shared/snackbar';

const Layout = ({ component, children }) => {
  return (
    <SnackbarProvider>
      {component.hideLayout ? <>{children}</> : <AppLayout>{children}</AppLayout>}
    </SnackbarProvider>
  );
};

export default Layout;
