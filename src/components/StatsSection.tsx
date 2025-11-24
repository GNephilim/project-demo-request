import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: color,
        },
      }}
    >
      <CardContent sx={{ padding: '24px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#888888',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                fontSize: '0.85rem',
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                fontSize: '2.5rem',
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Total Demos',
      value: '24',
      icon: <TrendingUpIcon sx={{ fontSize: '1.75rem' }} />,
      color: '#0097a7',
    },
    {
      label: 'Active Teams',
      value: '8',
      icon: <GroupIcon sx={{ fontSize: '1.75rem' }} />,
      color: '#2c5aa0',
    },
    {
      label: 'Successfully Showcased',
      value: '18',
      icon: <CheckCircleIcon sx={{ fontSize: '1.75rem' }} />,
      color: '#4caf50',
    },
  ];

  return (
    <Box sx={{ marginBottom: '48px' }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
