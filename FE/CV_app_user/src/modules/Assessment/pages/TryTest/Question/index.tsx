import cx from 'classnames';

import styles from './styles.module.scss';
import { activeClassname } from '@/helpers';

const answerAnphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const Question = (props) => {
  const isAnswerActive = (questionId, answerId) => {
    if (props.doneAnswers.length) {
      const answer = props.doneAnswers.find((item) => item.questionId === questionId);
      return answer.answerId === answerId;
    }
    return false;
  };

  // template
  const MultiChoiceAnswer = (question, answer, index) => (
    <div
      className={styles.answer__content}
      onClick={() => props.setItIsCorrectAnswer(question.id, answer.id)}
    >
      <div className={styles.anphabet}>
        <span
          className={activeClassname(
            styles.anphabet__item,
            isAnswerActive(question.id, answer.id),
            styles.anphabet__itemActive
          )}
        >
          {answerAnphabet[index]}.&nbsp;
        </span>
      </div>
      {answer.content}
    </div>
  );

  return (
    <div className={styles.question}>
      <div className={styles.question__name}>
        <span className={styles.question__no}>{props.index + 1}.&nbsp;</span>
        <span>{props.question.content}</span>
      </div>
      <div className={cx('row', styles.answer)}>
        {props.question.answers &&
          props.question.answers.map((answer, answerIndex) => (
            <div
              className={cx('col-md-2 col-sm-6', styles.answer__item)}
              key={answerIndex}
            >
              {MultiChoiceAnswer(props.question, answer, answerIndex)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Question;
