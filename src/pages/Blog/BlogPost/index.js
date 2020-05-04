import React, { useEffect, useState } from 'react';
import { getSinglePost } from "../../../api/modules/posts";
import decodeSpecialChars from "../../../utils/decodeSpecialChars";

import NavbarTop from "../../../components/NavbarTop";
import NavbarBottom from "../../../components/NavbarBottom";

import './styles.css';

export default function BlogPost({ match }) {
    
    const [ post, setPost ] = useState(null);

    useEffect(() =>{
        const getPostObject = async () => {
            let result = await getSinglePost(match.params.id);
            setPost(result);
        }
        getPostObject();
    },[]);

    return (
    <div className="post-single-inner">
        <NavbarTop name="Notícias" withGoBack={true} withMenu={false}></NavbarTop>
        {
            post ? 
            (
                <div className="post-single">
                    <img src={post.image} alt={post.title}/>
                    <div className="post-single-text">
                        <h2>{decodeSpecialChars(post.title)}</h2>
                        <div className="info">
                            <span className="single-tag">{post.category ? post.category.name : "Sem categoria"}</span>
                            <span className="read-time">{ post.tempo}min de leitura</span>
                        </div>
                        <div className="single-body" dangerouslySetInnerHTML={{__html: post.body.replace(/&lt;/g, '<')
                                                                                .replace(/&gt;/g, '>')
                                                                                .replace(/&#8221;/g, '"')
                                                                            .replace(/&#8220;/g, '"')}}></div>
                    </div>
                </div>

            ) : ''
        }
        <NavbarBottom></NavbarBottom>
    </div>
  );
}
