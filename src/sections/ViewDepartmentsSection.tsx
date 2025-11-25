import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

type TeamMember = { userId: number; isSponsor?: boolean };

type Department = {
  id: number;
  name: string;
  head: string;
  contact: string;
  teamMembers: TeamMember[];
  description: string;
  status: string;
};

type User = { id: number; name: string; email: string; department?: string; role?: string };

export const ViewDepartmentsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active'>('all');

  const availableUsers: User[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'IT' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Sales' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', department: 'IT' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'Product' },
    { id: 5, name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com', department: 'Sales' },
    { id: 6, name: 'Jessica Lee', email: 'jessica.lee@company.com', department: 'Operations' },
    { id: 7, name: 'David Wilson', email: 'david.wilson@company.com', department: 'Product' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'IT' },
  ];

  const [departments] = useState<Department[]>([
    {
      id: 1,
      name: 'IT',
      head: 'John Smith',
      contact: 'john.smith@company.com',
      teamMembers: [{ userId: 1, isSponsor: false }, { userId: 3, isSponsor: false }, { userId: 8, isSponsor: true }],
      description: 'Information Technology department',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sales',
      head: 'Sarah Johnson',
      contact: 'sarah.johnson@company.com',
      teamMembers: [{ userId: 2, isSponsor: true }, { userId: 5, isSponsor: false }],
      description: 'Sales and business development',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Operations',
      head: 'Mike Chen',
      contact: 'mike.chen@company.com',
      teamMembers: [{ userId: 6, isSponsor: false }],
      description: 'Operations and process management',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Product',
      head: 'Emily Davis',
      contact: 'emily.davis@company.com',
      teamMembers: [{ userId: 4, isSponsor: true }, { userId: 7, isSponsor: false }],
      description: 'Product development and management',
      status: 'Active',
    },
  ]);

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dept.status === 'Active';
    return matchesSearch && matchesStatus;
  });

  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
            Company Departments
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.95rem', marginBottom: '24px' }}>
            Explore our departments and connect with team members
          </Typography>

          <Grid container spacing={2} sx={{ marginBottom: '24px' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Search departments by name or head..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#999' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Button
                variant={filterStatus === 'all' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setFilterStatus('all')}
                sx={{
                  background: filterStatus === 'all' ? 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' : 'transparent',
                  color: filterStatus === 'all' ? '#ffffff' : '#0097a7',
                  borderColor: '#0097a7',
                  textTransform: 'none',
                }}
              >
                All Departments
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setFilterStatus('active')}
                sx={{
                  background: filterStatus === 'active' ? 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' : 'transparent',
                  color: filterStatus === 'active' ? '#ffffff' : '#0097a7',
                  borderColor: '#0097a7',
                  textTransform: 'none',
                }}
              >
                Active Only
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          {filteredDepartments.map((dept: Department) => {
            const deptMembers = dept.teamMembers
              .map((tm: TeamMember) => ({ ...availableUsers.find(u => u.id === tm.userId), isSponsor: tm.isSponsor }))
              .filter((m: any) => m.id);
            const sponsors = deptMembers.filter(m => m.isSponsor);
            const regularMembers = deptMembers.filter(m => !m.isSponsor);

            return (
              <Grid item xs={12} sm={6} md={4} key={dept.id}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    {/* Department Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0097a7', marginBottom: '4px' }}>
                          {dept.name}
                        </Typography>
                        <Chip
                          label={dept.status}
                          size="small"
                          sx={{ backgroundColor: '#4caf5020', color: '#4caf50', fontSize: '0.7rem', height: '20px' }}
                        />
                      </Box>
                    </Box>

                    {/* Description */}
                    {dept.description && (
                      <Typography sx={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>
                        {dept.description}
                      </Typography>
                    )}

                    {/* Head and Contact */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f0f0f0', paddingTop: '12px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>Head:</Typography>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
                          {dept.head}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>Contact:</Typography>
                        <Button
                          size="small"
                          startIcon={<EmailIcon sx={{ fontSize: '0.9rem' }} />}
                          onClick={() => handleContactClick(dept.contact)}
                          sx={{
                            fontSize: '0.75rem',
                            color: '#0097a7',
                            textTransform: 'none',
                            padding: '2px 8px',
                            '&:hover': { backgroundColor: '#0097a708' },
                          }}
                        >
                          {dept.contact}
                        </Button>
                      </Box>
                    </Box>

                    {/* Team Members Display */}
                    {deptMembers.length > 0 && (
                      <Box sx={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', flex: 1 }}>
                        {sponsors.length > 0 && (
                          <Box sx={{ marginBottom: '12px' }}>
                            <Typography sx={{ fontSize: '0.75rem', color: '#999', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>
                              Sponsors
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {sponsors.map((member: any) => (
                                <Chip
                                  key={member.id}
                                  label={member.name}
                                  size="small"
                                  icon={<EmailIcon />}
                                  onClick={() => handleContactClick(member.email)}
                                  sx={{
                                    fontSize: '0.65rem',
                                    height: '22px',
                                    backgroundColor: '#fff3e0',
                                    color: '#ff9800',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    '& .MuiChip-icon': { fontSize: '0.8rem', marginLeft: '2px' },
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}

                        {regularMembers.length > 0 && (
                          <Box>
                            <Typography sx={{ fontSize: '0.75rem', color: '#999', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase' }}>
                              Team Members
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {regularMembers.map((member: any) => (
                                <Chip
                                  key={member.id}
                                  label={member.name}
                                  size="small"
                                  icon={<EmailIcon />}
                                  onClick={() => handleContactClick(member.email)}
                                  sx={{
                                    fontSize: '0.65rem',
                                    height: '22px',
                                    backgroundColor: '#e3f2fd',
                                    color: '#0097a7',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    '& .MuiChip-icon': { fontSize: '0.8rem', marginLeft: '2px' },
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}

                    {deptMembers.length === 0 && (
                      <Typography sx={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic', paddingTop: '8px' }}>
                        No team members assigned
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {filteredDepartments.length === 0 && (
          <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', textAlign: 'center', padding: '40px' }}>
            <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>
              {searchQuery ? 'No departments match your search.' : 'No departments available.'}
            </Typography>
          </Card>
        )}

        <Box sx={{ marginTop: '32px', textAlign: 'center', color: '#999' }}>
          <Typography sx={{ fontSize: '0.85rem' }}>
            Showing {filteredDepartments.length} of {departments.length} department{departments.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
