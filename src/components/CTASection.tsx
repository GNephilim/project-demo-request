import { Box, Container, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface CTA {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ctaItems: CTA[] = [
  {
    icon: <CheckCircleIcon sx={{ fontSize: '2.5rem', color: '#0097a7' }} />,
    title: 'Submit Your Request',
    description: 'Fill out a simple form with details about your project or application.',
  },
  {
    icon: <ScheduleIcon sx={{ fontSize: '2.5rem', color: '#0097a7' }} />,
    title: 'Get Scheduled',
    description: 'Our team reviews submissions and schedules approved demos.',
  },
  {
    icon: <ThumbUpIcon sx={{ fontSize: '2.5rem', color: '#0097a7' }} />,
    title: 'Showcase Your Work',
    description: 'Present your demo to stakeholders and team members.',
  },
];

export const CTASection: React.FC = () => {
  return (
    <Box sx={{ padding: '60px 24px' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            marginBottom: '48px',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
          }}
        >
          How It Works
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {ctaItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                padding: '32px',
                backgroundColor: '#f5f7fa',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#eff5f9',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {item.icon}
              </Box>
              <Typography variant="h5" sx={{ marginBottom: '12px', fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555555', lineHeight: 1.6 }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
              padding: '12px 40px',
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #162d4a 0%, #1e3a5f 100%)',
              },
            }}
          >
            Request a Demo Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
