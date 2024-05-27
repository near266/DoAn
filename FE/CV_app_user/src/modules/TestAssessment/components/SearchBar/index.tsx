import PropTypes from 'prop-types';
export interface IProps {
  placeholder: string;
  onChange: (value: string) => void;
}
const TestSearchBar: React.FC<IProps> = (props: IProps) => {
  const { placeholder, onChange } = props;
  const onIconPressed = () => {};
  const onSearchTextChanged = (event) => {
    onChange(event.target.value);
  };
  return (
    <div>
      <div className="tw-bg-white tw-p-[0.65rem] tw-overflow-hidden md:!tw-p-[15px] tw-border-[1px] tw-border-solid tw-border-[#F1F1F5] tw-rounded-[15px] ">
        <input
          className="tw-outline-none tw-text-sm tw-text-[#92929D] tw-outline-hidden tw-outline-0 tw-border-none tw-font-[400] tw-leading-[20px] tw-w-[calc(100%-30px)]"
          placeholder={placeholder ?? 'Tìm kiếm'}
          onChange={onSearchTextChanged}
        />
        <div onClick={onIconPressed} className="tw-contents tw-cursor-pointer ">
          <img
            src="/images/icons/jobview/search.svg"
            width={24}
            height={24}
            alt=" Youth Tìm kiếm đánh giá"
          />
        </div>
      </div>
    </div>
  );
};

TestSearchBar.propTypes = {
  placeholder: PropTypes.string,
};
export default TestSearchBar;
