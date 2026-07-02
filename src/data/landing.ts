export type TrustedByCard = {
  title: string;
  description: string;
  icon: string;
};

export type CoursePreview = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
};

export type PastQuestionsGroup = {
  school: string;
  course: string;
  level: string;
  semester: string;
  items: Array<{ title: string; badge: string; premium?: boolean }>;
};

export const trustedBy: TrustedByCard[] = [
  { title: 'Past Questions', description: 'Find the exact papers you need—organized and searchable.', icon: '📚' },
  { title: 'Study Notes', description: 'Concise notes with clear explanations and examples.', icon: '📝' },
  { title: 'AI Tutor', description: 'Get instant help with step-by-step explanations.', icon: '🤖' },
  { title: 'Practice Quizzes', description: 'Timed quizzes that feel like real exams.', icon: '🧠' },
  { title: 'Progress Tracking', description: 'Know what to study next with smart insights.', icon: '📈' },
];

export const featuredCourses: CoursePreview[] = [
  {
    id: 'course-1',
    title: 'Mathematics: Functions Mastery',
    description: 'From fundamentals to exam-style problem solving.',
    difficulty: 'Advanced',
    duration: '3h 20m',
  },
  {
    id: 'course-2',
    title: 'English Comprehension & Essays',
    description: 'Improve reading speed and write high-scoring essays.',
    difficulty: 'Intermediate',
    duration: '2h 10m',
  },
  {
    id: 'course-3',
    title: 'Integrated Science: Exam Toolkit',
    description: 'Revision notes + practice questions across key topics.',
    difficulty: 'Beginner',
    duration: '1h 45m',
  },
  {
    id: 'course-4',
    title: 'ICT: Networks & Digital Literacy',
    description: 'Learn concepts fast with summaries and quizzes.',
    difficulty: 'Intermediate',
    duration: '2h 30m',
  },
];

export const pastQuestionsPreviewGroups: PastQuestionsGroup[] = [
  {
    school: 'SHS',
    course: 'Mathematics',
    level: 'SS2',
    semester: 'First Semester',
    items: [
      { title: 'Math Paper 1 - 2024', badge: 'Online', premium: false },
      { title: 'Algebra & Functions Marking Scheme', badge: 'Marking', premium: true },
    ],
  },
  {
    school: 'CTVET',
    course: 'Electrical Engineering',
    level: 'Level 200',
    semester: 'Second Semester',
    items: [
      { title: 'Circuit Analysis Set A', badge: 'Offline', premium: false },
      { title: 'Physics Formulas Notes', badge: 'Notes', premium: true },
    ],
  },
  {
    school: 'Tertiary',
    course: 'Integrated Science',
    level: 'Semester 1',
    semester: 'Semester 1',
    items: [
      { title: 'Integrated Science Past Questions', badge: 'Online', premium: true },
      { title: 'Biology Revision Notes', badge: 'Notes', premium: false },
    ],
  },
];

