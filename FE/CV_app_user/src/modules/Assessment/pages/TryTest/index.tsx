import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import cx from 'classnames';

import {
  assessmentService,
  SHOW_ASSESSMENTS_QUERY,
  GET_SIL_QUESTIONS_QUERY,
  DETAIL_SIL_QUERY,
} from '../../shared';
import { IAssessment } from '@/interfaces';
import { appLibrary } from '@/shared';
import { useSnackbar } from '@/shared/snackbar';
import { ContainerLoading } from '@/components';
import Question from './Question';
import Introduce from './Introduce';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import TimeCounter from '../../components/TimeCounter';

const TryTest = (props) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const currentUser = useSelector((state: IRootState) => state.auth.me);
  const [showTest, setShowTest] = useState(false);

  const [stateQuestions, setStateQuestions] = useState([]);
  const [doneAnswers, setDoneAnswers] = useState([]);
  const [stateAssessment, setStateAssessment] = useState<IAssessment>({});
  const [testID, setTestID] = useState('');
  const [testLimited, setTestLimited] = useState(false);
  const [eventInfo, setEventInfo] = useState({ test_time: 0 });
  const isEvent = router.query.event;
  const { loading } = useQuery(
    isEvent ? GET_SIL_QUESTIONS_QUERY : SHOW_ASSESSMENTS_QUERY,
    {
      variables: {
        slug: router.query.slug,
      },
      onCompleted: (res) => {
        if (!res) {
          return router.replace('/not-found');
        }
        if (res.assessment) {
          assessmentToQuestions(res.assessment);
        }
        if (res.sil) {
          setTestID(res.sil.id);
          silToQuestions(res.sil);
        }
      },
    }
  );
  const { data } = useQuery(DETAIL_SIL_QUERY, {
    variables: { slug: router.query.slug },
  });

  useEffect(() => {
    if (data) {
      setEventInfo(data.sil);
    }
  }, [data]);

  useEffect(() => {
    if (testID !== '') {
      getTestInfo(testID);
    }
  }, [testID]);

  const getTestInfo = async (id) => {
    try {
      const res = await assessmentService.getTestSession(id);
      if (res.code == 'ERROR') {
        snackbar.showMessage(res.message, 'error');
        setTestLimited(true);
        localStorage.removeItem(id);
      }
      setShowTest(true);
    } catch (error) {
      snackbar.showMessage('Đã có lỗi xảy ra!', 'error');
    }
  };
  if (isEvent) {
    // TODO: get time from server
  }

  const assessmentToQuestions = (assessment) => {
    const tranformQuestion = [];
    const questions = assessment.questions;
    questions.map((item) => {
      const newItem = { ...item };
      newItem.answers = JSON.parse(item.answers);
      tranformQuestion.push(newItem);
    });

    const answers = questions.map((item) => {
      return {
        questionId: item.id,
        answerId: null,
      };
    });
    setStateQuestions(tranformQuestion || []);
    setDoneAnswers(answers);
    setStateAssessment(assessment);
  };

  const silToQuestions = (sil) => {
    const tranformQuestion = [];
    const questions = sil.questions;
    questions.map((item) => {
      const newItem = { ...item };
      newItem.answers = item.answers;
      tranformQuestion.push(newItem);
    });

    const answers = questions.map((item) => {
      return {
        questionId: item.id,
        answerId: null,
      };
    });
    setStateQuestions(tranformQuestion || []);
    setDoneAnswers(answers);
    setStateAssessment(sil);
  };

  const setItIsCorrectAnswer = (questionId, answerId) => {
    const doneAnswersClone = [...doneAnswers];
    doneAnswersClone.some((item) => {
      if (item.questionId === questionId) {
        item.answerId = item.answerId === answerId ? null : answerId;
        return true;
      }
    });

    setDoneAnswers(doneAnswersClone);
  };
  const checkOncompleteQuestion = () => {
    // check answer is tick all
    for (let i = 0; i < doneAnswers.length; i++) {
      if (!doneAnswers[i].answerId) {
        snackbar.showMessage(`Bạn chưa điền đáp án cho câu số ${i + 1}`, 'warning');
        return false;
      }
    }
    return true;
  };
  const onCompleteTest = () => {
    // submit request
    if (!isEvent) {
      if (checkOncompleteQuestion() == false) {
        return;
      }
    }
    const isConfirmed = confirm(
      'Bạn có chắc chắn muốn nộp bài, hành động này không thể hoàn tác?'
    );
    if (isConfirmed) {
      requestSubmit({ answers: doneAnswers });
    }
  };

  const requestSubmit = async (queryParams) => {
    try {
      appLibrary.showloading();
      const res = isEvent
        ? await assessmentService
            .submitSilTest(testID, queryParams)
            .finally(() => appLibrary.hideloading())
        : await assessmentService
            .submitAssessmentTest(stateAssessment.id, queryParams)
            .finally(() => appLibrary.hideloading());
      if (res.code === 'ERROR') {
        snackbar.showMessage(res.message, 'error');
        return;
      }
      if (!res) {
        snackbar.showMessage('Đã có lỗi xảy ra!', 'error');
      }
      onDoneSummit();
    } catch (error) {
      snackbar.showMessage('Đã có lỗi xảy ra!', 'error');
    }
  };

  const onDoneSummit = () => {
    isEvent
      ? router.push(`/viral/${stateAssessment.slug}`)
      : router.push(`/view-test-result/${stateAssessment.slug}`);
  };
  // submit even user not complete the test
  const onUnfinishedTest = async () => {
    requestSubmit({ answers: doneAnswers });
  };

  return (
    // if is evvent va
    <ContainerLoading loading={loading}>
      <section id={styles.quizPage}>
        <div className="container">
          <Introduce assessment={stateAssessment} />
          {testLimited ? (
            <div className="tw-flex tw-justify-center">
              <button
                type="button"
                className={cx('btn btn-common  ', styles.footer__submitButton)}
                onClick={onDoneSummit}
              >
                Xem kết quả
              </button>
            </div>
          ) : (
            <>
              <div className={styles.quiz}>
                {stateQuestions.map((item, index) => (
                  <Question
                    key={item.id}
                    index={index}
                    question={item}
                    doneAnswers={doneAnswers}
                    setItIsCorrectAnswer={setItIsCorrectAnswer}
                  />
                ))}
              </div>
              <div className={styles.timer}>
                {isEvent && showTest ? (
                  <TimeCounter
                    minutes={eventInfo.test_time}
                    onFinish={eventInfo.test_time > 0 ? onUnfinishedTest : () => {}}
                    eventID={testID}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.footer__container}>
                <button
                  type="button"
                  // disabled={testLimited}
                  className={cx('btn btn-common ', styles.footer__submitButton)}
                  onClick={() => onCompleteTest()}
                >
                  Xem kết quả
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </ContainerLoading>
  );
};

export default TryTest;
