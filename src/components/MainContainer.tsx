import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
  maxWidth?: string;
}

export const MainContainer: React.FC<MainContainerProps> = ({ 
  children, 
  maxWidth = '1400px' 
}) => {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        maxWidth: maxWidth,
        margin: '0 auto',
        padding: '0 32px',
        minHeight: 'calc(100vh - 100px)',
      }}
    >
      {children}
    </Box>
  );
};
