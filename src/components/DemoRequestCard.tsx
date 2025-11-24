import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { DemoDetailsModal } from './DemoDetailsModal';

interface DemoRequestCardProps {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'pending' | 'approved' | 'scheduled' | 'completed';
  requestedDate: string;
  demoDate?: string;
  icon?: React.ReactNode;
  submittedDepartment?: string;
  sponsor?: string;
  sponsorEmail?: string;
  programmingLanguages?: string;
  databaseType?: string;
  githubRepoLink?: string;
}

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: '#fff3cd', color: '#856404', label: 'Pending Review' },
  approved: { bg: '#d4edda', color: '#155724', label: 'Approved' },
  scheduled: { bg: '#cce5ff', color: '#004085', label: 'Scheduled' },
  completed: { bg: '#e2e3e5', color: '#383d41', label: 'Completed' },
};

export const DemoRequestCard: React.FC<DemoRequestCardProps> = ({
  id,
  title,
  department,
  description,
  status,
  requestedDate,
  demoDate,
  icon,
  submittedDepartment,
  sponsor,
  sponsorEmail,
  programmingLanguages,
  databaseType,
  githubRepoLink,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusInfo = statusColors[status];

  const demoData = {
    id,
    title,
    department,
    description,
    status,
    requestedDate,
    demoDate,
    submittedDepartment,
    sponsor,
    sponsorEmail,
    programmingLanguages,
    databaseType,
    githubRepoLink,
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(30, 58, 95, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          transition: 'left 0.5s ease',
          ...(isHovered && { left: '100%' }),
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, padding: '24px', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          {icon && (
            <Box
              sx={{
                marginRight: '12px',
                display: 'flex',
                color: '#2c5aa0',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              {icon}
            </Box>
          )}
          <Typography variant="h5" sx={{ fontWeight: 600, flex: 1 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#0097a7',
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {department}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: '#555555',
            marginBottom: '16px',
            lineHeight: 1.6,
            minHeight: '48px',
          }}
        >
          {description}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#888888',
              fontSize: '0.85rem',
            }}
          >
            Requested: {requestedDate}
          </Typography>
          {demoDate && (
            <Typography
              variant="body2"
              sx={{
                color: '#0097a7',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              Demo: {demoDate}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Box
            sx={{
              backgroundColor: statusInfo.bg,
              color: statusInfo.color,
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            {statusInfo.label}
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{
            width: '100%',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.6s, height 0.6s',
            },
            '&:hover::before': {
              width: '300px',
              height: '300px',
            },
            '&:hover': {
              background: 'linear-gradient(135deg, #162d4a 0%, #1e3a5f 100%)',
            },
          }}
        >
          View Details
        </Button>

        <DemoDetailsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} demo={demoData} />
      </CardContent>
    </Card>
  );
};
