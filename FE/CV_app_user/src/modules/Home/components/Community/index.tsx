import styles from './styles.module.scss';

const Community = (props) => {
  return (
    <section className={styles.community}>
      <div className="container">
        <div className={styles.title}>Youth +</div>
        <div className="row">
          <div className="col-lg-5 col-md-4">
            <div className={styles.box} style={{ borderRight: '4px solid #3da4d8' }}>
              <div className={styles.box__row}>
                <div className={styles.logoBox}>
                  <img
                    className={styles.logoBox__logo}
                    src="/images/homepage/logo.png"
                    alt="Eztek"
                  />
                </div>
                <div className={styles.logoBox}>
                  <img
                    className={styles.logoBox__logo}
                    src="/images/homepage/logo-2.png"
                    alt="logo"
                  />
                </div>
              </div>
              <div className={styles.box__row}>
                <div className={styles.logoBox}>
                  <img
                    className={styles.logoBox__logo}
                    src="/images/homepage/youth-academy.png"
                    alt="Eztek Academy"
                  />
                </div>
                <div className={styles.logoBox}>
                  <img
                    className={styles.logoBox__logo}
                    src="/images/homepage/youth-mentor.png"
                    alt="Eztek Mentor"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-8">
            <div className={styles.box}>
              <div className={styles.box__row}>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/sye.png"
                    alt="SYE"
                  />
                </div>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/SIL.png"
                    alt="SIL"
                  />
                </div>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/logo-3.png"
                    alt="SYE"
                  />
                </div>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/YE.png"
                    alt="SYE"
                  />
                </div>
              </div>
              <div className={styles.box__row}>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/YTV.png"
                    alt="YTV"
                  />
                </div>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/logo-4.png"
                    alt="YTV"
                  />
                </div>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/logo-5.png"
                    alt="YTV"
                  />
                </div>
                <div className={styles.logoBoxRight}>
                  <img
                    className={styles.logoBoxRight__logo}
                    src="/images/homepage/PSYHUB.png"
                    alt="PSYHUB"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
