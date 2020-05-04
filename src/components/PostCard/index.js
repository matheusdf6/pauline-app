import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import decodeSpecialChars from "../../utils/decodeSpecialChars";

import "./styles.css";

export default function PostCard({ post }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/blog/${ post.id }`);
    }

    return (
    <a onClick={ handleClick } className="post-card">
        <div className="card-image">
            <img src={ post.image } alt={ post.title } />
        </div>
        <div className="card-text">
            <div className="card-text-info">
                <span className="card-tag">{ post.category ? post.category.name : "Sem categoria" }</span>
                <span className="read-time">{ post.tempo ? `${post.tempo}min de leitura` : ''}</span>
            </div>
            <div className="card-text-title">
                <h3>{ decodeSpecialChars(post.title) }</h3>
            </div>
        </div>
    </a>
  );
}

