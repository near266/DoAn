import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import { muiTheme } from '@/core';

const MuiProvider = ({ emotionCache, children }) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={muiTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MuiProvider;
