import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {children}
    </Box>
  );
};
