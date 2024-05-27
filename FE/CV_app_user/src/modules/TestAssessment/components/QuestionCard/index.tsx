import cx from 'classnames';
import CustomModal from '@/components/common/ConfirmModal';
import { useSnackbar } from '@/shared/snackbar';
import { IRootState } from '@/store';
import { Button, Radio, RadioGroup } from '@mui/material';
import { Empty } from 'antd';
import { debounce, throttle } from 'lodash-es';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { AssessmentStatus } from '../../shared/variables';
import TestProgress from '../TestProgress';
import styles from './styles.module.scss';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
interface IProps {
  assessmentStatus: AssessmentStatus;
  tutorial: string;
  slug: string;
  onSubmit: (answers: doneAnswer) => void;
  questions: {
    id: string | number;
    question: string;
    answers: {
      id: string | number;
      content: string;
      point?: number;
    }[];
    correctId?: number;
    suggest?: string;
    point?: number;
  }[];
}
const answerIndexToAlphabet = (index: number) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[index];
};

type QuestionsTitle = {
  questionIndex: number;
  title: string;
};

const QuestionsTitle: React.FC<QuestionsTitle> = (props) => {
  const { questionIndex, title } = props;
  return (
    <div className="title tw-w-full">
      <p className="tw-font-[600] tw-mt-3 tw-tracking-[0.1px] tw-text-[#171725] tw-leading-[34px] tw-text-[22px] ">
        Câu {questionIndex + 1}: {title}?
      </p>
    </div>
  );
};

type AnswerBlock = {
  onChoose: ({ questionId, answerId }) => void;
  answers: {
    id: string | number;
    content: string;
    point?: number;
  }[];
  questionIndex: string | number;
  answeredId?: number;
};
const AnswerBlock: React.FC<AnswerBlock> = (props) => {
  const { answers, questionIndex, answeredId, onChoose } = props;
  const [selected, setSelected] = useState(answeredId ?? null);
  const onSelect = (event) => {
    const value = +event.target.value || +event.target.id;
    setSelected(value);
    onChoose({ questionId: questionIndex, answerId: value });
  };

  return (
    <div>
      {answers && (
        <RadioGroup defaultValue="" value={selected} name="radio-buttons-group">
          {answers.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`${styles.answerItem} tw-overflow-hidden tw-flex tw-items-center tw-justify-start tw-w-full tw-rounded-[20px] tw-border-[2px] tw-border-solid tw-border-transparent hover:tw-border-[#403ECC] hover:tw-text-[#403ECC] tw-cursor-pointer tw-z-[999]`}
                id={`${item.id}`}
                onClick={onSelect}
              >
                <Radio
                  checked={selected === item.id}
                  onChange={onSelect}
                  value={item.id}
                  sx={{
                    '&.Mui-checked': {
                      color: '#403ECC',
                    },
                  }}
                  className="tw-z-0"
                  name={`answer-${item.id}`}
                />

                <p
                  className={`${
                    selected === item.id
                      ? '!tw-text-[#403ECC] tw-scale-101 tw-bg-slate-100 '
                      : ''
                  }tw-select-none tw-rounded-[10px] tw-ml-2 tw-px-1 tw-m-0 tw-font-[400] tw-text-[#696974] tw-tracking-[0.1px] tw-text-[16px] tw-leading-[28px]`}
                  style={{ pointerEvents: 'none' }}
                >
                  {answerIndexToAlphabet(index)}. {item.content}
                </p>
              </div>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
};

type TutorialBlock = {
  tutorial: string;
};

const TutorialBlock: React.FC<TutorialBlock> = (props: TutorialBlock) => {
  const { tutorial } = props;
  return (
    <div className="tw-w-full tw-h-full tw-p-4 tw-rounded-[20px] tw-text-[#22216D] tw-font-[400] tw-bg-white">
      <div className="sugesst tw-w-full tw-inline-block tw-border-0 tw-border-b-[1px] tw-mb-[25px] tw-border-solid tw-pb-[8px] tw-border-[#F1F1F5]">
        Hướng dẫn làm đánh giá
      </div>
      <div
        className="tw-mb-4 tw-font-[300] tw-text-[16px] tw-text-[#44444F] tw-leading-[24px]"
        dangerouslySetInnerHTML={{
          __html: tutorial ?? 'aaaa',
        }}
      ></div>
    </div>
  );
};

type doneAnswer = {
  questionId: number;
  answerId: number;
}[];

const validateSubmit = (answers: doneAnswer) => {
  const isValid = answers.every((item) => item.answerId !== undefined);
  return isValid;
};

/*
  search for first question is not done
  @param {array} questions - list of questions
  @param {array} answers - list of done answers
*/
const questionNotDone = (
  answers: doneAnswer,
  question: {
    id: string | number;
    question: string;
    answers: {
      id: string | number;
      content: string;
      point?: number;
    }[];
    correctId?: number;
    suggest?: string;
    point?: number;
  }[]
) => {
  if (answers.length === 0) return 1;
  if (answers.length === question.length) return -1;
  // find the first question is not done yet
  const firstNotDone = question.findIndex(
    (item) => answers.some((answer) => answer.questionId === item.id) === false
  );
  return firstNotDone + 1;
};

const QuestionCard = (props: IProps) => {
  const snackbar = useSnackbar();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { tutorial, questions, slug, assessmentStatus, onSubmit } = props;
  const [isStarted, setIsStarted] = useState(false);
  const [doneAnswer, setDoneAnswer] = useState<doneAnswer>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmBegin, setConfirmBegin] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (assessmentStatus === AssessmentStatus.IN_PROGRESS) {
      setIsStarted(true);
    }
  }, [assessmentStatus]);

  const onChoose = useCallback(
    debounce((answer) => {
      if (isAuthenticated === false) {
        return setShowModal(true);
      }
      if (assessmentStatus !== AssessmentStatus.IN_PROGRESS) {
        setConfirmBegin(true);
      }
      if (!doneAnswer.find((item) => item.questionId === answer.questionId)) {
        setDoneAnswer([...doneAnswer, answer]);
      } else {
        setDoneAnswer(
          doneAnswer.map((item) => {
            if (item.questionId === answer.questionId) {
              return answer;
            }
            return item;
          })
        );
      }
      setCurrentQuestionIndex((pre) => (questions[pre + 1] ? pre + 1 : pre));
    }, 200),
    [doneAnswer, questions, assessmentStatus]
  );

  const confirmStart = useCallback(() => {
    // if (isAuthenticated === false) {
    //   return Common.redirectToAuthenticate();
    // }
    if (isStarted === false) {
      setShowModal(!showModal);
      const currentUrl = router.asPath;
      router.push(`${currentUrl}/?start=true`, `${currentUrl}/?start=true`, {
        shallow: true,
      });
      return;
    }
  }, []);
  const onRangeQuestionChange = (event) => {
    const element = scrollRef.current;
    const inViewportWidth = element.clientWidth - 32;
    const value = event.target.id;
    element.scrollTo({
      left:
        element.scrollLeft + (value === 'btn-next' ? +inViewportWidth : -inViewportWidth),
      behavior: 'smooth',
    });
  };
  const isAnswered = (questionId: string | number) => {
    return (
      doneAnswer.find((item) => item.questionId === questionId)?.answerId ?? undefined
    );
  };
  const generatePercent = useCallback(() => {
    const total = questions.length;
    const done = doneAnswer.length;
    setPercent(Math.round((done / total) * 100));
  }, [questions, doneAnswer]);

  useLayoutEffect(() => {
    isStarted && generatePercent();
  }, [doneAnswer, questions, isStarted]);

  const submitTest = () => {
    //  href="/danh-gia-nang-luc/ket-qua/trac-nghiem-8-loai-tri-thong-minh"
    const index = questionNotDone(doneAnswer, questions);
    index === -1
      ? onSubmit(doneAnswer)
      : snackbar.showMessage(`Bạn chưa trả lời câu ${index}`, 'error');
  };
  const onTest = () => {
    setConfirmBegin(!confirmBegin);

    if (router.query.start === 'true') return;
    const currentUrl = router.asPath;
    router.push(`${currentUrl}/?start=true`, undefined, {
      shallow: true,
    });
  };
  useEffect(() => {
    const currentActiveQuestion = document.getElementById('current_active_quesition');

    if (currentActiveQuestion) {
      document.querySelector('html').style.scrollBehavior = 'auto';
      window.scrollTo({
        left: 0,
        top: window.scrollY + 0.1,
        behavior: 'auto',
      }); // trick for reset under scrollBehavior

      currentActiveQuestion.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [currentQuestionIndex]);
  return (
    <div>
      <div
        className={cx(
          'tw-flex tw-gap-5 flex-wrap-reverse flex-md-nowrap tw-justify-between tw-px-0',
          isStarted ? 'lg:tw-w-[120%]' : ''
        )}
      >
        {/* questions block */}
        {questions.length > 0 ? (
          <>
            <div
              className={`col-12 ${
                isStarted ? 'col-md-6' : 'col-md-7'
              } tw-p-4 tw-rounded-[20px] tw-bg-white tw-z-10`}
            >
              <div className="sugesst tw-w-full tw-inline-block tw-border-0 tw-border-b-[1px] tw-text-[#22216D] tw-border-solid tw-pb-[8px] tw-border-[#F1F1F5] tw-mb-[15px]">
                Chọn đáp án bạn cho là đúng nhất
              </div>
              <div className="tw-flex tw-justify-between tw-w-full  tw-gap-2">
                <Button
                  id="btn-prev"
                  className="tw-p-0 tw-m-0 tw-overflow-hidden tw-rounded-full tw-h-[48px] tw-w-[48px] !tw-min-w-[48px]"
                  style={{
                    boxShadow:
                      '5px 5px 15px rgba(68, 68, 79, 0.08), 0 1px 2px rgba(68, 68, 79, 0.08)',
                    filter: `${
                      assessmentStatus !== AssessmentStatus.IN_PROGRESS
                        ? 'grayscale(100%)'
                        : ''
                    }`,
                  }}
                  disabled={assessmentStatus !== AssessmentStatus.IN_PROGRESS}
                  onClick={onRangeQuestionChange}
                >
                  <div
                    className=" tw-h-[48px] tw-w-[48px] tw-flex tw-overflow-hidden tw-items-center tw-relative tw-rounded-full "
                    style={{ pointerEvents: 'none' }}
                  >
                    <Image
                      src="/images/icons/arrow-up.svg"
                      layout="fill"
                      priority
                      className="tw-shadow-md -tw-rotate-90"
                    />
                  </div>
                </Button>

                {isStarted && (
                  <div
                    ref={scrollRef}
                    className="tw-m-auto tw-flex tw-flex-nowrap tw-overflow-hidden tw-gap-[6px] tw-justify-start tw-align-middle hide_scrollbar "
                  >
                    {questions.map((item, index) => (
                      <div
                        id={currentQuestionIndex === index && 'current_active_quesition'}
                        className={cx(
                          'tw-h-8 !tw-min-w-[32px] tw-rounded-full tw-text-center tw-p-0 tw-m-0 tw-font-[500] tw-leading-[32px] tw-text-[#92929D]  tw-cursor-pointer tw-select-none ',
                          currentQuestionIndex === index &&
                            'tw-border tw-border-solid tw-border-[#22216D] !tw-text-[#22216D]'
                        )}
                        onClick={() => {
                          setCurrentQuestionIndex(index);
                        }}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  id="btn-next"
                  className="tw-p-0 tw-m-0 tw-overflow-hidden tw-rounded-full tw-h-[48px] tw-w-[48px] !tw-min-w-[48px]"
                  style={{
                    boxShadow: '5px 5px 15px rgba(68, 68, 79, 0.08)',
                    filter: `${
                      assessmentStatus !== AssessmentStatus.IN_PROGRESS
                        ? 'grayscale(100%)'
                        : ''
                    }`,
                  }}
                  disabled={assessmentStatus !== AssessmentStatus.IN_PROGRESS}
                  onClick={onRangeQuestionChange}
                >
                  <div
                    className=" tw-h-[48px] tw-w-[48px] tw-flex tw-overflow-hidden tw-items-center tw-relative tw-rounded-full "
                    style={{
                      pointerEvents: 'none',
                    }}
                  >
                    <Image
                      src="/images/icons/arrow-down.svg"
                      layout="fill"
                      priority
                      className="tw-shadow-md -tw-rotate-90"
                    />
                  </div>
                </Button>
              </div>
              <div className="tw-min-h-[320px] tw-max-h-fit">
                <QuestionsTitle
                  questionIndex={currentQuestionIndex}
                  title={questions[currentQuestionIndex]?.question}
                />
                <AnswerBlock
                  answers={questions[currentQuestionIndex]?.answers}
                  onChoose={onChoose}
                  answeredId={isAnswered(questions[currentQuestionIndex]?.id)}
                  questionIndex={questions[currentQuestionIndex]?.id}
                  key={currentQuestionIndex}
                />
              </div>
            </div>
            <div
              className={`col-12 ${
                isStarted ? 'col-md-3' : 'col-md-5'
              } tw-rounded-[20px] tw-bg-white tw-w-full`}
            >
              <TutorialBlock tutorial={tutorial} />
            </div>
            {isStarted && (
              <div className="col-12 col-md-3 tw-mr-auto md:tw-p-4 tw-rounded-[20px] tw-bg-white tw-overflow-hidden tw-max-w-[235px] tw-w-full">
                <TestProgress currentStep={0} percent={percent} />
              </div>
            )}
          </>
        ) : (
          <div className="col-12 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-[10px] sm:tw-rounded-[20px] tw-overflow-hidden tw-py-[40px]">
            <Empty description="Không có câu hỏi" />
          </div>
        )}
      </div>
      {isStarted && (
        <div className="tw-w-full tw-mt-5">
          <Button
            className="!tw-text-white tw-px-[16px] tw-py-[8px] tw-normal-case !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border tw-mr-auto !tw-rounded-[10px] "
            variant="contained"
            onClick={throttle(submitTest, 1000)}
          >
            Gửi đáp án
          </Button>
        </div>
      )}
      <CustomModal
        isOpen={showModal}
        onChange={(childState) => {
          setShowModal(childState);
        }}
        size="sm"
        onCancel={(e) => {
          setShowModal(false);
        }}
        onConfirm={(e) => {
          setShowModal(false);
        }}
        contentChild={
          <div className="tw-mt-3">
            <p
              className="tw-font-[500] tw-text-[18px] tw-leading-[24px] tw-text-[#000000]"
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              {'Bạn cần đăng nhập để làm đánh giá!'}
            </p>
          </div>
        }
        actionChild={
          <div className="tw-px-4 tw-gap-4 tw-flex tw-m-4">
            <Button
              className="!tw-text-[#403ECC] tw-px-[10px] tw-py-[5px] tw-normal-case  !tw-bg-white tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
              variant="outlined"
              onClick={() => {
                setShowModal(false);
              }}
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              Hủy
            </Button>
            <Button
              className="!tw-text-white tw-px-[20px] tw-py-[5px] tw-normal-case  !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
              variant="contained"
              onClick={() => {
                setShowModal(false);
                confirmStart();
              }}
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              Tiếp tục
            </Button>
          </div>
        }
      />

      <CustomModal
        isOpen={confirmBegin}
        onChange={(childState) => {
          setConfirmBegin(childState);
        }}
        size="sm"
        onCancel={(e) => {
          setConfirmBegin(false);
        }}
        onConfirm={(e) => {
          // setConfirmBegin(false);
        }}
        contentChild={
          <div className="tw-mt-3">
            <p
              className="tw-font-[500] tw-text-[18px] tw-leading-[24px] tw-text-[#000000]"
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              {'Bạn có muốn thực hiện đánh giá ngay bây giờ ?'}
            </p>
          </div>
        }
        actionChild={
          <div className="tw-px-4 tw-gap-4 tw-flex tw-m-4">
            <Button
              className="!tw-text-[#403ECC] tw-px-[10px] tw-py-[5px] tw-normal-case  !tw-bg-white tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
              variant="outlined"
              onClick={() => {
                setConfirmBegin(false);
              }}
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              Hủy
            </Button>
            <Button
              className="!tw-text-white tw-px-[20px] tw-py-[5px] tw-normal-case  !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
              variant="contained"
              onClick={onTest}
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              Tiếp tục
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default memo(QuestionCard);
