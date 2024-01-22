import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';
import { getData } from '../utils/getData';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import millify from 'millify';
import StringArea from '../components/StringArea';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';
import CommentArea from '../components/CommentArea';

const VideoDetail = () => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('v');

  console.log(comments);

  useEffect(() => {
    setVideo(null);
    getData(`/video/info?id=${id}&extend=1`).then((data) => setVideo(data));
  }, [id]);

  useEffect(() => {
    setComments(null);
    getData(`/comments?id=${id}&sort_by=newest`).then((data) => setComments(data));
  }, []);

  return (
    <div className="detail-page h-screen overflow-auto p-5">
      <div className="">
        <ReactPlayer
          playing
          width={'100%'}
          height={'50vh'}
          controls
          url={`https://www.youtube.com/watch?v=${id}`}
        />
        {!video ? (
          <p>Yükleniyor...</p>
        ) : (
          <>
            <h1 className="my-3 text-xl font-bold">{video.title}</h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-12 h-12"
                  src={
                    video.channelThumbnail[video.channelThumbnail.length - 1]
                      .url
                  }
                />
                <div>
                  <h4 className="font-bold">{video.channelTitle}</h4>
                  <p className="text-gray-400">{video.subscriberCountText}</p>
                </div>
                <button className="bg-white rounded-full text-black px-3 h-9 transition hover:bg-gray-400">
                  Abone ol
                </button>
              </div>
              <div className="flex items-center bg-[#272727] rounded-full">
                <div className="flex items-center gap-3 py-2 px-3 border-r cursor-pointer">
                  <AiFillLike />
                  <p>{video.likeCount}</p>
                </div>
                <div className="py-2 px-4 cursor-pointer">
                  <AiFillDislike />
                </div>
              </div>
            </div>
            <div className="bg-[#272727] rounded p-2 mt-4 cursor-pointer hover:bg-opacity-80">
              <div className="flex gap-3">
                <p>{millify(video.viewCount)} görüntülenme</p>
                <p>{new Date(video.publishDate).toLocaleDateString()}</p>
              </div>
              <StringArea text={video.description} />
            </div>
            <div className='flex flex-col gap-8 mt-10'>
              {!comments ? (
                <Loader />
              ) : (
                comments.data.map((item, i) => (
                  <CommentArea key={i} comments={item} />
                ))
              )}
            </div>
          </>
        )}
      </div>
      <div className=" flex flex-col gap-5 p-5">
        {!video ? (
          <Loader />
        ) : (
          video.relatedVideos.data.map(
            (item, i) =>
              item.type === 'video' && (
                <VideoCard isRow={true} video={item} key={i} />
              )
          )
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
