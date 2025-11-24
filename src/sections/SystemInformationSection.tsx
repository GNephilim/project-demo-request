import { Box, Card, CardContent, Typography, LinearProgress, Chip, Grid, Container } from '@mui/material';
import { BreadcrumbNav } from '../components/Breadcrumbs';

interface SystemInformationSectionProps {
  onNavigate?: (section: string) => void;
}

export const SystemInformationSection: React.FC<SystemInformationSectionProps> = ({ onNavigate }) => {
  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'System Information' },
  ];

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
            System Information
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              fontSize: '1rem',
            }}
          >
            Monitor system health and performance metrics.
          </Typography>
        </Box>

        {/* System Status Grid */}
        <Grid container spacing={3}>
          {/* System Health Overview */}
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <CardContent sx={{ padding: '32px' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '24px',
                  }}
                >
                  System Health
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Database Status */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.95rem', color: '#1a1a1a', fontWeight: 600 }}>
                        Database
                      </Typography>
                      <Chip label="Healthy" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={99}
                      sx={{
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4caf50',
                        },
                      }}
                    />
                    <Typography sx={{ fontSize: '0.85rem', color: '#888888', marginTop: '8px' }}>
                      Uptime: 99% | Response: 45ms
                    </Typography>
                  </Box>

                  {/* API Response Status */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.95rem', color: '#1a1a1a', fontWeight: 600 }}>
                        API Response
                      </Typography>
                      <Chip label="Fast" size="small" sx={{ backgroundColor: '#2196f320', color: '#2196f3', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={95}
                      sx={{
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#2196f3',
                        },
                      }}
                    />
                    <Typography sx={{ fontSize: '0.85rem', color: '#888888', marginTop: '8px' }}>
                      Avg Response: 120ms | 99.95% Success Rate
                    </Typography>
                  </Box>

                  {/* Storage Status */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.95rem', color: '#1a1a1a', fontWeight: 600 }}>
                        Storage Used
                      </Typography>
                      <Chip label="45%" size="small" sx={{ backgroundColor: '#ff980020', color: '#ff9800', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={45}
                      sx={{
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#ff9800',
                        },
                      }}
                    />
                    <Typography sx={{ fontSize: '0.85rem', color: '#888888', marginTop: '8px' }}>
                      2.25 TB / 5 TB Available
                    </Typography>
                  </Box>

                  {/* Memory Status */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.95rem', color: '#1a1a1a', fontWeight: 600 }}>
                        Memory Usage
                      </Typography>
                      <Chip label="62%" size="small" sx={{ backgroundColor: '#9c27b020', color: '#9c27b0', fontWeight: 600 }} />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={62}
                      sx={{
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#9c27b0',
                        },
                      }}
                    />
                    <Typography sx={{ fontSize: '0.85rem', color: '#888888', marginTop: '8px' }}>
                      62 GB / 100 GB Available
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Additional System Info */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <CardContent sx={{ padding: '24px' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '16px',
                  }}
                >
                  Version Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Application</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>v2.1.0</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Database</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>PostgreSQL 15.2</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>API Version</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>v1.2</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Node Runtime</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>Node 20.9.0</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Server Information */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <CardContent sx={{ padding: '24px' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '16px',
                  }}
                >
                  Server Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Server Name</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>prod-server-01</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Uptime</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>47 days</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Last Update</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600 }}>2025-11-20</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.9rem', color: '#666666' }}>Status</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#4caf50',
                        }}
                      />
                      <Typography sx={{ fontSize: '0.9rem', color: '#4caf50', fontWeight: 600 }}>Operational</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
