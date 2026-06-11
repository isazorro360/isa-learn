export type Subject = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  resources: number;
  color: string;
  icon: string;
};

export type Resource = {
  id: string;
  title: string;
  subject: string;
  type: 'Notes' | 'Past Questions' | 'Marking Schemes' | 'Mock Exams' | 'Video Tutorials';
  year: number;
  downloads: number;
  uploadedAt: string;
  premium: boolean;
  description: string;
};

export type SubjectDetail = Subject & {
  totalResources: number;
  lastUpdated: string;
  studentsEnrolled: number;
};

export type ResourceItem = {
  title: string;
  subject: string;
  summary: string;
  tag: string;
  premium?: boolean;
};

export type PastQuestion = {
  subject: string;
  year: string;
  title: string;
  availableOnline: boolean;
  premium: boolean;
};

export type PastQuestionDoc = {
  id: string;
  title: string;
  subject: string;
  year: number;
  category: 'Past Question' | 'Marking Scheme' | 'Notes';
  description: string;
  fileName: string;
  fileUrl: string;
  storagePath?: string;
  uploadedBy: string;
  createdAt: Date;
};

export type BookmarkDoc = {
  id: string;
  userId: string;
  resourceId: string;
  title: string;
  subject: string;
  category: string;
  year: number;
  description: string;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
};

export type Achievement = {
  title: string;
  description: string;
  progress: number;
};

export type UserProfileDoc = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  createdAt: Date;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};
