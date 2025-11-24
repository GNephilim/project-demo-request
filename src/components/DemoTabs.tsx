import { Box, Tabs, Tab, Grid, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DemoRequestCard } from './DemoRequestCard';
import SchoolIcon from '@mui/icons-material/School';
import StorageIcon from '@mui/icons-material/Storage';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
  submittedDepartment?: string;
  sponsor?: string;
  sponsorEmail?: string;
  programmingLanguages?: string;
  databaseType?: string;
  githubRepoLink?: string;
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
    submittedDepartment: 'Data Science',
    sponsor: 'Dr. James Patterson',
    sponsorEmail: 'james.patterson@company.com',
    programmingLanguages: 'Python, TensorFlow, FastAPI',
    databaseType: 'PostgreSQL with Vector Extensions',
    githubRepoLink: 'https://github.com/company/ai-analytics-platform',
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
    submittedDepartment: 'Mobile Development',
    sponsor: 'Sarah Chen',
    sponsorEmail: 'sarah.chen@company.com',
  },
  {
    id: '8',
    title: 'Enterprise CRM System',
    department: 'Sales Engineering',
    description: 'Comprehensive customer relationship management platform with advanced analytics and automation workflows.',
    status: 'approved',
    requestedDate: 'Nov 21, 2025',
    demoDate: 'Dec 12, 2025',
    icon: <SchoolIcon fontSize="large" />,
    category: 'upcoming',
    submittedDepartment: 'Sales Engineering',
    sponsor: 'Michael Torres',
    sponsorEmail: 'michael.torres@company.com',
  },
  {
    id: '9',
    title: 'DevOps Automation Suite',
    department: 'Infrastructure',
    description: 'End-to-end automation platform for CI/CD pipelines and infrastructure provisioning.',
    status: 'scheduled',
    requestedDate: 'Nov 19, 2025',
    demoDate: 'Dec 08, 2025',
    icon: <StorageIcon fontSize="large" />,
    category: 'upcoming',
    submittedDepartment: 'Infrastructure',
    sponsor: 'Robert Kim',
    sponsorEmail: 'robert.kim@company.com',
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
    submittedDepartment: 'DevOps Division',
    sponsor: 'Elizabeth Martinez',
    sponsorEmail: 'elizabeth.martinez@company.com',
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
    submittedDepartment: 'Product',
    sponsor: 'David Anderson',
    sponsorEmail: 'david.anderson@company.com',
  },
  {
    id: '10',
    title: 'Data Warehouse Solution',
    department: 'Analytics',
    description: 'Scalable data warehouse with support for petabyte-scale analytics and real-time data processing.',
    status: 'scheduled',
    requestedDate: 'Nov 17, 2025',
    demoDate: 'Nov 27, 2025',
    icon: <StorageIcon fontSize="large" />,
    category: 'current',
    submittedDepartment: 'Analytics',
    sponsor: 'Jennifer Lee',
    sponsorEmail: 'jennifer.lee@company.com',
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
    submittedDepartment: 'Education',
    sponsor: 'Mark Wilson',
    sponsorEmail: 'mark.wilson@company.com',
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
    submittedDepartment: 'Business Intelligence',
    sponsor: 'Amanda Jackson',
    sponsorEmail: 'amanda.jackson@company.com',
  },
  {
    id: '5',
    title: 'Security Compliance Platform',
    department: 'Information Security',
    description: 'Comprehensive security and compliance management tool with automated auditing and threat detection capabilities.',
    status: 'completed',
    requestedDate: 'Nov 08, 2025',
    demoDate: 'Nov 16, 2025',
    icon: <CheckCircleIcon fontSize="large" />,
    category: 'past',
    submittedDepartment: 'Information Security',
    sponsor: 'Christopher Brown',
    sponsorEmail: 'christopher.brown@company.com',
  },
  {
    id: '11',
    title: 'Performance Monitoring Suite',
    department: 'Operations',
    description: 'Real-time application performance monitoring with predictive analytics and alerting.',
    status: 'completed',
    requestedDate: 'Nov 02, 2025',
    demoDate: 'Nov 12, 2025',
    icon: <TrendingUpIcon fontSize="large" />,
    category: 'past',
    submittedDepartment: 'Operations',
    sponsor: 'Lisa Rodriguez',
    sponsorEmail: 'lisa.rodriguez@company.com',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`demo-tabpanel-${index}`}
      aria-labelledby={`demo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

interface DemoTabsProps {
  showViewAll?: boolean;
}

export const DemoTabs: React.FC<DemoTabsProps> = ({ showViewAll = true }) => {
  const [tabValue, setTabValue] = useState(0);

  const upcomingDemos = mockDemos.filter((d) => d.category === 'upcoming');
  const currentDemos = mockDemos.filter((d) => d.category === 'current');
  const pastDemos = mockDemos.filter((d) => d.category === 'past');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderDemoGrid = (demos: DemoRequest[]) => {
    const displayedDemos = demos.slice(0, 3);
    const hasMore = demos.length > 3;

    return (
      <>
        <Grid container spacing={3}>
          {displayedDemos.map((demo, index) => (
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

        {hasMore && showViewAll && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: '#1e3a5f',
                color: '#1e3a5f',
                fontWeight: 600,
                padding: '10px 32px',
                '&:hover': {
                  backgroundColor: 'rgba(30, 58, 95, 0.04)',
                  borderColor: '#0097a7',
                  color: '#0097a7',
                },
              }}
            >
              View All {demos.length} Demos
            </Button>
          </Box>
        )}
      </>
    );
  };

  const tabs = [
    { label: `Upcoming (${upcomingDemos.length})`, demos: upcomingDemos },
    { label: `This Week (${currentDemos.length})`, demos: currentDemos },
    { label: `Completed (${pastDemos.length})`, demos: pastDemos },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '#e0e0e0', marginBottom: '0' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="demo request tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#888888',
              padding: '16px 24px',
              minWidth: '160px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#1e3a5f',
                backgroundColor: 'rgba(30, 58, 95, 0.04)',
              },
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#1e3a5f',
              fontWeight: 700,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1e3a5f',
              height: '3px',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} id={`demo-tab-${index}`} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={tabValue} index={index}>
          {tab.demos.length > 0 ? (
            renderDemoGrid(tab.demos)
          ) : (
            <Box sx={{ textAlign: 'center', padding: '40px 20px' }}>
              <Typography variant="body1" sx={{ color: '#888888' }}>
                No demos in this category yet.
              </Typography>
            </Box>
          )}
        </TabPanel>
      ))}
    </Box>
  );
};
