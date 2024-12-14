import { Alert, Button, Textarea, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function CommentSection({ advertisementId }) {

    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);

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
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    return (
        <div className='max-w-full mx-auto w-full'>
            {currentUser ?
                (
                    <div className='flex items-center gap-1 text-gray-500 text-sm'>
                        <p>Signed in as:</p>
                        <img className='h-6 w-6 object-cover rounded-full' src={currentUser.profilePicture} alt={currentUser.username} />
                        <Link to={'/dashboard?tab=profile'} className='text-xs text-zinc-400 hover:underline'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ) :
                (
                    <div className='text-sm text-gray-500 flex gap-1'>
                        You must be signed in to comment.
                        <Link className='text-sky-600 hover:underline' to={'/sign-in'}>
                            Sign In
                        </Link>
                    </div>
                )}
            {currentUser && (
                <form onSubmit={handleSubmit} className='my-2 p-3 bg-white rounded-md border border-gray-200'>
                    <Textarea className='min-h-10 max-h-80 sm:max-h-40' placeholder='Leave a comment...' rows='3' maxLength='200' onChange={(e) => setComment(e.target.value)} value={comment} />
                    <div className='flex justify-between items-center mt-3'>
                        <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit' size='sm'>
                            Submit
                        </Button>
                    </div>
                    {commentError &&
                        <Alert color='failure' className='mt-5'>{commentError}</Alert>
                    }
                </form>
            )}
        </div>
    )
}
