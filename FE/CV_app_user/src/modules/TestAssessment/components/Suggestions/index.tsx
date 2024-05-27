import Image from 'next/image';
import { TruncateLines } from 'react-truncate-lines';
import { AssessmentType } from '../../shared/variables';
interface IProps {
  assessmentType: AssessmentType;
  suggestion: any;
  shortDesc: string;
  isFree: boolean;
  subData?: any;
  titleStyle?: string;
  descStyle?: string;
}
const BlockText: React.FC<any> = ({
  title,
  description,
  subData,
  titleStyle,
  descStyle,
}) => {
  return (
    <div className="block-text tw-w-full tw-block tw-mt-5">
      <h3
        className={`tw-font-[500] tw-leading-[28px] tw-tracking-[0.1px] tw-text-[18px] md:tw-text-[24px] tw-text-[#171725] tw-block ${titleStyle}`}
      >
        {title}&nbsp;
        {subData ? `:${subData}đ` : ''}
      </h3>
      <p
        className={`tw-font-[300] tw-leading-[26px] tw-tracking-[0.1px] tw-text-[16px]  tw-text-[#44444F] tw-block ${descStyle}`}
      >
        <div
          className="tw-whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </p>
    </div>
  );
};

const Suggestions: React.FC<IProps> = (props: IProps) => {
  const {
    assessmentType,
    isFree,
    shortDesc,
    suggestion: { textContent, general, specific, testLevel, testLevelDesc },
  } = props;
  if (assessmentType === AssessmentType.YOUR_SELF) {
    return (
      <>
        {textContent &&
          textContent
            .sort((a, b) => b.subData - a.subData)
            .map((item) => {
              return (
                <BlockText
                  title={item.title}
                  description={item.description}
                  subData={item.subData}
                />
              );
            })}
      </>
    );
  }
  if (assessmentType === AssessmentType.CAREER) {
    return (
      <>
        {specific && (
          <>
            <h3 className="tw-font-[600] tw-leading-[34px] tw-tracking-[0.1px] tw-text-[24px] md:tw-text-[28px] tw-text-[#171725] tw-block">
              Chung
            </h3>
            <BlockText
              title="Mô tả nghề:"
              description={general?.selected_career.description}
              titleStyle="!tw-text-[20px]"
              descStyle="!tw-text-[20px]"
            />
            <BlockText
              title="Năng lực thiết yếu:"
              description={general?.selected_career.required_competency}
              titleStyle="!tw-text-[20px]"
              descStyle="!tw-text-[20px]"
            />
            <BlockText
              title="Năng lực bổ sung:"
              description={general?.selected_career.additional_competency}
              titleStyle="!tw-text-[20px]"
              descStyle="!tw-text-[20px]"
            />
            <BlockText
              title="Năng lực tối thiểu:"
              description={general?.selected_career.minimum_education}
              titleStyle="!tw-text-[20px]"
              descStyle="!tw-text-[20px]"
            />
            <BlockText
              title="Con đường học tập:"
              description={general?.selected_career.learning_path}
              titleStyle="!tw-text-[20px]"
              descStyle="!tw-text-[20px]"
            />
            <BlockText
              title="Lĩnh vực chuyên sâu:"
              description={general?.selected_career.area_of_expertise}
              titleStyle="!tw-text-[20px]"
              descStyle="!tw-text-[20px]"
            />
            <h3 className="tw-font-[600] tw-leading-[34px] tw-tracking-[0.1px] tw-text-[24px] md:tw-text-[28px] tw-text-[#171725] tw-block">
              Riêng
            </h3>
          </>
        )}
        {specific &&
          specific.map((item) => {
            return (
              <BlockText
                title={item.label}
                description={item.content}
                titleStyle="!tw-text-[20px]"
                descStyle="!tw-text-[20px]"
              />
            );
          })}
      </>
    );
  }
  if (assessmentType === AssessmentType.COMPETENCY) {
    return (
      <>
        <h3 className="tw-font-[600] tw-leading-[34px] tw-tracking-[0.1px] tw-text-[24px] md:tw-text-[28px] tw-text-[#171725] tw-block tw-mt-5">
          Mức độ của bạn là: {testLevel}
        </h3>
        {isFree && (
          <div className="tw-border-[#D5D5DC] tw-border-l-[6px] tw-border-solid tw-overflow-hidden tw-border-r-0 tw-border-t-0 tw-border-b-0 tw-pl-10">
            <div className="tw-relative tw-h-[39px] tw-w-[39px]">
              <Image src={'/images/icons/quote.svg'} layout="fill" objectFit="contain" />
            </div>
            <p className="tw-text-[#403ECC] tw-text-[20px] tw-font-[400] tw-leading-[30px]">
              <div dangerouslySetInnerHTML={{ __html: testLevelDesc }}></div>
              {/* <TruncateLines lines={4} ellipsis={<span>...</span>}> */}
              {/* </TruncateLines> */}
            </p>
          </div>
        )}
        {textContent &&
          textContent.map((item) => {
            return <BlockText title={item.title} description={item.description} />;
          })}
      </>
    );
  }
};

export default Suggestions;
