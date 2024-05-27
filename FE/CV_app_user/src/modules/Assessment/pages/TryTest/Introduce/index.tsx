import { IAssessment } from '@/interfaces';
import styles from './styles.module.scss';

interface IProps {
  assessment: IAssessment;
}

const Introduce = ({ assessment }: IProps) => {
  return (
    <div className={styles.introduce}>
      <div className={styles.introduce__title}>
        <h2>{assessment.name}</h2>
        <p>{assessment.name}</p>
      </div>
      <div className={styles.introduceNote}>
        <div
          style={{ textAlign: 'justify' }}
          dangerouslySetInnerHTML={{
            __html: assessment.test_tutorial ?? assessment.description,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Introduce;
