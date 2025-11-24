import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DemoDetailsModalProps {
  open: boolean;
  onClose: () => void;
  demo?: {
    id: string;
    title: string;
    department: string;
    description: string;
    status: 'pending' | 'approved' | 'scheduled' | 'completed';
    requestedDate: string;
    demoDate?: string;
    submitterName?: string;
    submitterEmail?: string;
    targetAudience?: string;
    projectUrl?: string;
    additionalNotes?: string;
    submittedDepartment?: string;
    sponsor?: string;
    sponsorEmail?: string;
    programmingLanguages?: string;
    databaseType?: string;
    githubRepoLink?: string;
  };
}

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: '#fff3cd', color: '#856404', label: 'Pending Review' },
  approved: { bg: '#d4edda', color: '#155724', label: 'Approved' },
  scheduled: { bg: '#cce5ff', color: '#004085', label: 'Scheduled' },
  completed: { bg: '#e2e3e5', color: '#383d41', label: 'Completed' },
};

export const DemoDetailsModal: React.FC<DemoDetailsModalProps> = ({ open, onClose, demo }) => {
  if (!demo) return null;

  const statusInfo = statusColors[demo.status];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
            fontSize: '1.25rem',
          }}
        >
          Demo Request Details
        </Box>
        <Button
          onClick={onClose}
          sx={{
            minWidth: 'unset',
            padding: '8px',
            color: '#888888',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ padding: '32px' }}>
        {/* Title and Status Section */}
        <Box sx={{ marginBottom: '32px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              {demo.title}
            </Typography>
            <Chip
              label={statusInfo.label}
              sx={{
                backgroundColor: statusInfo.bg,
                color: statusInfo.color,
                fontWeight: 600,
              }}
            />
          </Box>
          <Typography variant="body1" sx={{ color: '#555555', lineHeight: 1.6 }}>
            {demo.description}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: '32px' }} />

        {/* App Metadata */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            color: '#888888',
          }}
        >
          App Metadata
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Project/App Title"
              value={demo.title}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department/Team"
              value={demo.department}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Description"
              value={demo.description}
              disabled
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Submitter Name"
              value={demo.submitterName || 'John Smith'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Email"
              value={demo.submitterEmail || 'john.smith@company.com'}
              disabled
              type="email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Target Audience"
              value={demo.targetAudience || 'Executive Leadership, Product Managers, Technical Team'}
              disabled
              multiline
              rows={2}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project URL / Link"
              value={demo.projectUrl || 'https://demo.example.com'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Notes"
              value={demo.additionalNotes || 'This demo showcases our new machine learning capabilities and performance improvements.'}
              disabled
              multiline
              rows={3}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: '32px' }} />

        {/* Technical Details */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            color: '#888888',
          }}
        >
          Technical Details
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Programming Languages"
              value={demo.programmingLanguages || 'Python, TypeScript, React'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Database Type"
              value={demo.databaseType || 'PostgreSQL'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="GitHub Repository Link"
              value={demo.githubRepoLink || 'https://github.com/company/project-repo'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: '32px' }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            color: '#888888',
          }}
        >
          Sponsorship
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Submitted Department"
              value={demo.submittedDepartment || demo.department}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Executive Sponsor"
              value={demo.sponsor || 'TBD'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sponsor Contact Email"
              value={demo.sponsorEmail || 'TBD'}
              disabled
              type="email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: '32px' }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            color: '#888888',
          }}
        >
          Demo Schedule
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Requested Date"
              value={demo.requestedDate}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Scheduled Demo Date"
              value={demo.demoDate || 'TBD'}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                  },
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  color: '#555555',
                  WebkitTextFillColor: '#555555',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                  color: '#888888',
                },
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            backgroundColor: '#f0f7fa',
            border: '1px solid #cce5ff',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <Typography variant="body2" sx={{ color: '#004085', fontWeight: 500 }}>
            Note: Demo request details cannot be modified after submission. Contact an administrator if changes are needed.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: '16px 32px', borderTop: '1px solid #e0e0e0' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#1e3a5f',
            color: '#1e3a5f',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(30, 58, 95, 0.04)',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
