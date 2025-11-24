import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface Column<T> {
  id: keyof T;
  label: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
  searchable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  searchableFields?: (keyof T)[];
  dense?: boolean;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  ({ data, columns, onRowClick, searchableFields = [], dense = true }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
      if (!searchTerm) return data;

      return data.filter((row) =>
        searchableFields.some((field) => {
          const value = String(row[field] || '').toLowerCase();
          return value.includes(searchTerm.toLowerCase());
        })
      );
    }, [data, searchTerm, searchableFields]);

    return (
      <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Search Bar */}
        {searchableFields.length > 0 && (
          <TextField
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '1.2rem', color: '#999' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '100%',
              maxWidth: '300px',
              '& .MuiOutlinedInput-root': {
                fontSize: '0.85rem',
              },
            }}
          />
        )}

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
          }}
        >
          <Table size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    sx={{
                      fontWeight: 700,
                      color: '#666666',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      width: column.width,
                      padding: dense ? '12px' : '16px',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <TableRow
                    key={idx}
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      '&:hover': { backgroundColor: '#f8f9fa' },
                      borderBottom: '1px solid #e0e0e0',
                      cursor: onRowClick ? 'pointer' : 'default',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.id)}
                        sx={{
                          color: '#1a1a1a',
                          fontSize: '0.8rem',
                          padding: dense ? '12px' : '16px',
                        }}
                      >
                        {column.render ? column.render(row[column.id], row) : String(row[column.id] || '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    sx={{
                      textAlign: 'center',
                      padding: '32px',
                      color: '#999',
                      fontSize: '0.9rem',
                    }}
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
);

DataTable.displayName = 'DataTable';
