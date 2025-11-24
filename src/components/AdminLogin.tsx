import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Person } from '@mui/icons-material';

interface AdminLoginProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (adminName: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ open, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState({ username: false, password: false });

  const validCredentials = [
    { username: 'admin', password: 'admin123' },
    { username: 'demo', password: 'demo123' },
  ];

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isValid = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValid) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminName', username);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      onLoginSuccess(username);
      handleClose();
    } else {
      setError('Invalid username or password. Try admin/admin123 or demo/demo123');
      setPassword('');
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setRememberMe(false);
    setError('');
    setIsFocused({ username: false, password: false });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <DialogContent sx={{ padding: '48px 40px' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              backgroundColor: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
              borderRadius: '12px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(30, 58, 95, 0.3)',
            }}
          >
            <Lock sx={{ fontSize: '32px', color: '#ffffff' }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#888888', fontSize: '0.95rem' }}>
            Sign in to manage demo requests
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: '32px', backgroundColor: 'rgba(0, 0, 0, 0.08)' }} />

        {error && (
          <Box
            sx={{
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Box sx={{ width: '4px', height: '100%', backgroundColor: '#d32f2f', borderRadius: '2px' }} />
            <Typography variant="body2" sx={{ color: '#c62828', fontSize: '0.9rem' }}>
              {error}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleLogin}>
          <Box sx={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, username: true })}
              onBlur={() => setIsFocused({ ...isFocused, username: false })}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: isFocused.username ? '#0097a7' : '#888888', transition: 'color 0.2s ease' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    '& fieldset': { borderColor: '#0097a7', borderWidth: '2px' },
                  },
                  '& fieldset': { borderColor: '#ddd' },
                },
                '& .MuiInputLabel-root': {
                  color: '#888888',
                  '&.Mui-focused': { color: '#0097a7' },
                },
              }}
            />
          </Box>

          <Box sx={{ marginBottom: '16px' }}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: isFocused.password ? '#0097a7' : '#888888', transition: 'color 0.2s ease' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      disabled={isLoading}
                      sx={{ color: '#888888', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    '& fieldset': { borderColor: '#0097a7', borderWidth: '2px' },
                  },
                  '& fieldset': { borderColor: '#ddd' },
                },
                '& .MuiInputLabel-root': {
                  color: '#888888',
                  '&.Mui-focused': { color: '#0097a7' },
                },
              }}
            />
          </Box>

          <Box sx={{ marginBottom: '32px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  sx={{ color: '#ccc', '&.Mui-checked': { color: '#0097a7' } }}
                />
              }
              label={<Typography variant="body2" sx={{ color: '#666' }}>Remember me</Typography>}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading || !username || !password}
            sx={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5aa0 100%)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '12px 24px',
              borderRadius: '8px',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover:not(:disabled)': {
                background: 'linear-gradient(135deg, #162d4a 0%, #1e3a5f 100%)',
                boxShadow: '0 12px 24px rgba(30, 58, 95, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': { opacity: 0.7 },
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <Box
          sx={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#f0f7fa',
            border: '1px solid #cce5ff',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: '#004085', fontWeight: 500 }}>
            Demo Credentials:
          </Typography>
          <Typography variant="caption" sx={{ color: '#004085', display: 'block', marginTop: '4px' }}>
            <strong>admin</strong> / admin123 or <strong>demo</strong> / demo123
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
