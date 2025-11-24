import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  departments,
  programmingLanguages,
  databaseTypes,
  targetAudiences,
  getSponsorsByDepartment,
} from '../mockData';

interface RequestDemoModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  projectTitle: string;
  department: string;
  description: string;
  targetAudience: string;
  projectUrl: string;
  programmingLanguages: string[];
  databaseType: string;
  githubRepoLink: string;
  submitterName: string;
  submitterEmail: string;
  additionalNotes: string;
  sponsor: string;
  sponsorEmail: string;
}

interface FormErrors {
  [key: string]: string;
}

export const RequestDemoModal: React.FC<RequestDemoModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    projectTitle: '',
    department: '',
    description: '',
    targetAudience: '',
    projectUrl: '',
    programmingLanguages: [],
    databaseType: '',
    githubRepoLink: '',
    submitterName: '',
    submitterEmail: '',
    additionalNotes: '',
    sponsor: '',
    sponsorEmail: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableSponsors, setAvailableSponsors] = useState<any[]>([]);

  const requiredFields = ['projectTitle', 'department', 'description', 'submitterName', 'submitterEmail'];

  // When department changes, fetch available sponsors
  useEffect(() => {
    if (formData.department) {
      const sponsors = getSponsorsByDepartment(formData.department);
      setAvailableSponsors(sponsors);
      // Reset sponsor selection when department changes
      setFormData((prev) => ({
        ...prev,
        sponsor: '',
        sponsorEmail: '',
      }));
    } else {
      setAvailableSponsors([]);
    }
  }, [formData.department]);

  // When sponsor changes, populate email
  const handleSponsorChange = (sponsorId: string) => {
    const sponsor = availableSponsors.find((s) => s.id === sponsorId);
    setFormData((prev) => ({
      ...prev,
      sponsor: sponsorId,
      sponsorEmail: sponsor?.email || '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check required fields
    requiredFields.forEach((field) => {
      if (!formData[field as keyof FormData]?.toString().trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Validate email
    if (formData.submitterEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitterEmail)) {
      newErrors.submitterEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleMultiSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success state
    setIsSuccess(true);

    // Auto close after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setFormData({
      projectTitle: '',
      department: '',
      description: '',
      targetAudience: '',
      projectUrl: '',
      programmingLanguages: [],
      databaseType: '',
      githubRepoLink: '',
      submitterName: '',
      submitterEmail: '',
      additionalNotes: '',
      sponsor: '',
      sponsorEmail: '',
    });
    setErrors({});
    setIsLoading(false);
    setIsSuccess(false);
    setAvailableSponsors([]);
    onClose();
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fafafa',
      '&.Mui-focused': {
        backgroundColor: '#ffffff',
        '& fieldset': {
          borderColor: '#0097a7',
          borderWidth: '2px',
        },
      },
      '& fieldset': {
        borderColor: '#ddd',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#0097a7',
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          Request a Demo
        </Box>
        <Button
          onClick={handleClose}
          disabled={isLoading}
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
        {isSuccess ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              textAlign: 'center',
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: '64px',
                color: '#4caf50',
                marginBottom: '16px',
                animation: 'scaleIn 0.5s ease-out',
                '@keyframes scaleIn': {
                  '0%': { transform: 'scale(0)', opacity: 0 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '8px',
              }}
            >
              Demo Request Submitted!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555555',
                lineHeight: 1.6,
              }}
            >
              Thank you for submitting your demo request. Our team will review it and contact you shortly to schedule a demo.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* App Information Section */}
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
              App Information
            </Typography>

            <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Project/App Title"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  error={!!errors.projectTitle}
                  helperText={errors.projectTitle}
                  disabled={isLoading}
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.department} disabled={isLoading}>
                  <InputLabel sx={{ color: errors.department ? '#d32f2f' : undefined }}>Department/Team *</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleSelectChange}
                    label="Department/Team *"
                    sx={{
                      backgroundColor: '#fafafa',
                      '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#0097a7',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select a department</em>
                    </MenuItem>
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.department && <Typography variant="caption" sx={{ color: '#d32f2f', mt: 1 }}>{errors.department}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  disabled={isLoading}
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={isLoading}>
                  <InputLabel>Target Audience</InputLabel>
                  <Select
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleSelectChange}
                    label="Target Audience"
                    sx={{
                      backgroundColor: '#fafafa',
                      '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#0097a7',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select audience</em>
                    </MenuItem>
                    {targetAudiences.map((aud) => (
                      <MenuItem key={aud.id} value={aud.id}>
                        {aud.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Project URL"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="https://example.com"
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginBottom: '32px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />

            {/* Technical Details Section */}
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
                <FormControl fullWidth disabled={isLoading}>
                  <InputLabel>Programming Languages</InputLabel>
                  <Select
                    multiple
                    name="programmingLanguages"
                    value={formData.programmingLanguages}
                    onChange={handleMultiSelectChange}
                    label="Programming Languages"
                    sx={{
                      backgroundColor: '#fafafa',
                      '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#0097a7',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                      },
                    }}
                  >
                    {programmingLanguages.map((lang) => (
                      <MenuItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={isLoading}>
                  <InputLabel>Database Type</InputLabel>
                  <Select
                    name="databaseType"
                    value={formData.databaseType}
                    onChange={handleSelectChange}
                    label="Database Type"
                    sx={{
                      backgroundColor: '#fafafa',
                      '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#0097a7',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select database type</em>
                    </MenuItem>
                    {databaseTypes.map((db) => (
                      <MenuItem key={db.id} value={db.id}>
                        {db.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="GitHub Repository Link"
                  name="githubRepoLink"
                  value={formData.githubRepoLink}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="https://github.com/username/repo"
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginBottom: '32px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />

            {/* Sponsorship Section */}
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
                <FormControl fullWidth disabled={isLoading || !formData.department}>
                  <InputLabel>Sponsor</InputLabel>
                  <Select
                    name="sponsor"
                    value={formData.sponsor}
                    onChange={(e) => handleSponsorChange(e.target.value)}
                    label="Sponsor"
                    sx={{
                      backgroundColor: '#fafafa',
                      '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#0097a7',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select a sponsor</em>
                    </MenuItem>
                    {availableSponsors.map((sponsor) => (
                      <MenuItem key={sponsor.id} value={sponsor.id}>
                        {sponsor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sponsor Email"
                  name="sponsorEmail"
                  value={formData.sponsorEmail}
                  disabled
                  variant="outlined"
                  sx={{
                    ...textFieldSx,
                    '& .MuiOutlinedInput-root.Mui-disabled': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ marginBottom: '32px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />

            {/* Submitter Information Section */}
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
              Submitter Information
            </Typography>

            <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="submitterName"
                  value={formData.submitterName}
                  onChange={handleInputChange}
                  error={!!errors.submitterName}
                  helperText={errors.submitterName}
                  disabled={isLoading}
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="submitterEmail"
                  type="email"
                  value={formData.submitterEmail}
                  onChange={handleInputChange}
                  error={!!errors.submitterEmail}
                  helperText={errors.submitterEmail}
                  disabled={isLoading}
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>

            {/* Required Fields Info */}
            <Box
              sx={{
                backgroundColor: '#f0f7fa',
                border: '1px solid #cce5ff',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
              }}
            >
              <Typography variant="caption" sx={{ color: '#004085', fontWeight: 500 }}>
                * Required fields
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleClose}
                disabled={isLoading}
                variant="outlined"
                sx={{
                  borderColor: '#ddd',
                  color: '#555555',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover:not(:disabled)': {
                    background: 'linear-gradient(135deg, #162d4a 0%, #1e3a5f 100%)',
                  },
                  '&:disabled': { opacity: 0.7 },
                }}
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
