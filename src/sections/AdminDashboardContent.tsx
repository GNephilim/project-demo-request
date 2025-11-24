import { Box, Container, Grid, Card, CardContent, Typography, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ClockIcon,
  Warning as AlertCircleIcon,
  Group as UsersIcon,
  Description as FileTextIcon,
} from '@mui/icons-material';
import { BreadcrumbNav } from '../components/Breadcrumbs';

interface DashboardStatsProps {
  onNavigate?: (section: string) => void;
}

const StatCard = ({ title, value, icon, color, subtext }: any) => (
  <Card
    sx={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: `1px solid ${color}20`,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-2px)',
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#666666',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '4px',
            }}
          >
            {value}
          </Typography>
          {subtext && (
            <Typography
              sx={{
                fontSize: '0.8rem',
                color: '#888888',
              }}
            >
              {subtext}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: '56px',
            height: '56px',
            backgroundColor: `${color}15`,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const recentDemos = [
  { id: 1, title: 'AI-Powered Analytics', department: 'Sales', status: 'scheduled', date: '2025-11-25' },
  { id: 2, title: 'Cloud Migration Tool', department: 'Operations', status: 'approved', date: '2025-11-24' },
  { id: 3, title: 'E-commerce Platform', department: 'Product Dev', status: 'pending', date: '2025-11-23' },
  { id: 4, title: 'HR Management System', department: 'HR', status: 'completed', date: '2025-11-22' },
  { id: 5, title: 'Data Visualization', department: 'Finance', status: 'scheduled', date: '2025-11-21' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return '#4caf50';
    case 'approved':
      return '#2196f3';
    case 'scheduled':
      return '#ff9800';
    case 'pending':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
    case 'approved':
      return <CheckCircleIcon sx={{ fontSize: '1rem' }} />;
    case 'scheduled':
      return <ClockIcon sx={{ fontSize: '1rem' }} />;
    case 'pending':
      return <AlertCircleIcon sx={{ fontSize: '1rem' }} />;
  }
};

export const AdminDashboardContent: React.FC<DashboardStatsProps> = ({ onNavigate }) => {
  const breadcrumbs = [{ label: 'Admin' }];

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: '32px 24px',
        backgroundColor: '#f5f7fa',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Page Header */}
        <Box sx={{ marginBottom: '32px' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '8px',
            }}
          >
            Admin Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              fontSize: '1rem',
            }}
          >
            Welcome back! Here's a summary of your demo request system.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Requests"
              value="142"
              icon={<FileTextIcon sx={{ fontSize: '1.8rem' }} />}
              color="#0097a7"
              subtext="+12 this month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Scheduled Demos"
              value="34"
              icon={<ClockIcon sx={{ fontSize: '1.8rem' }} />}
              color="#ff9800"
              subtext="8 this week"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Completed"
              value="89"
              icon={<CheckCircleIcon sx={{ fontSize: '1.8rem' }} />}
              color="#4caf50"
              subtext="62.7% success rate"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Active Users"
              value="24"
              icon={<UsersIcon sx={{ fontSize: '1.8rem' }} />}
              color="#2196f3"
              subtext="Across 6 departments"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Pending Approvals"
              value="12"
              icon={<AlertCircleIcon sx={{ fontSize: '1.8rem' }} />}
              color="#f44336"
              subtext="Require immediate attention"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="System Health"
              value="98%"
              icon={<TrendingUpIcon sx={{ fontSize: '1.8rem' }} />}
              color="#4caf50"
              subtext="All systems operational"
            />
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Recent Demos */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  padding: '24px',
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                  }}
                >
                  Recent Demo Requests
                </Typography>
                <Button
                  size="small"
                  sx={{
                    color: '#0097a7',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 151, 167, 0.08)',
                    },
                  }}
                  onClick={() => onNavigate?.('demo-dashboard')}
                >
                  View All →
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#666666', fontSize: '0.9rem' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#666666', fontSize: '0.9rem' }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#666666', fontSize: '0.9rem' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#666666', fontSize: '0.9rem' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentDemos.map((demo) => (
                      <TableRow
                        key={demo.id}
                        sx={{
                          '&:hover': { backgroundColor: '#f8f9fa' },
                          borderBottom: '1px solid #e0e0e0',
                        }}
                      >
                        <TableCell sx={{ color: '#1a1a1a', fontWeight: 500 }}>{demo.title}</TableCell>
                        <TableCell sx={{ color: '#666666' }}>{demo.department}</TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(demo.status)}
                            label={demo.status.charAt(0).toUpperCase() + demo.status.slice(1)}
                            size="small"
                            sx={{
                              backgroundColor: `${getStatusColor(demo.status)}15`,
                              color: getStatusColor(demo.status),
                              fontWeight: 600,
                              fontSize: '0.8rem',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#666666', fontSize: '0.9rem' }}>{demo.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* System Status */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Box sx={{ padding: '24px' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '16px',
                  }}
                >
                  System Status
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#666666', fontWeight: 500 }}>
                        Database
                      </Typography>
                      <Chip label="Healthy" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={99}
                      sx={{
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4caf50',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#666666', fontWeight: 500 }}>
                        API Response
                      </Typography>
                      <Chip label="Fast" size="small" sx={{ backgroundColor: '#2196f320', color: '#2196f3', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={95}
                      sx={{
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#666666', fontWeight: 500 }}>
                        Storage Used
                      </Typography>
                      <Chip label="45%" size="small" sx={{ backgroundColor: '#ff980020', color: '#ff9800', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={45}
                      sx={{
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#ff9800',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
