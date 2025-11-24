import { Box, Breadcrumbs, Typography, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbNav: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Box sx={{ marginBottom: '24px' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: '1rem', color: '#999999' }} />}
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
          },
        }}
      >
        {items.map((item, index) => (
          <Box key={index}>
            {index === items.length - 1 ? (
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                {item.label}
              </Typography>
            ) : (
              <Link
                onClick={item.onClick}
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#0097a7',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Link>
            )}
          </Box>
        ))}
      </Breadcrumbs>
    </Box>
  );
};
