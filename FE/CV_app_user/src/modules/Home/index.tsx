import { IPost, IServerResponse } from '@/interfaces';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Assessments, Introduction, JobsView, Partner, Topics } from './components';
import { homeService } from './shared';

const Posts = dynamic(() => import('./components/Posts'), { ssr: false });
const Mentors = dynamic(() => import('./components/Mentors'), { ssr: false });
const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);

  const getPostData = async () => {
    /* migrate to realtime data fetching */
    const res = await homeService.getHomePosts();
    return res;
  };

  const { data } = useSWR<IServerResponse, IPost>('get-home-post', getPostData);

  useEffect(() => {
    setIsFetchingPosts(true);
    if (data) {
      setPosts(data.payload);
      setIsFetchingPosts(false);
    }
    console.log('posts', posts);
  }, [data]);
  return (
    // background-image: ;

    <div
      className="tw-bg-[url('/images/homepage/body-bg.svg')] tw-bg-no-repeat -tw-z-0 tw-bg-left-top"
      style={{ backgroundPositionY: '-80px' }}
    >
      <Introduction />
      <JobsView />
      <Assessments />
      <Posts posts={posts} isFetching={isFetchingPosts} />
      <Topics />
      <Mentors />
      <Partner />
      {/* <Slogan /> */}
      {/* <Community /> */}
    </div>
  );
};

export default Home;
