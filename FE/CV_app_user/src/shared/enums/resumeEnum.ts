export const BLOCKY_TYPE = {
  objective: 'objectiveBlocky',
  education: 'educationBlocky',
  experience: 'experienceBlocky',
  activity: 'activityBlocky',
  skill: 'skillBlocky',
  other: 'otherBlocky',
};

export const BLOCKY_ARRAY_LIST = [
  BLOCKY_TYPE.objective,
  BLOCKY_TYPE.education,
  BLOCKY_TYPE.experience,
  BLOCKY_TYPE.activity,
  BLOCKY_TYPE.skill,
  BLOCKY_TYPE.other,
];

export const BLOCKY_KEYS_MAP = {
  [BLOCKY_TYPE.objective]: ['objective_headline', 'objective_content'],
  [BLOCKY_TYPE.education]: ['education_headline', 'educations'],
  [BLOCKY_TYPE.experience]: ['experience_headline', 'experiences'],
  [BLOCKY_TYPE.activity]: ['activity_headline', 'activities'],
  [BLOCKY_TYPE.skill]: ['skill_headline', 'skills'],
  [BLOCKY_TYPE.other]: ['other_headline', 'other_content'],
};
