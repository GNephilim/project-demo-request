import { Box, Container, Typography, Card, CardContent, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Autocomplete, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Checkbox, IconButton, Select, MenuItem, FormControl, InputLabel, Tab, Tabs, Paper } from '@mui/material';
import { useState } from 'react';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, FileDownload as FileDownloadIcon, Print as PrintIcon } from '@mui/icons-material';
import { BreadcrumbNav } from '../components/Breadcrumbs';
import { NotificationSettingsSection } from './NotificationSettingsSection';

export const UserManagementSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const departments = ['IT', 'Sales', 'Operations', 'Product'];
  
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'IT', isAdmin: false, isSponsor: false, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Sales', isAdmin: false, isSponsor: true, status: 'Active' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', department: 'Operations', isAdmin: false, isSponsor: false, status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'Product', isAdmin: true, isSponsor: false, status: 'Active' },
    { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', department: 'IT', isAdmin: false, isSponsor: false, status: 'Active' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'Sales', isAdmin: false, isSponsor: false, status: 'Active' },
    { id: 7, name: 'James Rodriguez', email: 'james.rodriguez@company.com', department: 'Operations', isAdmin: false, isSponsor: true, status: 'Active' },
    { id: 8, name: 'Jennifer Lee', email: 'jennifer.lee@company.com', department: 'Product', isAdmin: false, isSponsor: false, status: 'Active' },
    { id: 9, name: 'Robert Martinez', email: 'robert.martinez@company.com', department: 'IT', isAdmin: false, isSponsor: true, status: 'Active' },
    { id: 10, name: 'Michelle Taylor', email: 'michelle.taylor@company.com', department: 'Sales', isAdmin: false, isSponsor: false, status: 'Inactive' },
    { id: 11, name: 'Christopher Garcia', email: 'christopher.garcia@company.com', department: 'Operations', isAdmin: false, isSponsor: false, status: 'Active' },
    { id: 12, name: 'Amanda Brown', email: 'amanda.brown@company.com', department: 'Product', isAdmin: true, isSponsor: false, status: 'Active' },
  ]);
  
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; email: string; department: string; isAdmin: boolean; isSponsor: boolean }>({ name: '', email: '', department: '', isAdmin: false, isSponsor: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkAction, setBulkAction] = useState<string>('');
  const [bulkActionValue, setBulkActionValue] = useState<string>('');

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Users' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setEditingId(id);
      setEditForm({ name: user.name, email: user.email, department: user.department, isAdmin: user.isAdmin, isSponsor: user.isSponsor });
      setOpenDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const handleSave = () => {
    if (editingId) {
      setUsers(users.map(u => 
        u.id === editingId 
          ? { ...u, name: editForm.name, email: editForm.email, department: editForm.department, isAdmin: editForm.isAdmin, isSponsor: editForm.isSponsor }
          : u
      ));
    } else {
      setUsers([...users, {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: editForm.name,
        email: editForm.email,
        department: editForm.department,
        isAdmin: editForm.isAdmin,
        isSponsor: editForm.isSponsor,
        status: 'Active'
      }]);
    }
    setOpenDialog(false);
    setEditingId(null);
    setEditForm({ name: '', email: '', department: '', isAdmin: false, isSponsor: false });
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setEditForm({ name: '', email: '', department: '', isAdmin: false, isSponsor: false });
    setOpenDialog(true);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkChangeDepartment = (department: string) => {
    setUsers(users.map(u => 
      selectedRows.includes(u.id) ? { ...u, department } : u
    ));
    setSelectedRows([]);
    setBulkAction('');
    setBulkActionValue('');
  };

  const handleBulkDelete = () => {
    setUsers(users.filter(u => !selectedRows.includes(u.id)));
    setSelectedRows([]);
    setBulkAction('');
    setBulkActionValue('');
  };

  const handleBulkApply = () => {
    if (bulkAction === 'department' && bulkActionValue) {
      handleBulkChangeDepartment(bulkActionValue);
    } else if (bulkAction === 'delete') {
      handleBulkDelete();
    }
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
              User Management
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.9rem' }}>
              Manage system users and assign them to departments
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
            onClick={handleOpenNew}
          >
            Add User
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ marginBottom: '24px' }}>
          <TextField
            fullWidth
            placeholder="Search users by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
            inputProps={{ style: { fontSize: '0.9rem' } }}
          />
        </Box>

        {/* Bulk Options Panel */}
        {selectedRows.length > 0 && (
          <Card sx={{ 
            marginBottom: '24px', 
            backgroundColor: '#e0f7fa20', 
            borderLeft: '4px solid #0097a7',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Typography sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
                {selectedRows.length} user{selectedRows.length !== 1 ? 's' : ''} selected
              </Typography>
              
              <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: '140px' }}>
                  <InputLabel>Bulk Action</InputLabel>
                  <Select
                    value={bulkAction}
                    label="Bulk Action"
                    onChange={(e) => {
                      setBulkAction(e.target.value);
                      setBulkActionValue('');
                    }}
                    sx={{
                      backgroundColor: '#ffffff',
                      fontSize: '0.85rem',
                    }}
                  >
                    <MenuItem value="department">Change Department</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                  </Select>
                </FormControl>

                {bulkAction === 'department' && (
                  <FormControl size="small" sx={{ minWidth: '140px' }}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={bulkActionValue}
                      label="Department"
                      onChange={(e) => setBulkActionValue(e.target.value)}
                      sx={{
                        backgroundColor: '#ffffff',
                        fontSize: '0.85rem',
                      }}
                    >
                      {departments.map(dept => (
                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {bulkAction && (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleBulkApply}
                      disabled={bulkAction !== 'delete' && !bulkActionValue}
                      sx={{
                        background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                        color: '#ffffff',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        padding: '6px 16px',
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setBulkAction('');
                        setBulkActionValue('');
                      }}
                      sx={{
                        color: '#666666',
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        padding: '6px 16px',
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Box>

              <Button
                size="small"
                onClick={() => setSelectedRows([])}
                sx={{
                  marginLeft: 'auto',
                  color: '#0097a7',
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  padding: '4px 12px',
                }}
              >
                Clear Selection
              </Button>
            </Box>
          </Card>
        )}

        {/* Users Table */}
        <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                  <TableCell sx={{ width: '40px', paddingY: '12px', paddingX: '16px' }}>
                    <Checkbox
                      checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                      indeterminate={selectedRows.length > 0 && selectedRows.length < filteredUsers.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(filteredUsers.map(u => u.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Permissions</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      onClick={() => toggleRowSelection(user.id)}
                      sx={{
                        backgroundColor: selectedRows.includes(user.id) ? '#e0f7fa20' : '#ffffff',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#e0f7fa40',
                        },
                        borderBottom: '1px solid #eeeeee',
                      }}
                    >
                      <TableCell sx={{ paddingY: '12px', paddingX: '16px' }} onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRows.includes(user.id)}
                          onChange={() => toggleRowSelection(user.id)}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a1a' }}>
                        {user.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.85rem', color: '#666666' }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ paddingY: '8px' }} onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={user.department}
                          onChange={(e) => {
                            setUsers(users.map(u => u.id === user.id ? { ...u, department: e.target.value } : u));
                          }}
                          size="small"
                          sx={{
                            fontSize: '0.85rem',
                            height: '28px',
                            minWidth: '100px',
                            backgroundColor: '#e3f2fd',
                            color: '#0097a7',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#0097a7',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#0097a7',
                            },
                          }}
                        >
                          {departments.map(dept => (
                            <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell sx={{ paddingY: '8px' }} onClick={(e) => e.stopPropagation()}>
                        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {user.isAdmin && (
                            <Chip
                              label="Admin"
                              size="small"
                              sx={{
                                backgroundColor: '#fce4ec',
                                color: '#c2185b',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                              }}
                            />
                          )}
                          {user.isSponsor && (
                            <Chip
                              label="Sponsor"
                              size="small"
                              sx={{
                                backgroundColor: '#fff8e1',
                                color: '#f57f17',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                              }}
                            />
                          )}
                          {!user.isAdmin && !user.isSponsor && (
                            <Chip
                              label="Member"
                              size="small"
                              sx={{
                                backgroundColor: '#e3f2fd',
                                color: '#0097a7',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ paddingY: '8px' }}>
                        <Chip
                          label={user.status}
                          size="small"
                          sx={{
                            backgroundColor: user.status === 'Active' ? '#4caf5020' : '#f4433620',
                            color: user.status === 'Active' ? '#4caf50' : '#f44336',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', paddingY: '8px' }} onClick={(e) => e.stopPropagation()}>
                        <Box sx={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(user.id)}
                            sx={{ color: '#0097a7', padding: '4px' }}
                          >
                            <EditIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(user.id)}
                            sx={{ color: '#f44336', padding: '4px' }}
                          >
                            <DeleteIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', padding: '32px', color: '#999999' }}>
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* User Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            {editingId ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
            <TextField
              fullWidth
              label="Name"
              placeholder="Enter user name"
              size="small"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter email address"
              size="small"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select
                value={editForm.department}
                label="Department"
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
              >
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {/* Admin and Sponsor Checkboxes */}
            <Box sx={{ display: 'flex', gap: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox
                  checked={editForm.isAdmin}
                  onChange={(e) => setEditForm({ ...editForm, isAdmin: e.target.checked })}
                />
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>Admin User</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox
                  checked={editForm.isSponsor}
                  onChange={(e) => setEditForm({ ...editForm, isSponsor: e.target.checked })}
                />
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>Sponsor</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' }}
            >
              {editingId ? 'Update User' : 'Add User'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

type TeamMember = { userId: number; isSponsor?: boolean };

type Department = { id: number; name: string; head: string; contact: string; teamMembers: TeamMember[]; description: string; status: string };
type EditFormState = { name: string; head: string; contact: string; teamMembers: TeamMember[]; description: string };

export const DepartmentManagementSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Mock users list for multi-select with role information
  const availableUsers = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', userRole: 'Admin' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', userRole: 'Manager' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', userRole: 'User' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', userRole: 'Manager' },
    { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', userRole: 'User' },
    { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', userRole: 'User' },
  ];

  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: 'IT', head: 'John Smith', contact: 'john.smith@company.com', teamMembers: [{ userId: 1, isSponsor: false }, { userId: 3, isSponsor: false }], description: 'Information Technology department', status: 'Active' },
    { id: 2, name: 'Sales', head: 'Sarah Johnson', contact: 'sarah.johnson@company.com', teamMembers: [{ userId: 2, isSponsor: false }, { userId: 5, isSponsor: true }], description: 'Sales and business development', status: 'Active' },
    { id: 3, name: 'Operations', head: 'Mike Chen', contact: 'mike.chen@company.com', teamMembers: [{ userId: 3, isSponsor: false }, { userId: 6, isSponsor: false }], description: 'Operations and logistics', status: 'Active' },
    { id: 4, name: 'Product', head: 'Emily Davis', contact: 'emily.davis@company.com', teamMembers: [{ userId: 4, isSponsor: true }], description: 'Product management team', status: 'Active' },
  ]);
  const [editForm, setEditForm] = useState<EditFormState>({
    name: '',
    head: '',
    contact: '',
    teamMembers: [],
    description: ''
  });

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Departments' },
  ];

  const handleEdit = (id: number) => {
    const dept = departments.find((d: Department) => d.id === id);
    if (dept) {
      setEditingId(id);
      setEditForm({ name: dept.name, head: dept.head, contact: dept.contact, teamMembers: dept.teamMembers, description: dept.description });
      setOpenDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setDepartments(departments.filter((d: Department) => d.id !== id));
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setEditForm({ name: '', head: '', contact: '', teamMembers: [], description: '' });
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (editingId !== null) {
      // Edit existing
      setDepartments(departments.map((d: Department) =>
        d.id === editingId
          ? { ...d, name: editForm.name, head: editForm.head, contact: editForm.contact, teamMembers: editForm.teamMembers, description: editForm.description }
          : d
      ));
    } else {
      // Add new
      const newId = Math.max(...departments.map(d => d.id), 0) + 1;
      setDepartments([...departments, {
        id: newId,
        name: editForm.name,
        head: editForm.head,
        contact: editForm.contact,
        teamMembers: editForm.teamMembers,
        description: editForm.description,
        status: 'Active'
      }]);
    }
    setOpenDialog(false);
  };

  const removeMember = (userId: number) => {
    setEditForm((prev: EditFormState) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((tm: TeamMember) => tm.userId !== userId)
    }));
  };

  const addMember = (userId: number) => {
    if (!editForm.teamMembers.find((tm: TeamMember) => tm.userId === userId)) {
      setEditForm((prev: EditFormState) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { userId, isSponsor: false }]
      }));
    }
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
              Department Management
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.95rem' }}>
              Create and manage departments for organizing demo requests
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
            onClick={handleOpenNew}
          >
            Add Department
          </Button>
        </Box>

        <Grid container spacing={3}>
          {departments.map((dept: Department) => {
            const deptMembers = dept.teamMembers
              .map((tm: TeamMember) => ({ ...availableUsers.find(u => u.id === tm.userId), isSponsor: tm.isSponsor }))
              .filter((m: any) => m.id);
            const sponsors = deptMembers.filter(m => m.isSponsor);
            const regularMembers = deptMembers.filter(m => !m.isSponsor);
            const displayMembers = regularMembers.slice(0, 2);
            const moreCount = regularMembers.length > 2 ? regularMembers.length - 2 : 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={dept.id}>
                <Card sx={{
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <CardContent sx={{ padding: '20px', paddingBottom: '16px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0097a7', marginBottom: '4px' }}>
                          {dept.name}
                        </Typography>
                        <Chip label={dept.status} size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50', fontSize: '0.7rem', height: '20px' }} />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Head:</Typography>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{dept.head}</Typography>
                      </Box>
                      {dept.contact && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Contact:</Typography>
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#0097a7', cursor: 'pointer' }}>
                            {dept.contact}
                          </Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Members:</Typography>
                        <Chip label={`${deptMembers.length} people`} size="small" variant="outlined" sx={{ fontSize: '0.75rem', height: '22px' }} />
                      </Box>
                      <Box sx={{ paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                        <Typography sx={{ fontSize: '0.8rem', color: '#999', marginBottom: '6px', fontWeight: 600 }}>Sponsors:</Typography>
                        {sponsors.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                            {sponsors.slice(0, 2).map((member: any) => (
                              <Chip
                                key={member.id}
                                label={member.name}
                                size="small"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: '20px',
                                  backgroundColor: '#fff3e0',
                                  color: '#ff9800',
                                  fontWeight: 600
                                }}
                              />
                            ))}
                            {sponsors.length > 2 && (
                              <Chip
                                label={`+${sponsors.length - 2} sponsor${sponsors.length - 2 > 1 ? 's' : ''}`}
                                size="small"
                                sx={{ fontSize: '0.65rem', height: '20px', backgroundColor: '#fff3e0', color: '#ff9800', fontWeight: 600 }}
                              />
                            )}
                          </Box>
                        ) : (
                          <Typography sx={{ fontSize: '0.75rem', color: '#999', fontStyle: 'italic' }}>N/A</Typography>
                        )}
                      </Box>
                      {regularMembers.length > 0 && (
                        <Box sx={{ paddingTop: '8px' }}>
                          <Typography sx={{ fontSize: '0.8rem', color: '#999', marginBottom: '6px' }}>Team Members:</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                            {displayMembers.map((member: any) => (
                              <Chip
                                key={member.id}
                                label={member.name}
                                size="small"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: '20px',
                                  backgroundColor: '#e3f2fd',
                                  color: '#0097a7',
                                  fontWeight: 500
                                }}
                              />
                            ))}
                            {moreCount > 0 && (
                              <Chip
                                label={`+${moreCount} more`}
                                size="small"
                                sx={{ fontSize: '0.7rem', height: '20px', backgroundColor: '#f0f0f0', color: '#666' }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: '8px', borderTop: '1px solid #e0e0e0', paddingTop: '12px' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(dept.id)}
                        sx={{
                          flex: 1,
                          color: '#0097a7',
                          borderColor: '#0097a7',
                          fontSize: '0.8rem',
                          '&:hover': { backgroundColor: '#0097a708' }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(dept.id)}
                        sx={{
                          flex: 1,
                          color: '#f44336',
                          borderColor: '#f44336',
                          fontSize: '0.8rem',
                          '&:hover': { backgroundColor: '#f4433608' }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {departments.length === 0 && (
          <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', textAlign: 'center', padding: '40px' }}>
            <Typography sx={{ color: '#999', fontSize: '0.95rem' }}>
              No departments found. Click "Add Department" to create one.
            </Typography>
          </Card>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editingId !== null ? 'Edit Department' : 'Add New Department'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px', maxHeight: '80vh', overflowY: 'auto' }}>
            <TextField
              fullWidth
              label="Department Name"
              placeholder="e.g., Sales, Marketing, IT"
              size="small"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Department Head"
              placeholder="Enter department head name"
              size="small"
              value={editForm.head}
              onChange={(e) => setEditForm({ ...editForm, head: e.target.value })}
            />
            <TextField
              fullWidth
              label="Contact Email"
              placeholder="e.g., dept@company.com"
              type="email"
              size="small"
              value={editForm.contact}
              onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              placeholder="Optional description"
              multiline
              rows={2}
              size="small"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />

            <Box sx={{ borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
                Add Team Members
              </Typography>
              <Autocomplete
                options={availableUsers.filter(u => !editForm.teamMembers.find(tm => tm.userId === u.id))}
                getOptionLabel={(option) => `${option.name}`}
                onChange={(_event, newValue) => {
                  if (newValue) {
                    addMember(newValue.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search and add members..."
                    placeholder="Type to search..."
                    size="small"
                  />
                )}
                noOptionsText="All users already added or no users available"
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </Box>

            {editForm.teamMembers.length > 0 && (
              <Box sx={{ borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
                  Team Members ({editForm.teamMembers.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                  {editForm.teamMembers.map(member => {
                    const user = availableUsers.find(u => u.id === member.userId);
                    return (
                      <Box
                        key={member.userId}
                        sx={{
                          padding: '12px',
                          backgroundColor: '#f9f9f9',
                          borderRadius: '8px',
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <Box>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
                              {user?.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                              {user?.email}
                            </Typography>
                          </Box>
                          <Button
                            size="small"
                            onClick={() => removeMember(member.userId)}
                            sx={{ color: '#f44336', minWidth: '30px', padding: '4px' }}
                          >
                            ✕
                          </Button>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <Checkbox
                              checked={member.isSponsor || false}
                              onChange={(e) => {
                                setEditForm(prev => ({
                                  ...prev,
                                  teamMembers: prev.teamMembers.map(tm =>
                                    tm.userId === member.userId ? { ...tm, isSponsor: e.target.checked } : tm
                                  )
                                }));
                              }}
                            />
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Mark as Sponsor</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' }}
              onClick={handleSave}
            >
              {editingId !== null ? 'Update Department' : 'Add Department'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export const TargetAudienceConfigSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [audiences, setAudiences] = useState([
    { id: 1, name: 'Enterprise', description: 'Large organizations with 1000+ employees' },
    { id: 2, name: 'Mid-Market', description: 'Companies with 100-1000 employees' },
    { id: 3, name: 'Small Business', description: 'Startups and small teams under 100 people' },
    { id: 4, name: 'Individual', description: 'Freelancers and independent professionals' },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Request Form Options', onClick: () => onNavigate?.('forms-configuration') },
    { label: 'Target Audience' },
  ];

  const handleEdit = (id: number) => {
    const item = audiences.find((a) => a.id === id);
    if (item) {
      setEditingId(id);
      setEditForm({ name: item.name, description: item.description });
      setOpenDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setAudiences(audiences.filter((a) => a.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const handleSave = () => {
    if (editingId !== null) {
      setAudiences(audiences.map((a) => (a.id === editingId ? { ...a, ...editForm } : a)));
    } else {
      setAudiences([...audiences, { id: Math.max(...audiences.map((a) => a.id), 0) + 1, ...editForm }]);
    }
    setOpenDialog(false);
    setEditingId(null);
    setEditForm({ name: '', description: '' });
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '' });
    setOpenDialog(true);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
              Target Audience Configuration
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.9rem' }}>
              Manage audience categories for demo requests
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
            onClick={handleOpenNew}
          >
            Add Audience
          </Button>
        </Box>

        {/* Table */}
        <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                  <TableCell sx={{ width: '40px', paddingY: '12px', paddingX: '16px' }}>
                    <Checkbox
                      checked={selectedRows.length === audiences.length && audiences.length > 0}
                      indeterminate={selectedRows.length > 0 && selectedRows.length < audiences.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(audiences.map(a => a.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audiences.length > 0 ? (
                  audiences.map((audience) => (
                    <TableRow
                      key={audience.id}
                      onClick={() => toggleRowSelection(audience.id)}
                      sx={{
                        backgroundColor: selectedRows.includes(audience.id) ? '#e0f7fa20' : '#ffffff',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#e0f7fa40',
                        },
                        borderBottom: '1px solid #eeeeee',
                      }}
                    >
                      <TableCell sx={{ paddingY: '12px', paddingX: '16px' }}>
                        <Checkbox
                          checked={selectedRows.includes(audience.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 500 }}>
                        {audience.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.9rem', color: '#666' }}>
                        {audience.description}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', paddingY: '8px' }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(audience.id);
                          }}
                          sx={{ color: '#0097a7' }}
                        >
                          <EditIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(audience.id);
                          }}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', paddingY: '32px', color: '#999' }}>
                      No audiences configured
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            {editingId ? 'Edit Audience' : 'Add New Audience'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
            <TextField
              fullWidth
              label="Audience Name"
              placeholder="e.g., Enterprise, SMB"
              size="small"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              placeholder="Describe this audience"
              multiline
              rows={3}
              size="small"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' }}
              onClick={handleSave}
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export const DatabaseTypeConfigSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [databases, setDatabases] = useState([
    { id: 1, name: 'PostgreSQL' },
    { id: 2, name: 'MySQL' },
    { id: 3, name: 'MongoDB' },
    { id: 4, name: 'SQL Server' },
    { id: 5, name: 'Oracle' },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '' });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Request Form Options', onClick: () => onNavigate?.('forms-configuration') },
    { label: 'Database Types' },
  ];

  const handleEdit = (id: number) => {
    const item = databases.find((d) => d.id === id);
    if (item) {
      setEditingId(id);
      setEditForm({ name: item.name });
      setOpenDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setDatabases(databases.filter((d) => d.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const handleSave = () => {
    if (editingId !== null) {
      setDatabases(databases.map((d) => (d.id === editingId ? { ...d, ...editForm } : d)));
    } else {
      setDatabases([...databases, { id: Math.max(...databases.map((d) => d.id), 0) + 1, ...editForm }]);
    }
    setOpenDialog(false);
    setEditingId(null);
    setEditForm({ name: '' });
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setEditForm({ name: '' });
    setOpenDialog(true);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
              Database Type Configuration
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.9rem' }}>
              Manage database types available in demo requests
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
            onClick={handleOpenNew}
          >
            Add Database
          </Button>
        </Box>

        {/* Table */}
        <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                  <TableCell sx={{ width: '40px', paddingY: '12px', paddingX: '16px' }}>
                    <Checkbox
                      checked={selectedRows.length === databases.length && databases.length > 0}
                      indeterminate={selectedRows.length > 0 && selectedRows.length < databases.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(databases.map(d => d.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Database Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {databases.length > 0 ? (
                  databases.map((database) => (
                    <TableRow
                      key={database.id}
                      onClick={() => toggleRowSelection(database.id)}
                      sx={{
                        backgroundColor: selectedRows.includes(database.id) ? '#e0f7fa20' : '#ffffff',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#e0f7fa40',
                        },
                        borderBottom: '1px solid #eeeeee',
                      }}
                    >
                      <TableCell sx={{ paddingY: '12px', paddingX: '16px' }}>
                        <Checkbox
                          checked={selectedRows.includes(database.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 500 }}>
                        {database.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', paddingY: '8px' }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(database.id);
                          }}
                          sx={{ color: '#0097a7' }}
                        >
                          <EditIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(database.id);
                          }}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: 'center', paddingY: '32px', color: '#999' }}>
                      No databases configured
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            {editingId ? 'Edit Database' : 'Add New Database'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
            <TextField
              fullWidth
              label="Database Name"
              placeholder="e.g., PostgreSQL, MySQL"
              size="small"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' }}
              onClick={handleSave}
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export const ProgrammingLanguageConfigSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [languages, setLanguages] = useState([
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'C#' },
    { id: 5, name: 'Go' },
    { id: 6, name: 'TypeScript' },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '' });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Request Form Options', onClick: () => onNavigate?.('forms-configuration') },
    { label: 'Programming Languages' },
  ];

  const handleEdit = (id: number) => {
    const item = languages.find((l) => l.id === id);
    if (item) {
      setEditingId(id);
      setEditForm({ name: item.name });
      setOpenDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setLanguages(languages.filter((l) => l.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const handleSave = () => {
    if (editingId !== null) {
      setLanguages(languages.map((l) => (l.id === editingId ? { ...l, ...editForm } : l)));
    } else {
      setLanguages([...languages, { id: Math.max(...languages.map((l) => l.id), 0) + 1, ...editForm }]);
    }
    setOpenDialog(false);
    setEditingId(null);
    setEditForm({ name: '' });
  };

  const handleOpenNew = () => {
    setEditingId(null);
    setEditForm({ name: '' });
    setOpenDialog(true);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
              Programming Language Configuration
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.9rem' }}>
              Manage programming languages available in demo requests
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
            onClick={handleOpenNew}
          >
            Add Language
          </Button>
        </Box>

        {/* Table */}
        <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                  <TableCell sx={{ width: '40px', paddingY: '12px', paddingX: '16px' }}>
                    <Checkbox
                      checked={selectedRows.length === languages.length && languages.length > 0}
                      indeterminate={selectedRows.length > 0 && selectedRows.length < languages.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(languages.map(l => l.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px' }}>Language Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', paddingY: '12px', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {languages.length > 0 ? (
                  languages.map((language) => (
                    <TableRow
                      key={language.id}
                      onClick={() => toggleRowSelection(language.id)}
                      sx={{
                        backgroundColor: selectedRows.includes(language.id) ? '#e0f7fa20' : '#ffffff',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#e0f7fa40',
                        },
                        borderBottom: '1px solid #eeeeee',
                      }}
                    >
                      <TableCell sx={{ paddingY: '12px', paddingX: '16px' }}>
                        <Checkbox
                          checked={selectedRows.includes(language.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 500 }}>
                        {language.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', paddingY: '8px' }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(language.id);
                          }}
                          sx={{ color: '#0097a7' }}
                        >
                          <EditIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(language.id);
                          }}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: 'center', paddingY: '32px', color: '#999' }}>
                      No languages configured
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
            {editingId ? 'Edit Language' : 'Add New Language'}
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
            <TextField
              fullWidth
              label="Language Name"
              placeholder="e.g., JavaScript, Python"
              size="small"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)' }}
              onClick={handleSave}
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export const FormConfigurationSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Request Form Options' },
  ];

  const configCards = [
    {
      id: 'target-audience',
      icon: '🎯',
      title: 'Target Audience',
      description: 'Manage audience categories',
      color: '#ff9800',
      onClick: () => onNavigate?.('target-audience-config'),
    },
    {
      id: 'database-types',
      icon: '🗄️',
      title: 'Database Types',
      description: 'Manage database options',
      color: '#2196f3',
      onClick: () => onNavigate?.('database-type-config'),
    },
    {
      id: 'languages',
      icon: '</>',
      title: 'Programming Languages',
      description: 'Manage language options',
      color: '#4caf50',
      onClick: () => onNavigate?.('programming-language-config'),
    },
  ];

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
            Request Form Options
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.9rem' }}>
            Configure request form settings
          </Typography>
        </Box>

        {/* Configuration Cards */}
        <Grid container spacing={3}>
          {configCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card
                onClick={card.onClick}
                sx={{
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(135deg, rgba(${hexToRgb(card.color)}, 0.1) 0%, rgba(${hexToRgb(card.color)}, 0.05) 100%)`,
                  border: `2px solid rgba(${hexToRgb(card.color)}, 0.2)`,
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)',
                    borderColor: `rgba(${hexToRgb(card.color)}, 0.4)`,
                  },
                }}
              >
                <CardContent sx={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ fontSize: '2.5rem', marginBottom: '16px' }}>{card.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#1a1a1a',
                      marginBottom: '8px',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666666',
                      fontSize: '0.9rem',
                      marginBottom: '20px',
                    }}
                  >
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background: `linear-gradient(135deg, ${card.color} 0%, ${adjustColor(card.color, 20)} 100%)`,
                      color: '#ffffff',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      padding: '10px 24px',
                      borderRadius: '8px',
                    }}
                  >
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
}

function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

export const SiteSettingsSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [generalSettings, setGeneralSettings] = useState({
    appName: 'DemoHub',
    supportEmail: 'support@demohub.com',
    expiryDays: '30',
  });
  const [notifications, setNotifications] = useState({
    confirmations: true,
    approvals: true,
    statusUpdates: true,
  });
  const [saveSuccess, setSaveSuccess] = useState<'general' | 'notifications' | null>(null);

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Site Settings' },
  ];

  const handleGeneralSave = () => {
    setSaveSuccess('general');
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  const handleNotificationsSave = () => {
    setSaveSuccess('notifications');
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
            Site Settings
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.95rem' }}>
            Configure general application settings and notification preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <CardContent sx={{ padding: '24px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0097a7' }}>
                    General Settings
                  </Typography>
                  {saveSuccess === 'general' && (
                    <Chip label="Saved" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50' }} />
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <TextField
                    fullWidth
                    label="Application Name"
                    size="small"
                    value={generalSettings.appName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, appName: e.target.value })}
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.9rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Support Email"
                    size="small"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.9rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Demo Request Expiry (Days)"
                    type="number"
                    size="small"
                    value={generalSettings.expiryDays}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, expiryDays: e.target.value })}
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.9rem' } }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleGeneralSave}
                    sx={{
                      background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    Save Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <CardContent sx={{ padding: '24px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0097a7' }}>
                    Email Notifications
                  </Typography>
                  {saveSuccess === 'notifications' && (
                    <Chip label="Saved" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50' }} />
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>Demo request confirmations</Typography>
                    <input
                      type="checkbox"
                      checked={notifications.confirmations}
                      onChange={(e) => setNotifications({ ...notifications, confirmations: e.target.checked })}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>Approval notifications</Typography>
                    <input
                      type="checkbox"
                      checked={notifications.approvals}
                      onChange={(e) => setNotifications({ ...notifications, approvals: e.target.checked })}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>Status updates</Typography>
                    <input
                      type="checkbox"
                      checked={notifications.statusUpdates}
                      onChange={(e) => setNotifications({ ...notifications, statusUpdates: e.target.checked })}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleNotificationsSave}
                    sx={{
                      background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      marginTop: '8px',
                    }}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const DatabaseSettingsSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [backupSuccess, setBackupSuccess] = useState(false);

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'System', onClick: () => onNavigate?.('system-information') },
    { label: 'Database Settings' },
  ];

  const handleCreateBackup = () => {
    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 3000);
  };

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
            Database Settings
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.95rem' }}>
            Monitor database health and manage backups
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0097a7', marginBottom: '20px' }}>
                  Database Status
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    borderLeft: '4px solid #4caf50',
                  }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Connection Status</Typography>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>Active</Typography>
                    </Box>
                    <Chip label="Connected" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50', fontWeight: 600 }} />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ff9800',
                  }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Last Backup</Typography>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>2 hours ago</Typography>
                    </Box>
                    {backupSuccess && (
                      <Chip label="Backed up!" size="small" sx={{ backgroundColor: '#4caf5020', color: '#4caf50' }} />
                    )}
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2196f3',
                  }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Database Size</Typography>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>2.3 GB</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.75rem', color: '#999' }}>of 5 GB</Typography>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    borderLeft: '4px solid #9c27b0',
                  }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Connection Count</Typography>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>12 active</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <CardContent sx={{ padding: '24px' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0097a7', marginBottom: '20px' }}>
                  Maintenance & Backups
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleCreateBackup}
                    sx={{
                      background: 'linear-gradient(135deg, #0097a7 0%, #00bcd4 100%)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      padding: '10px',
                    }}
                  >
                    {backupSuccess ? '✓ Backup Created' : 'Create Backup Now'}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      padding: '10px',
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      '&:hover': {
                        backgroundColor: '#0097a708',
                      }
                    }}
                  >
                    View Backup History
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      padding: '10px',
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      '&:hover': {
                        backgroundColor: '#0097a708',
                      }
                    }}
                  >
                    Run Maintenance
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      padding: '10px',
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      '&:hover': {
                        backgroundColor: '#0097a708',
                      }
                    }}
                  >
                    Database Logs
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export const ReportsSection = ({ onNavigate }: { onNavigate?: (section: string) => void }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState({ from: '2025-01-01', to: '2025-11-24' });
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const departments = ['All', 'IT', 'Sales', 'Operations', 'Product'];

  const breadcrumbs = [
    { label: 'Admin', onClick: () => onNavigate?.('admin-dashboard') },
    { label: 'Reports' },
  ];

  // Mock data for reports
  const demoRequestsData = [
    { id: 1, title: 'Q4 Product Demo', requestedBy: 'John Smith', department: 'IT', status: 'Completed', date: '2025-11-20', duration: '45 min', attendees: 12, notes: 'Great feedback' },
    { id: 2, title: 'Sales Training Module', requestedBy: 'Sarah Johnson', department: 'Sales', status: 'Completed', date: '2025-11-18', duration: '30 min', attendees: 8, notes: 'Positive response' },
    { id: 3, title: 'Operations Q4 Review', requestedBy: 'Mike Chen', department: 'Operations', status: 'In Progress', date: '2025-11-22', duration: '60 min', attendees: 15, notes: 'Ongoing' },
    { id: 4, title: 'Product Feature Overview', requestedBy: 'Emily Davis', department: 'Product', status: 'Completed', date: '2025-11-19', duration: '50 min', attendees: 20, notes: 'High engagement' },
    { id: 5, title: 'IT Infrastructure Demo', requestedBy: 'David Wilson', department: 'IT', status: 'Completed', date: '2025-11-17', duration: '90 min', attendees: 25, notes: 'Technical deep dive' },
    { id: 6, title: 'Sales Automation Tools', requestedBy: 'Lisa Anderson', department: 'Sales', status: 'Pending', date: '2025-11-25', duration: '40 min', attendees: 10, notes: 'Scheduled' },
    { id: 7, title: 'Operations Efficiency Tips', requestedBy: 'James Rodriguez', department: 'Operations', status: 'Completed', date: '2025-11-16', duration: '35 min', attendees: 18, notes: 'Useful insights' },
    { id: 8, title: 'Product Analytics Dashboard', requestedBy: 'Jennifer Lee', department: 'Product', status: 'Completed', date: '2025-11-21', duration: '55 min', attendees: 14, notes: 'Data-driven' },
  ];

  const userActivityData = [
    { userId: 1, userName: 'John Smith', department: 'IT', role: 'member', logins: 45, demoRequests: 3, lastLogin: '2025-11-24', status: 'Active' },
    { userId: 2, userName: 'Sarah Johnson', department: 'Sales', role: 'sponsor', logins: 62, demoRequests: 8, lastLogin: '2025-11-24', status: 'Active' },
    { userId: 3, userName: 'Mike Chen', department: 'Operations', role: 'member', logins: 38, demoRequests: 2, lastLogin: '2025-11-23', status: 'Active' },
    { userId: 4, userName: 'Emily Davis', department: 'Product', role: 'sponsor', logins: 55, demoRequests: 12, lastLogin: '2025-11-24', status: 'Active' },
    { userId: 5, userName: 'David Wilson', department: 'IT', role: 'member', logins: 42, demoRequests: 4, lastLogin: '2025-11-22', status: 'Active' },
    { userId: 6, userName: 'Lisa Anderson', department: 'Sales', role: 'member', logins: 28, demoRequests: 1, lastLogin: '2025-11-20', status: 'Active' },
    { userId: 7, userName: 'James Rodriguez', department: 'Operations', role: 'sponsor', logins: 51, demoRequests: 6, lastLogin: '2025-11-24', status: 'Active' },
    { userId: 8, userName: 'Jennifer Lee', department: 'Product', role: 'member', logins: 39, demoRequests: 2, lastLogin: '2025-11-21', status: 'Inactive' },
  ];

  const departmentMetricsData = [
    { department: 'IT', totalRequests: 9, completedRequests: 7, inProgressRequests: 1, pendingRequests: 1, avgDuration: '58 min', totalAttendees: 52, activeUsers: 3 },
    { department: 'Sales', totalRequests: 9, completedRequests: 7, inProgressRequests: 0, pendingRequests: 2, avgDuration: '35 min', totalAttendees: 31, activeUsers: 3 },
    { department: 'Operations', totalRequests: 8, completedRequests: 6, inProgressRequests: 1, pendingRequests: 1, avgDuration: '48 min', totalAttendees: 44, activeUsers: 3 },
    { department: 'Product', totalRequests: 10, completedRequests: 8, inProgressRequests: 0, pendingRequests: 2, avgDuration: '53 min', totalAttendees: 53, activeUsers: 2 },
  ];

  const exportToExcel = (data: any[], filename: string) => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportToPDF = (reportName: string, data: any[]) => {
    const printWindow = window.open('', '', 'width=900,height=600');
    if (printWindow) {
      let htmlContent = `
        <html>
          <head>
            <title>${reportName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #0097a7; margin-bottom: 10px; }
              .metadata { color: #666; font-size: 12px; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th { background-color: #0097a7; color: white; padding: 12px; text-align: left; font-weight: bold; }
              td { padding: 10px; border-bottom: 1px solid #ddd; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .summary { margin-top: 30px; padding: 15px; background-color: #e0f7fa; border-left: 4px solid #0097a7; }
              .footer { margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; }
            </style>
          </head>
          <body>
            <h1>${reportName}</h1>
            <div class="metadata">Generated on ${new Date().toLocaleString()}</div>
            <table>
              <thead>
                <tr>
                  ${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.map(row => `
                  <tr>
                    ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="summary">
              <strong>Report Summary:</strong> Total Records: ${data.length}
            </div>
            <div class="footer">
              <p>This report was automatically generated by the Demo Request System.</p>
              <p>For questions or additional information, please contact your system administrator.</p>
            </div>
          </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const filteredDemoRequests = selectedDepartment === 'All' 
    ? demoRequestsData 
    : demoRequestsData.filter(d => d.department === selectedDepartment);

  const filteredUserActivity = selectedDepartment === 'All'
    ? userActivityData
    : userActivityData.filter(u => u.department === selectedDepartment);

  const filteredDepartmentMetrics = selectedDepartment === 'All'
    ? departmentMetricsData
    : departmentMetricsData.filter(d => d.department === selectedDepartment);

  return (
    <Box sx={{ padding: '32px 24px', backgroundColor: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <BreadcrumbNav items={breadcrumbs} />

        <Box sx={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
              Reports
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666', fontSize: '0.9rem' }}>
              View and export comprehensive analytics and statistics
            </Typography>
          </Box>
        </Box>

        {/* Filter Bar */}
        <Card sx={{ marginBottom: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
          <CardContent sx={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: '180px' }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartment}
                label="Department"
                onChange={(e) => setSelectedDepartment(e.target.value)}
                size="small"
              >
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: '160px' }}>
              <TextField
                label="From Date"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>

            <FormControl sx={{ minWidth: '160px' }}>
              <TextField
                label="To Date"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </CardContent>
        </Card>

        {/* Reports Tabs */}
        <Paper sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
          <Tabs 
            value={activeTab} 
            onChange={(_e, newValue) => setActiveTab(newValue)}
            sx={{
              backgroundColor: '#ffffff',
              borderBottom: '2px solid #e0e0e0',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#666666',
              },
              '& .Mui-selected': {
                color: '#0097a7',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#0097a7',
              }
            }}
          >
            <Tab label="Demo Requests" />
            <Tab label="User Activity" />
            <Tab label="Department Metrics" />
          </Tabs>

          <Box sx={{ padding: '24px' }}>
            {/* Demo Requests Tab */}
            {activeTab === 0 && (
              <Box>
                <Box sx={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => exportToExcel(filteredDemoRequests, 'demo_requests')}
                    sx={{
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { backgroundColor: '#0097a708' }
                    }}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => exportToPDF('Demo Requests Report', filteredDemoRequests)}
                    sx={{
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { backgroundColor: '#0097a708' }
                    }}
                  >
                    Export to PDF
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Requested By</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Duration</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Attendees</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredDemoRequests.map(req => (
                        <TableRow key={req.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{req.title}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{req.requestedBy}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{req.department}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>
                            <Chip
                              label={req.status}
                              size="small"
                              sx={{
                                backgroundColor: req.status === 'Completed' ? '#4caf5020' : req.status === 'In Progress' ? '#ff980020' : '#f4433620',
                                color: req.status === 'Completed' ? '#4caf50' : req.status === 'In Progress' ? '#ff9800' : '#f44336',
                                fontSize: '0.7rem',
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{req.date}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{req.duration}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{req.attendees}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{req.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* User Activity Tab */}
            {activeTab === 1 && (
              <Box>
                <Box sx={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => exportToExcel(filteredUserActivity, 'user_activity')}
                    sx={{
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { backgroundColor: '#0097a708' }
                    }}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => exportToPDF('User Activity Report', filteredUserActivity)}
                    sx={{
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { backgroundColor: '#0097a708' }
                    }}
                  >
                    Export to PDF
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>User Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Logins</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Demo Requests</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Last Login</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUserActivity.map(user => (
                        <TableRow key={user.userId} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{user.userName}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{user.department}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>
                            <Chip
                              label={user.role}
                              size="small"
                              sx={{
                                backgroundColor: user.role === 'sponsor' ? '#fff8e1' : '#e3f2fd',
                                color: user.role === 'sponsor' ? '#f57f17' : '#0097a7',
                                fontSize: '0.7rem',
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{user.logins}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{user.demoRequests}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{user.lastLogin}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>
                            <Chip
                              label={user.status}
                              size="small"
                              sx={{
                                backgroundColor: user.status === 'Active' ? '#4caf5020' : '#f4433620',
                                color: user.status === 'Active' ? '#4caf50' : '#f44336',
                                fontSize: '0.7rem',
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Department Metrics Tab */}
            {activeTab === 2 && (
              <Box>
                <Box sx={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => exportToExcel(filteredDepartmentMetrics, 'department_metrics')}
                    sx={{
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { backgroundColor: '#0097a708' }
                    }}
                  >
                    Export to Excel
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => exportToPDF('Department Metrics Report', filteredDepartmentMetrics)}
                    sx={{
                      color: '#0097a7',
                      borderColor: '#0097a7',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': { backgroundColor: '#0097a708' }
                    }}
                  >
                    Export to PDF
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Total Requests</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Completed</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>In Progress</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Pending</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Avg Duration</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Total Attendees</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.85rem' }}>Active Users</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredDepartmentMetrics.map((dept, idx) => (
                        <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{dept.department}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{dept.totalRequests}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', color: '#4caf50', fontWeight: 500 }}>{dept.completedRequests}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', color: '#ff9800', fontWeight: 500 }}>{dept.inProgressRequests}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', color: '#f44336', fontWeight: 500 }}>{dept.pendingRequests}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem' }}>{dept.avgDuration}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{dept.totalAttendees}</TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{dept.activeUsers}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export { NotificationSettingsSection };
