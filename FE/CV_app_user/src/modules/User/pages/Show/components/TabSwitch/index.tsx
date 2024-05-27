import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { activeClassname } from '@/helpers';
import UserContext from '../../contexts/userContext';
import PostTab from '../PostTab';
import SavedTab from '../SavedTab';
import WatingApproveTab from '../WatingApproveTab';
import AssessmentTab from '../AssessmentTab';
import styles from './styles.module.scss';

const TabSwitch = () => {
  const { showForCurrentUser } = useContext(UserContext);
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    setTabs([
      // {
      //   id: 'posts',
      //   name: 'Bài viết',
      //   visibility: true,
      // },
      // {
      //   id: 'waitingApprove',
      //   name: 'Chờ duyệt',
      //   visibility: showForCurrentUser,
      // },
      {
        id: 'saved',
        name: 'Đã lưu',
        visibility: showForCurrentUser,
      },
      {
        id: 'assessment',
        name: 'Đánh giá',
        visibility: showForCurrentUser,
      },
    ]);
  }, [showForCurrentUser]);

  useEffect(() => {
    if (router.query.tab) {
      setCurrentTab(router.query.tab);
    } else {
      setCurrentTab('posts');
    }
  }, [router.query.tab]);

  const loadTab = (id) => {
    if (currentTab === id || isLoading === true) return false;

    // set active in link
    setActiveTab(id);

    // show loading
    setIsLoading(true);
  };

  const setActiveTab = (tabId) => {
    router.push(`/profile/${router.query.username}?tab=${tabId}`, undefined, {
      shallow: true,
    });
  };

  const setLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <div className="col-lg-8 col-md-7">
      <div className={styles.tabSwitch}>
        <div className={styles.tabSwitch__titleLink}>
          <ul className={styles.tabs}>
            {tabs.map(
              (item, index) =>
                item.visibility && (
                  <li
                    key={index}
                    className={activeClassname(
                      styles.tabs__item,
                      currentTab === item.id,
                      styles.tabs__item_active
                    )}
                    onClick={() => loadTab(item.id)}
                  >
                    {item.name}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.tabContent}>
          {currentTab === 'posts' && <PostTab onSetLoading={setLoading} />}

          {currentTab === 'waitingApprove' && (
            <WatingApproveTab onSetLoading={setLoading} />
          )}

          {currentTab === 'saved' && <SavedTab onSetLoading={setLoading} />}

          {currentTab === 'assessment' && (
            <AssessmentTab loading={isLoading} onSetLoading={setLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabSwitch;
