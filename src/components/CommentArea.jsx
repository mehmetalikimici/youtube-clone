import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { MdArrowDropDown } from 'react-icons/md';
import StringArea from './StringArea';

const CommentArea = ({ comments }) => {
  //console.log(comments);
  return (
    <div className="flex gap-3 comment-area">
      <div className="">
        <img
          src={
            comments.authorThumbnail[comments.authorThumbnail.length - 1].url
          }
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-5">
          <p className="font-bold">{comments.authorText}</p>
          <p>{comments.publishedTimeText}</p>
        </div>
        <StringArea className="cursor-pointer" text={comments.textDisplay} />
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 items-center">
            <AiOutlineLike className=" cursor-pointer text-2xl " />
            <p>{comments.likesCount}</p>
          </div>
          <AiOutlineDislike className=" cursor-pointer text-2xl" />
          <button className="hover:bg-[#272727] p-2 rounded-full">
            Yanıtla
          </button>
        </div>
        {comments.replyCount ? (
          <div className="flex items-center cursor-pointer">
            <MdArrowDropDown className="font-bold text-xl text-blue-600" />
            <p className="font-bold text-l text-blue-600">
              {comments.replyCount} Yanıt
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CommentArea;
