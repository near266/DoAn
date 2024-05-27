import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
const timeFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const TimeCounter = ({ minutes, onFinish, eventID }) => {
  // const [preTime, setPreTime] = useState();
  const [currentTime, setCurrentTime] = useState(minutes * 60);

  // const currentUser = useSelector((state: IRootState) => state.auth.me);

  // get time from localStorage
  const localStorageTime = localStorage.getItem(`${eventID}`);
  useEffect(() => {
    if (localStorageTime) {
      setCurrentTime(parseInt(localStorageTime, 10));
    }
  }, [localStorageTime]);
  const writeLocalStorage = (time) => {
    if (eventID) localStorage.setItem(`${eventID}`, time.toString());
  };

  useEffect(() => {
    if (currentTime == 0) {
      onFinish();
      // clear currentTimer localStorage
      localStorage.removeItem(`${eventID}:${currentTime}`);
      return;
    }
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime > 0) {
          writeLocalStorage(prevTime - 1);
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <>
      <div className="time-counter tw-flex tw-items-center">
        <div className="time-counter__image">
          <img src="/images/icons/timer.svg" alt="clock" />
        </div>
        <div
          className={`${
            currentTime <= 60 ? '!tw-text-red-600' : ''
          } time-counter__timer tw-text-4xl `}
        >
          {timeFormat(currentTime)}
        </div>
      </div>
    </>
  );
};

TimeCounter.propTypes = {
  minutes: PropTypes.number,
  onFinish: PropTypes.func,
  eventID: PropTypes.string,
};

TimeCounter.defaultProps = {
  minutes: 40,
  eventID: '',
  onFinish: () => {},
};

export default TimeCounter;
