import { Grid, Box, Typography } from '@mui/material';
import { DemoRequestCard } from './DemoRequestCard';
import SchoolIcon from '@mui/icons-material/School';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

interface DemoRequest {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'pending' | 'approved' | 'scheduled' | 'completed';
  requestedDate: string;
  icon?: React.ReactNode;
  category: 'upcoming' | 'current' | 'past';
  demoDate?: string;
}

const mockDemos: DemoRequest[] = [
  // Upcoming demos
  {
    id: '1',
    title: 'AI-Powered Analytics Platform',
    department: 'Data Science Team',
    description: 'Advanced machine learning analytics tool that provides real-time insights and predictive modeling capabilities for enterprise data.',
    status: 'scheduled',
    requestedDate: 'Nov 15, 2025',
    demoDate: 'Dec 10, 2025',
    icon: <InsightsIcon fontSize="large" />,
    category: 'upcoming',
  },
  {
    id: '6',
    title: 'Mobile App Suite',
    department: 'Mobile Development',
    description: 'Cross-platform mobile application framework supporting iOS and Android with real-time synchronization.',
    status: 'approved',
    requestedDate: 'Nov 22, 2025',
    demoDate: 'Dec 15, 2025',
    icon: <SchoolIcon fontSize="large" />,
    category: 'upcoming',
  },
  // Current demos
  {
    id: '2',
    title: 'Cloud Infrastructure Dashboard',
    department: 'DevOps Division',
    description: 'Comprehensive cloud management solution with monitoring, logging, and automated deployment features across multiple regions.',
    status: 'scheduled',
    requestedDate: 'Nov 18, 2025',
    demoDate: 'Nov 25, 2025',
    icon: <StorageIcon fontSize="large" />,
    category: 'current',
  },
  {
    id: '7',
    title: 'Real-Time Collaboration Tool',
    department: 'Product Team',
    description: 'Unified platform for team communication with video, chat, screen sharing, and document collaboration features.',
    status: 'scheduled',
    requestedDate: 'Nov 20, 2025',
    demoDate: 'Nov 26, 2025',
    icon: <QueryBuilderIcon fontSize="large" />,
    category: 'current',
  },
  // Past demos
  {
    id: '3',
    title: 'Learning Management System',
    department: 'Education Department',
    description: 'Next-generation LMS platform designed for remote and hybrid learning with integrated collaboration tools and assessments.',
    status: 'completed',
    requestedDate: 'Nov 10, 2025',
    demoDate: 'Nov 20, 2025',
    icon: <SchoolIcon fontSize="large" />,
    category: 'past',
  },
  {
    id: '4',
    title: 'Advanced Reporting Engine',
    department: 'Business Intelligence',
    description: 'Sophisticated data visualization and reporting platform enabling custom dashboards and automated report generation.',
    status: 'completed',
    requestedDate: 'Nov 05, 2025',
    demoDate: 'Nov 18, 2025',
    icon: <InsightsIcon fontSize="large" />,
    category: 'past',
  },
];

interface DemoCategoryProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  demos: DemoRequest[];
}

const DemoCategory: React.FC<DemoCategoryProps> = ({ title, subtitle, icon, color, demos }) => {
  return (
    <Box sx={{ marginBottom: '60px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: `2px solid ${color}`,
          animation: 'slideInLeft 0.6s ease-out',
          '@keyframes slideInLeft': {
            from: {
              opacity: 0,
              transform: 'translateX(-20px)',
            },
            to: {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
        }}
      >
        <Box
          sx={{
            color: color,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#555555',
              margin: 0,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {demos.map((demo, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={demo.id}
            sx={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <DemoRequestCard {...demo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const DemoCategorized: React.FC = () => {
  const upcomingDemos = mockDemos.filter((d) => d.category === 'upcoming');
  const currentDemos = mockDemos.filter((d) => d.category === 'current');
  const pastDemos = mockDemos.filter((d) => d.category === 'past');

  return (
    <Box sx={{ padding: '0' }}>
      {/* Upcoming Demos */}
      {upcomingDemos.length > 0 && (
        <DemoCategory
          title="Upcoming Demos"
          subtitle={`${upcomingDemos.length} demo${upcomingDemos.length !== 1 ? 's' : ''} scheduled`}
          icon={<EventIcon sx={{ fontSize: '2rem' }} />}
          color="#0097a7"
          demos={upcomingDemos}
        />
      )}

      {/* Current/This Week Demos */}
      {currentDemos.length > 0 && (
        <DemoCategory
          title="This Week"
          subtitle={`${currentDemos.length} demo${currentDemos.length !== 1 ? 's' : ''} happening now`}
          icon={<QueryBuilderIcon sx={{ fontSize: '2rem' }} />}
          color="#ff9800"
          demos={currentDemos}
        />
      )}

      {/* Past Demos */}
      {pastDemos.length > 0 && (
        <DemoCategory
          title="Completed"
          subtitle={`${pastDemos.length} demo${pastDemos.length !== 1 ? 's' : ''} successfully showcased`}
          icon={<CheckCircleIcon sx={{ fontSize: '2rem' }} />}
          color="#4caf50"
          demos={pastDemos}
        />
      )}
    </Box>
  );
};
