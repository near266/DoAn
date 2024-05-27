export enum PaymentMethodCode {
  VNPAY = 'captureWallet',
  MOMO = 'captureWallet',
  ATM = 'payWithATM',
  ALEPAY = 'alepay',
}
export const JobInfoEnum = {
  active_status_id: {
    active: '1',
  },
  approve_status_id: {
    approve: '2',
  },
  gender: [
    {
      label: 'Nam',
      value: 1,
    },
    {
      label: 'Nữ',
      value: 2,
    },
    {
      label: 'Không yêu cầu',
      value: 3,
    },
  ],
  type_of_job: [
    {
      label: 'Full Time',
      value: 1,
    },
    {
      label: 'Part Time',
      value: 2,
    },
    {
      label: 'Remote',
      value: 3,
    },
    {
      label: 'Ngoại khoá',
      value: 4,
    },
  ],
  level: [
    { label: 'Intern', value: 1 },
    { label: 'Junior', value: 2 },
    { label: 'Senior', value: 3 },
    { label: 'Manager', value: 4 },
    { label: 'Head', value: 5 },
  ],
  level_user: [
    { name: 'Sinh viên', code: 'S-01' },
    { name: 'Entry Level', code: 'S-02' },
    { name: 'Mid Level', code: 'S-03' },
    { name: 'Senior Level', code: 'S-04' },
    { name: 'Directors', code: 'S-05' },
    { name: 'Tình nguyện viên', code: 'S-06' },
  ],
  rankSalary: [
    { name: '1.5 triệu - 4 triệu', code: 'R-01', checked: false },
    { name: '4 triệu - 8 triệu', code: 'R-02', checked: false },
    { name: '7 triệu - 12 triệu', code: 'R-03', checked: false },
    { name: '12 triệu - 20 triệu', code: 'R-04', checked: false },
    { name: '20 triệu - 32 triệu', code: 'R-05', checked: false },
    { name: 'Lương thoả thuận', code: 'R-06', checked: false },
  ],
  diploma: [
    { label: 'Đại học', value: 1 },
    { label: 'Cao đẳng', value: 2 },
    { label: 'Tốt nghiệp THPT', value: 3 },
    { label: 'Không yêu cầu bằng cấp', value: 4 },
  ],
  filed: [
    { label: 'Giáo dục/Đào tạo', value: 1 },
    { label: 'Báo trí/Truyền hình', value: 2 },
  ],
  probation_period: [
    { label: '1 tháng', value: 1 },
    { label: '2 tháng', value: 2 },
    { label: '3 tháng', value: 3 },
  ],
  exp: [
    { label: '1 năm', value: 1 },
    { label: '2 năm', value: 2 },
    { label: 'Trên 3 năm', value: 3 },
    { label: 'Không yêu cầu kinh nghiệm', value: 4 },
  ],
  profession: [
    { label: 'Intern', value: 1 },
    { label: 'Junior', value: 2 },
    { label: 'Senior', value: 3 },
    { label: 'Manager', value: 4 },
    { label: 'Head', value: 5 },
  ],
  salary: [
    { label: 'Thoả thuận', value: 1 },
    { label: 'Tự chọn', value: 2 },
  ],
  status_offer: [{ sent: 1 }, { approved: 2 }, { cancel: 0 }, { enterprise_cancel: 3 }],
};
