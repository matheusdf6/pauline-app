import React, { useEffect, useState } from 'react';
import { getPosts } from "../../api/modules/posts";
import PostCard from "../PostCard";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

import './styles.css';

export default function PostsDash() {
    const [ erro, setErro ] = useState('');
    const [ posts, setPosts ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true)
            let response = await getPosts();
            setLoading(false);

            if(response && response.length > 0) {
                setPosts(response);
            } else {
                setErro("Nenhum post foi encontrado!");
            }
        }
        loadPosts();
    },[])

  return (
    <div className="news-box">
        <div className="news-header">
            <h3>News</h3>
            <Link to="/blog">Ver todas</Link>
        </div>
        <div className="blog-list">
        {
            erro ? (<div className="error-msg">{erro}</div>) : ''
        }
        {
            loading ? (<div className="posts-loading"><Loader width={80} /></div>) : ''
        }
        {
            posts ? posts.slice(0, 2).map((r, key) => (<PostCard key={key} post={r}></PostCard>)) : ''
        }
        </div>
    </div>
  );
}
