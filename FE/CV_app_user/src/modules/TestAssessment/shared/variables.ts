export enum AssessmentStatus {
  START = 'START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum AssessmentType {
  YOUR_SELF = 'ASSESSMENT_YOURSELF',
  CAREER = 'ASSESSMENT_CAREER',
  COMPETENCY = 'ASSESSMENT_COMPETENCY',
}
export enum AssessmentTypeNumeric {
  YOUR_SELF = 1,
  CAREER = 2,
  COMPETENCY = 3,
}

export enum CounselDataType {}

const ASSESSMENT_CODE_YOURSELF = 'ASSESSMENT_YOURSELF';
const ASSESSMENT_CODE_CAREER = 'ASSESSMENT_CAREER';
const ASSESSMENT_CODE_COMPETENCY = 'ASSESSMENT_COMPETENCY';
export enum SuggestionStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCEL = 'CANCEL',
  RESOLVE = 'RESOLVE',
}

export enum FILTER_OPTS {
  LASTEST = 'moi-nhat',
  POPULAR = 'pho-bien',
  ALL = 'tat-ca',
}

export const defaultPaginationSize = 12;
