import React from 'react'
import { Link } from "react-router-dom";
import "../../ComponentsCSS/Card.css"

function PostCard({ content }) {
    return (
        <Link to={`./post/${content.values.title.trim().replace(/\s+/g, '-')}/${content.id}`}>
            <div className="card-container">
                <div className='card-content'>
                    <h2 className="card-title">{content.values.title}</h2>
                    <p className="card-body">{content.values.query.substring(0, 150) + "..."}</p>
                </div>

            </div>
        </Link>
    )
}

export default PostCard
