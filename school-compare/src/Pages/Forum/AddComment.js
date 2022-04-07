import React, { useState } from 'react'
import { useAuth } from '../../Firebase';

function AddComment({ handleSubmit, submitLabel, hasCancelButton = false, initialText = '', handleCancel, postId }) {

    const user = useAuth();
    const [text, setText] = useState(initialText);
    const isTextAreaDisabled = !user ? true : text.length === 0 ? true : false
    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(text, postId);
        setText("")
    }
    const onChange = (event) => {
        setText(event.target.value)
    }


    return (
        <form onSubmit={onSubmit}>
            <textarea
                className='comment-form-textarea'
                value={text}
                onChange={onChange}
                placeholder='what are your thoughts?'
                disabled={!user} />

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
            {!user && <p className='comment-warning'>
                Please Login to Comment.
            </p>}

        </form>
    )
}

export default AddComment