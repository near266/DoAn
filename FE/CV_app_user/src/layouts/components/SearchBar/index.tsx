import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import cx from 'classnames';

import { httpClient } from '@/core';
import { activeClassname } from '../../../helpers/helper';
import { ContainerLoading } from '@/components';
import EmptyText from './EmptyText';
import PostItem from './PostItem';
import styles from './styles.module.scss';

const waitingTime = 400; // milliseconds
let cancelRequest;
interface Iprops {
  customStyle: {
    searchBar?: string;
    searchBox?: string;
    searchBox__icon?: string;
    searchBox__input?: string;
    searchResult?: string;
    searchResult__content?: string;
    searchResult__active?: string;
  };
  click?: number;
}
const SearchBar = (props: Iprops) => {
  const [showResultBox, setShowResultBox] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const wrapperRef = useRef(null);
  const { customStyle } = props;
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (props.click > 0) {
      searchByClick();
    }
  }, [props.click]);

  const searchByClick = () => {
    clearTimeout(timer);

    setShowResultBox(true);
    if (!searchInputRef.current.value) {
      setPosts([]);
      return;
    }
    const timeoutVariable = setTimeout(() => {
      setIsLoading(true);
      return searchAction(searchInputRef.current.value).finally(() =>
        setIsLoading(false)
      );
    }, waitingTime);
    setTimer(timeoutVariable);
  };
  /**
   * Trigger if clicked on outside of element.
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResultBox(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const searchAction = (query) => {
    return httpClient
      .get('search', {
        params: {
          q: query,
          fields: 'id,name,slug,view_number,avatar,created_by',
          relationFields: 'creator:id,name,username',
        },
        cancelToken: new axios.CancelToken(function executor(cancel) {
          // An executor function receives a cancel function as a parameter
          cancelRequest = cancel;
        }),
      })
      .then((response) => {
        const res = response.data;

        if (res?.code === 'SUCCESS') {
          setPosts(res.payload);
        }
        return;
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          // handle cancel request
        }
      });
  };

  const onClickInput = () => {
    setShowResultBox(true);
  };

  const onTypeSearch = (evt) => {
    clearTimeout(timer);
    const inputValue = evt.target.value;

    // cancel current request when user change input
    if (isLoading === true) {
      cancelRequest();
    }

    // apply empty post when user remove input
    if (!inputValue) {
      setPosts([]);
      return;
    }

    // set timeout for request
    const timeoutVariable = setTimeout(() => {
      setIsLoading(true);
      return searchAction(inputValue).finally(() => setIsLoading(false));
    }, waitingTime);

    setTimer(timeoutVariable);
  };

  // view variables
  const Posts =
    posts.length !== 0 && posts.map((item) => <PostItem key={item.id} post={item} />);

  return (
    <div className={customStyle.searchBar ?? styles.searchBar} ref={wrapperRef}>
      <div className={customStyle.searchBox ?? styles.searchBox}>
        <input
          type="text"
          name="search-box"
          placeholder="Tìm kiếm bài viết"
          autoComplete="off"
          onClick={onClickInput}
          onKeyUp={(evt) => onTypeSearch(evt)}
          className={customStyle.searchBox__input}
          ref={searchInputRef}
        />
        <i
          className={cx(
            'fas fa-search',
            customStyle.searchBox__icon ?? styles.searchBox__icon
          )}
        />
      </div>

      <div
        className={activeClassname(
          customStyle.searchResult ?? styles.searchResult,
          showResultBox,
          customStyle.searchResult__active ?? styles.searchResult__active
        )}
      >
        <div
          className={customStyle.searchResult__content ?? styles.searchResult__content}
        >
          <ContainerLoading loading={isLoading} loadingWidth={78} loadingSize="small">
            {Posts}
            {posts.length === 0 && (
              <EmptyText searchValue={searchInputRef?.current?.value} />
            )}
          </ContainerLoading>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
