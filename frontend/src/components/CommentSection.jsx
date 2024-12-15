import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ advertisementId }) {

    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, advertisementId, userId: currentUser._id }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getAdvertisementComments/${advertisementId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    }, [advertisementId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`,
                {
                    method: 'PUT',
                });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,
                    } : comment
                ));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEdit = async (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c)
        );
    };

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='max-w-full mx-auto w-full'>
            {currentUser ?
                (
                    <div className='flex items-center gap-1 text-gray-500 dark:text-gray-50 text-sm'>
                        <p>Signed in as:</p>
                        <img className='h-6 w-6 object-cover rounded-full' src={currentUser.profilePicture} alt={currentUser.username} />
                        <Link to={'/dashboard?tab=profile'} className='text-xs text-zinc-400 dark:text-zinc-300 hover:underline'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ) : (
                    <div className='text-sm text-gray-500 flex gap-1'>
                        You must be signed in to comment.
                        <Link className='text-sky-600 dark:text-sky-400 hover:underline' to={'/sign-in'}>
                            Sign In
                        </Link>
                    </div>
                )}
            {currentUser && (
                <form onSubmit={handleSubmit} className='my-2 p-3 bg-white dark:bg-[rgb(22,26,29)] rounded-md border border-gray-200 dark:border-[rgb(22,26,29)]'>
                    <Textarea className='min-h-10 max-h-80 sm:max-h-40' placeholder='Leave a comment...' rows='3' maxLength='200' onChange={(e) => setComment(e.target.value)} value={comment} />
                    <div className='flex justify-between items-center mt-3'>
                        <p className='text-gray-500 dark:text-gray-400 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit' size='sm'>
                            Publish
                        </Button>
                    </div>
                    {commentError &&
                        <Alert color='failure' className='mt-5'>{commentError}</Alert>
                    }
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm flex justify-center mt-5 mb-2'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-3 flex items-center gap-1 text-gray-500 dark:text-gray-50'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-0.5 px-2 rounded-md'>
                            <p className='text-black dark:text-white'>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map(comment => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true)
                                setCommentToDelete(commentId)
                            }}
                        />
                    ))}
                </>
            )}

            <Modal className='z-[10000]' show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>
                        <div className='flex justify-center gap-6'>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}
