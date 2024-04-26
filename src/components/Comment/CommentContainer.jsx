import pb from '@/api/pocketbase';
import { useCommentStore } from '@/store/store';
import { useEffect } from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

export default function CommentContainer({ id }) {
  const { comments, setComments } = useCommentStore();
  useEffect(() => {
    const getComments = async () => {
      const meetUp = await pb.collection('meetUps').getOne(id, {
        expand: 'comments',
      });
      const commentList = meetUp?.expand?.comments || [];
      setComments(commentList);
    };
    getComments();
  }, [id, setComments]);

  return (
    <div className="m-20pxr">
      <p
        className="py-4 text-left
text-lg font-bold text-contentSecondary"
      >
        <span className="text-contentPrimary">{comments.length}</span>개의
        코멘트
      </p>
      <hr className="border-primary" />
      {comments &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            ment={comment.ment}
            id={comment.name}
            date={comment.created}
          />
        ))}
      <CommentInput id={id} />
    </div>
  );
}
