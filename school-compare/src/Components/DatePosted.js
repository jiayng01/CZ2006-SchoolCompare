import React from 'react'

function DatePosted({ comment }) {
    const current = new Date();
    const date = current.getDate();
    const month = current.getMonth();
    const year = current.getFullYear();
    const hour = current.getHours();
    const min = current.getMinutes();
    const commentDate = comment.values.createdAt.toDate();

    return (
        <div>
            {year > commentDate.getFullYear() ?
                <div>
                    {year - commentDate.getFullYear()}y
                </div> :
                month > commentDate.getMonth() ?
                    <div>
                        {month - commentDate.getMonth()}mth
                    </div> :
                    date > commentDate.getDate() ?
                        <div>
                            {date - commentDate.getDate()}d
                        </div> :
                        hour > commentDate.getHours() ?
                            <div>
                                {hour - commentDate.getHours()}hr
                            </div> :
                            <div>
                                {min - commentDate.getMinutes()}min
                            </div>
            }
        </div>
    )
}

export default DatePosted