import { Grid, Box } from '@mui/material';
import { DemoRequestCard } from './DemoRequestCard';
import SchoolIcon from '@mui/icons-material/School';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';

interface DemoRequest {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'pending' | 'approved' | 'scheduled' | 'completed';
  requestedDate: string;
  icon?: React.ReactNode;
}

const mockDemos: DemoRequest[] = [
  {
    id: '1',
    title: 'AI-Powered Analytics Platform',
    department: 'Data Science Team',
    description: 'Advanced machine learning analytics tool that provides real-time insights and predictive modeling capabilities for enterprise data.',
    status: 'scheduled',
    requestedDate: 'Nov 15, 2025',
    icon: <InsightsIcon fontSize="large" />,
  },
  {
    id: '2',
    title: 'Cloud Infrastructure Dashboard',
    department: 'DevOps Division',
    description: 'Comprehensive cloud management solution with monitoring, logging, and automated deployment features across multiple regions.',
    status: 'approved',
    requestedDate: 'Nov 18, 2025',
    icon: <StorageIcon fontSize="large" />,
  },
  {
    id: '3',
    title: 'Learning Management System',
    department: 'Education Department',
    description: 'Next-generation LMS platform designed for remote and hybrid learning with integrated collaboration tools and assessments.',
    status: 'pending',
    requestedDate: 'Nov 20, 2025',
    icon: <SchoolIcon fontSize="large" />,
  },
];

export const DemoGallery: React.FC = () => {
  return (
    <Box sx={{ padding: '0' }}>
      <Grid container spacing={3}>
        {mockDemos.map((demo) => (
          <Grid item xs={12} sm={6} md={4} key={demo.id}>
            <DemoRequestCard {...demo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
