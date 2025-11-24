import { Box, Typography, Container } from '@mui/material';

export const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
        color: '#ffffff',
        padding: '80px 24px',
        textAlign: 'center',
        marginBottom: '60px',
        borderRadius: '12px',
        marginTop: '40px',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            marginBottom: '16px',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          Request a Demo
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginBottom: '24px',
            fontSize: { xs: '0.95rem', sm: '1.125rem', md: '1.25rem' },
            fontWeight: 400,
            lineHeight: 1.6,
            opacity: 0.95,
          }}
        >
          Showcase your innovative projects and applications to our community. 
          Submit a demo request and let stakeholders experience what you've built.
        </Typography>
      </Container>
    </Box>
  );
};
