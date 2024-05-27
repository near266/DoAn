import IAssessmentV2 from '@/interfaces/ver2/IAssessmentV2';
import { HtmlHeader } from '@/layouts/components';
import ViewResultVer1 from '@/modules/TestAssessment/pages/Result';
import {
  AssessmentType,
  SuggestionStatus,
} from '@/modules/TestAssessment/shared/variables';
import { Common } from '@/shared';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import AfterTest from '../../../../components/common/ConfirmModal/modal';
import { useState } from 'react';
import UploadCVModal from '@/components/common/UploadCVModal';

const TestResult = (props) => {
  const { chartData, suggestions, assessment } = props;
  const [confirmModal, setConfirmModal] = useState(true);
  const closeConfirmModal = () => {
    return setConfirmModal(false);
  };
  const [uploadCVModal, setUploadCVModal] = useState(false);
  const closeUploadCVModal = () => setUploadCVModal(false);
  const openUploadCVModal = () => setUploadCVModal(true);
  return (
    <div>
      <HtmlHeader title="Kết quả đánh giá" />
      <ViewResultVer1
        chartData={chartData}
        suggestions={suggestions}
        assessment={assessment}
      />
      {confirmModal && (
        <AfterTest
          onOpenUploadCVModal={openUploadCVModal}
          onClose={closeConfirmModal}
        ></AfterTest>
      )}
      {uploadCVModal && <UploadCVModal onClose={closeUploadCVModal}></UploadCVModal>}
    </div>
  );
};

const genAssessmentInfo = (props): IAssessmentV2 => {
  const {
    name,
    question_count,
    slug,
    original_price,
    sale_price,
    test_time,
    test_type,
    id,
    short_desc,
  } = props || {};
  return {
    id: id ?? 0,
    name: name ?? '',
    questionCount: question_count ?? 0,
    slug: slug ?? '/',
    originPrice: original_price ?? 0,
    salePrice: sale_price ?? 0,
    duration: test_time ?? 0,
    short_desc: short_desc ?? '',
    assessmentType: test_type ?? '',
  } as IAssessmentV2;
};

const genChartData = (
  data: any,
  chartType: AssessmentType
): { subject: string; point: number; fullMark: number }[] | number => {
  if (chartType === AssessmentType.YOUR_SELF) {
    if (data.length === 0) return [];
    return data.map((item) => {
      return {
        subject: item.name,
        point: item.point,
        fullMark: item.max_point,
      };
    });
  }
  if (chartType === AssessmentType.COMPETENCY) {
    if (data.length === 0) return [];
    return data.map((item) => {
      return {
        subject: item.name,
        point: item.level,
        fullMark: 5,
      };
    });
  }

  if (chartType === AssessmentType.CAREER) {
    if (data < 0) return 0;
    return data;
  }

  return [];
};

const genSuggestion = (result: any, chartType: AssessmentType): any => {
  const finalSuggestion = {
    textContent: [],
    mentors: [],
    jobs: [],
    testLevel: 0,
    testLevelDesc: '',
    general: [],
    specific: [],
  };
  const {
    suggestion: { content },
  } = result;
  const prased = JSON.parse(content ?? '');

  if (chartType === AssessmentType.YOUR_SELF) {
    const { data } = result;
    const {
      info,
      suggestion: { mentors, careers },
    } = prased;
    // lấy dữ liệu từ gợi ý trả về
    const fromSugesstion = info?.map((item) => {
      return {
        title: item.label,
        description: item.content,
        subData: null,
      };
    });
    // lấy dữ liệu từ mô tả của chart
    const fromChart = data.map((item) => {
      return {
        title: item.name ?? '',
        description: item.description ?? '',
        subData: item.point ?? '',
      };
    });

    finalSuggestion.textContent = [...fromChart, ...fromSugesstion];
    finalSuggestion.mentors = mentors ?? [];
    finalSuggestion.jobs = careers ?? [];
  }
  if (chartType === AssessmentType.COMPETENCY) {
    const { test_level, level_description } = result;
    const {
      info,
      suggestion: { mentors, careers },
    } = prased;

    const fromSugesstion = info?.map((item) => {
      return {
        title: item.label,
        description: item.content,
        subData: null,
      };
    });
    finalSuggestion.textContent = fromSugesstion ?? [];
    finalSuggestion.mentors = mentors ?? [];
    finalSuggestion.jobs = careers ?? [];
    finalSuggestion.testLevel = test_level ?? 0;
    finalSuggestion.testLevelDesc = level_description ?? '';
  }

  if (chartType === AssessmentType.CAREER) {
    const {
      info,
      suggestion: { mentors, careers },
    } = prased;
    finalSuggestion.general = info.general.data ?? [];
    finalSuggestion.specific = info.specific.data ?? [];
    finalSuggestion.mentors = mentors ?? [];
    finalSuggestion.jobs = careers ?? [];
  }
  return finalSuggestion;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const headers: any = {
      Accept: 'application/json',
    };

    const accessToken = Common.getAccessTokenFromServerSide(ctx.req.headers.cookie);

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const { slug } = ctx.query;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_V2}/get-assessment-test-result/${slug}`,
      { headers }
    );
    const { data } = res;

    const { status } = data.result.suggestion || '';

    const assessment = genAssessmentInfo(data);
    const suggestionData =
      status && status === SuggestionStatus.RESOLVE
        ? genSuggestion(data.result, data.test_type)
        : data.test_type === AssessmentType.YOUR_SELF
        ? // fix tam nhe =)
          {
            textContent: data.result.data.map((item) => {
              return {
                title: item.name ?? '',
                description: item.description ?? '',
                subData: item.point ?? '',
              };
            }),
          }
        : data.test_type === AssessmentType.COMPETENCY
        ? {
            testLevel: data?.result?.test_level,
            testLevelDesc: data?.result?.level_description,
          }
        : {};
    const suggestions = {
      status: status ?? '',
      data: suggestionData,
    };

    const chartData = genChartData(data.result.data, data.test_type);
    return {
      props: {
        chartData,
        suggestions,
        assessment,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default TestResult;
