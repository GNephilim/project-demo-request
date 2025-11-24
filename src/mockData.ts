// Mock data for dropdowns and related information

export interface Department {
  id: string;
  name: string;
}

export interface Sponsor {
  id: string;
  departmentId: string;
  name: string;
  email: string;
}

export interface ProgrammingLanguage {
  id: string;
  name: string;
}

export interface DatabaseType {
  id: string;
  name: string;
}

export interface TargetAudience {
  id: string;
  name: string;
}

// Departments with associated sponsors
export const departments: Department[] = [
  { id: 'dept-001', name: 'Sales & Marketing' },
  { id: 'dept-002', name: 'Operations' },
  { id: 'dept-003', name: 'Finance' },
  { id: 'dept-004', name: 'Human Resources' },
  { id: 'dept-005', name: 'Product Development' },
  { id: 'dept-006', name: 'Customer Success' },
];

// Sponsors mapped to departments
export const sponsors: Sponsor[] = [
  { id: 'sponsor-001', departmentId: 'dept-001', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: 'sponsor-002', departmentId: 'dept-001', name: 'Mike Chen', email: 'mike.chen@company.com' },
  { id: 'sponsor-003', departmentId: 'dept-002', name: 'Jennifer Lee', email: 'jennifer.lee@company.com' },
  { id: 'sponsor-004', departmentId: 'dept-003', name: 'Robert Williams', email: 'robert.williams@company.com' },
  { id: 'sponsor-005', departmentId: 'dept-004', name: 'Patricia Brown', email: 'patricia.brown@company.com' },
  { id: 'sponsor-006', departmentId: 'dept-005', name: 'David Martinez', email: 'david.martinez@company.com' },
  { id: 'sponsor-007', departmentId: 'dept-005', name: 'Emily Davis', email: 'emily.davis@company.com' },
  { id: 'sponsor-008', departmentId: 'dept-006', name: 'James Wilson', email: 'james.wilson@company.com' },
];

// Programming Languages
export const programmingLanguages: ProgrammingLanguage[] = [
  { id: 'lang-001', name: 'TypeScript' },
  { id: 'lang-002', name: 'JavaScript' },
  { id: 'lang-003', name: 'Python' },
  { id: 'lang-004', name: 'Java' },
  { id: 'lang-005', name: 'C#' },
  { id: 'lang-006', name: 'Go' },
  { id: 'lang-007', name: 'Rust' },
  { id: 'lang-008', name: 'PHP' },
  { id: 'lang-009', name: 'Ruby' },
];

// Database Types
export const databaseTypes: DatabaseType[] = [
  { id: 'db-001', name: 'PostgreSQL' },
  { id: 'db-002', name: 'MySQL' },
  { id: 'db-003', name: 'MongoDB' },
  { id: 'db-004', name: 'SQL Server' },
  { id: 'db-005', name: 'Oracle' },
  { id: 'db-006', name: 'Firebase' },
  { id: 'db-007', name: 'Redis' },
  { id: 'db-008', name: 'Elasticsearch' },
];

// Target Audiences
export const targetAudiences: TargetAudience[] = [
  { id: 'aud-001', name: 'Executive Leadership' },
  { id: 'aud-002', name: 'Department Managers' },
  { id: 'aud-003', name: 'Individual Contributors' },
  { id: 'aud-004', name: 'Technical Team' },
  { id: 'aud-005', name: 'End Users' },
  { id: 'aud-006', name: 'Stakeholders' },
  { id: 'aud-007', name: 'Partners' },
];

// Helper function to get sponsors by department
export const getSponsorsByDepartment = (departmentId: string): Sponsor[] => {
  return sponsors.filter((sponsor) => sponsor.departmentId === departmentId);
};
