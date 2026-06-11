import type { Achievement, Notification, PastQuestion, Subject, Testimonial, Resource, SubjectDetail } from './types';

export const subjects: Subject[] = [
  { id: 'math', title: 'Mathematics', description: 'Concepts, formulas, and exam strategies.', difficulty: 'Advanced', resources: 56, color: 'from-sky-500 to-cyan-500', icon: '∑' },
  { id: 'english', title: 'English Language', description: 'Reading, writing, and communication skills.', difficulty: 'Intermediate', resources: 42, color: 'from-indigo-500 to-violet-500', icon: '📚' },
  { id: 'science', title: 'Integrated Science', description: 'Biology, chemistry, and physics essentials.', difficulty: 'Intermediate', resources: 48, color: 'from-emerald-500 to-teal-500', icon: '🔬' },
  { id: 'social', title: 'Social Studies', description: 'Citizenship, culture, and national development.', difficulty: 'Easy', resources: 34, color: 'from-orange-500 to-amber-500', icon: '🌍' },
  { id: 'tech-drawing', title: 'Technical Drawing', description: 'Visual design principles and drafting practice.', difficulty: 'Advanced', resources: 22, color: 'from-rose-500 to-fuchsia-500', icon: '📐' },
  { id: 'auto', title: 'Automotive Engineering', description: 'Engine mechanics and vehicle systems.', difficulty: 'Advanced', resources: 18, color: 'from-slate-600 to-slate-400', icon: '🚗' },
  { id: 'electrical', title: 'Electrical Engineering', description: 'Circuits, power systems, and electronics.', difficulty: 'Advanced', resources: 25, color: 'from-yellow-500 to-amber-500', icon: '⚡' },
  { id: 'ict', title: 'ICT', description: 'Software, networks, and digital literacy.', difficulty: 'Intermediate', resources: 38, color: 'from-cyan-600 to-blue-500', icon: '💻' },
];

export const resources: Resource[] = [
  { id: 'res1', title: 'Algebra and Functions Workbook', subject: 'Mathematics', type: 'Notes', year: 2024, downloads: 1240, uploadedAt: '2024-11-15', premium: false, description: 'Comprehensive guide to algebraic functions' },
  { id: 'res2', title: 'Calculus Past Paper Solutions', subject: 'Mathematics', type: 'Marking Schemes', year: 2023, downloads: 890, uploadedAt: '2024-10-20', premium: true, description: 'Full marking scheme with solutions' },
  { id: 'res3', title: 'Essay Writing Guide', subject: 'English Language', type: 'Notes', year: 2024, downloads: 560, uploadedAt: '2024-11-10', premium: false, description: 'Master essay writing techniques' },
  { id: 'res4', title: 'English Past Questions 2024', subject: 'English Language', type: 'Past Questions', year: 2024, downloads: 1560, uploadedAt: '2024-11-08', premium: false, description: 'Complete English papers' },
  { id: 'res5', title: 'Biology Revision Notes', subject: 'Integrated Science', type: 'Notes', year: 2024, downloads: 2100, uploadedAt: '2024-11-05', premium: false, description: 'Detailed biology concepts' },
  { id: 'res6', title: 'Physics Formulas Sheet', subject: 'Integrated Science', type: 'Notes', year: 2024, downloads: 1850, uploadedAt: '2024-11-01', premium: true, description: 'All physics formulas organized' },
  { id: 'res7', title: 'African History Notes', subject: 'Social Studies', type: 'Notes', year: 2024, downloads: 740, uploadedAt: '2024-10-28', premium: false, description: 'African history and culture' },
  { id: 'res8', title: 'Circuit Analysis Tutorial', subject: 'Electrical Engineering', type: 'Video Tutorials', year: 2024, downloads: 2340, uploadedAt: '2024-11-12', premium: true, description: 'Video guide to circuit analysis' },
  { id: 'res9', title: 'Technical Drawing Standards', subject: 'Technical Drawing', type: 'Notes', year: 2024, downloads: 450, uploadedAt: '2024-10-25', premium: false, description: 'Standards and best practices' },
  { id: 'res10', title: 'ICT Networking Guide', subject: 'ICT', type: 'Notes', year: 2024, downloads: 980, uploadedAt: '2024-11-03', premium: false, description: 'Complete networking concepts' },
  { id: 'res11', title: 'Engine Mechanics Video', subject: 'Automotive Engineering', type: 'Video Tutorials', year: 2024, downloads: 1200, uploadedAt: '2024-10-30', premium: true, description: 'Engine mechanics explained' },
  { id: 'res12', title: 'Mathematics Mock Exam 2024', subject: 'Mathematics', type: 'Mock Exams', year: 2024, downloads: 3400, uploadedAt: '2024-11-18', premium: false, description: 'Full mock exam with solutions' },
];

export const stats = [
  { label: 'Students', value: '18,900+' },
  { label: 'Subjects', value: '8 Core Streams' },
  { label: 'Past Questions', value: '1,260+' },
];

export const testimonials: Testimonial[] = [
  { name: 'Abena Osei', role: 'SHS Student', quote: 'ISA Learn helped me master exam topics quickly and build confidence for my final papers.' },
  { name: 'Kwesi Mensah', role: 'CTVET Learner', quote: 'The mock exams are structured like the real thing, and the instant grading is a game changer.' },
  { name: 'Efia Asante', role: 'Tertiary Student', quote: 'I love how easy it is to find notes, past questions, and curated study tracks in one place.' },
];

export const pastQuestions: PastQuestion[] = [
  { subject: 'Mathematics', year: '2024', title: 'Math Paper 1', availableOnline: true, premium: false },
  { subject: 'English Language', year: '2023', title: 'English Comprehension', availableOnline: true, premium: false },
  { subject: 'Integrated Science', year: '2022', title: 'Integrated Science Set A', availableOnline: false, premium: true },
  { subject: 'Technical Drawing', year: '2024', title: 'Drawing Fundamentals', availableOnline: true, premium: true },
  { subject: 'Electrical Engineering', year: '2023', title: 'Circuit Analysis', availableOnline: false, premium: false },
];

export const achievements: Achievement[] = [
  { title: 'First Mock Exam', description: 'Completed your first quiz and unlocked your achievement badge.', progress: 100 },
  { title: 'Study Streak', description: '5 days of continuous practice and learning.', progress: 75 },
  { title: 'Top Contributor', description: 'Saved and shared 10 study resources.', progress: 60 },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'New premium notes available', description: 'Explore updated Electrical Engineering solutions.', time: '2h ago' },
  { id: 'n2', title: 'Mock exam alert', description: 'A new timed quiz for Mathematics is live.', time: '5h ago' },
  { id: 'n3', title: 'Profile verified', description: 'Your student profile is now complete.', time: '1d ago' },
];
