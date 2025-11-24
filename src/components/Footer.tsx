import { Box, Typography } from '@mui/material';
import { appConfig } from '../config';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
        }}
      >
        <Typography variant="body2" sx={{ color: '#888888' }}>
          {appConfig.appName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#888888',
            letterSpacing: '0.5px',
            fontWeight: 500,
          }}
        >
          v{appConfig.version}
        </Typography>
      </Box>
    </Box>
  );
};
