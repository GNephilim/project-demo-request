import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import { SaveOutlined as SaveIcon } from '@mui/icons-material';
import type { NotificationPreferences } from '../types/notification';
import { notificationManager } from '../services/notificationManager';

interface NotificationSettingsSectionProps {
  onNavigate?: (section: string) => void;
}

export const NotificationSettingsSection: React.FC<NotificationSettingsSectionProps> = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    notificationManager.getPreferences()
  );
  const [saved, setSaved] = useState(false);

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: any) => {
    setPreferences({ ...preferences, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    notificationManager.updatePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <Typography
        variant="h2"
        sx={{
          marginBottom: '12px',
          fontWeight: 700,
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
        }}
      >
        Notification Settings
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#555555',
          fontSize: '1.025rem',
          marginBottom: '48px',
        }}
      >
        Configure how and when you receive notifications
      </Typography>

      {saved && (
        <Alert
          severity="success"
          sx={{
            marginBottom: '24px',
            borderRadius: '8px',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            color: '#2e7d32',
          }}
        >
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notification Types */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <CardContent sx={{ padding: '24px' }}>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '20px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                Notification Types
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.demoRequestAlerts}
                      onChange={(e) =>
                        handlePreferenceChange('demoRequestAlerts', e.target.checked)
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#0097a7',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        Demo Request Alerts
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#999999' }}>
                        Get notified when new demo requests are submitted
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.userActivityAlerts}
                      onChange={(e) =>
                        handlePreferenceChange('userActivityAlerts', e.target.checked)
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#0097a7',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        User Activity Alerts
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#999999' }}>
                        Get notified about user logins and activities
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.systemAlerts}
                      onChange={(e) => handlePreferenceChange('systemAlerts', e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#0097a7',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        System Alerts
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#999999' }}>
                        Get notified about system updates and maintenance
                      </Typography>
                    </Box>
                  }
                />

                <Divider sx={{ margin: '8px 0' }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences.emailNotifications}
                      onChange={(e) =>
                        handlePreferenceChange('emailNotifications', e.target.checked)
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#0097a7',
                        },
                      }}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        Email Notifications
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: '#999999' }}>
                        Receive notifications via email
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Frequency & Quiet Hours */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <CardContent sx={{ padding: '24px' }}>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '20px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                Frequency & Timing
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel>Notification Frequency</InputLabel>
                  <Select
                    value={preferences.notificationFrequency}
                    label="Notification Frequency"
                    onChange={(e) =>
                      handlePreferenceChange('notificationFrequency', e.target.value)
                    }
                  >
                    <MenuItem value="instant">Instant</MenuItem>
                    <MenuItem value="hourly">Hourly Digest</MenuItem>
                    <MenuItem value="daily">Daily Digest</MenuItem>
                    <MenuItem value="weekly">Weekly Digest</MenuItem>
                  </Select>
                </FormControl>

                <Divider />

                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.doNotDisturbEnabled}
                        onChange={(e) =>
                          handlePreferenceChange('doNotDisturbEnabled', e.target.checked)
                        }
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#0097a7',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        Do Not Disturb
                      </Typography>
                    }
                  />
                  <Typography sx={{ fontSize: '0.8rem', color: '#999999', marginLeft: '32px' }}>
                    Mute notifications during specified hours
                  </Typography>
                </Box>

                {preferences.doNotDisturbEnabled && (
                  <Box sx={{ marginLeft: '32px', display: 'flex', gap: '16px' }}>
                    <TextField
                      type="time"
                      label="Start Time"
                      value={preferences.doNotDisturbStart}
                      onChange={(e) =>
                        handlePreferenceChange('doNotDisturbStart', e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      type="time"
                      label="End Time"
                      value={preferences.doNotDisturbEnd}
                      onChange={(e) =>
                        handlePreferenceChange('doNotDisturbEnd', e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
            color: '#ffffff',
            fontWeight: 700,
            padding: '12px 32px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(30, 58, 95, 0.3)',
            },
          }}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};
