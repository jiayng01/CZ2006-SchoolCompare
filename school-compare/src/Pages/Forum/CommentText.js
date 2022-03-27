import React, { useState } from 'react'
import { useAuth } from '../../Firebase';

function CommentText({ handleSubmit, submitLabel, hasCancelButton = false, initialText = '', handleCancel, postId }) {

    // TODO: Authentication
    // TODO: If empty field and submit -> error
    const [user, isAuth] = useAuth()
    const [text, setText] = useState(initialText);
    const isTextAreaDisabled = text.length === 0 && !isAuth;

    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(text, postId);
        setText("")
    }
    const onChange = event => {
        setText(event.target.value)
    }

    return (
        <form onSubmit={onSubmit}>
            <textarea
                className='comment-form-textarea'
                value={text}
                onChange={onChange}
                placeholder='what are your thoughts?'
                disabled={!isAuth} />
            <button
                className='comment-button'
                disabled={isTextAreaDisabled}>
                {submitLabel}
            </button>
            {hasCancelButton &&
                <button
                    type="button"
                    className='comment-button comment-cancel-button'
                    onClick={handleCancel}>
                    Cancel
                </button>}
        </form>
    )
}

export default CommentText