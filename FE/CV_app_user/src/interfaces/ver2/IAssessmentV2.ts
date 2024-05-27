import { AssessmentType } from '@/modules/TestAssessment/shared/variables';

export default interface IAssessmentV2 {
  id: number;
  slug: string;
  name: string;
  duration: number;
  originPrice: number;
  salePrice: number;
  assessmentType: AssessmentType;
  avatar: string;
  content?: string;
  saleCode?: number;
  questionCount: number;
  testTutorial?: string;
  description?: string;
  short_desc?: string;
  sumittedCount?: number;
  questions: {
    id: number;
    question: string;
    answers: { id: number; point?: number; content: string }[];
    correctId?: number;
    suggest?: string;
  }[];
}
