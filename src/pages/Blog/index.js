import React, { useState, useEffect } from 'react';


import { getPosts, getPostsCategories } from "../../api/modules/posts";

import "./styles.css";
import NavbarTop from "../../components/NavbarTop";
import NavbarBottom from "../../components/NavbarBottom";
import PostCard from "../../components/PostCard";
import Loader from "../../components/Loader";


import searchIcon from "../../assets/search.png";
import close from "../../assets/close.png";

export default function Blog() {
  
  const [ posts, setPosts ] = useState(null);
  const [ categorias, setCategorias ] = useState(null);
  const [ search, setSearch ] = useState('');
  const [ filtered, setFiltered ] = useState(null);
  const [ hidePosts, setHidePosts ] = useState(false);
  const [ catActive, setCatActive ] = useState('');
  const [ erro, setErro ] = useState('');

  useEffect(() => {
    const getPagePosts = async () => {
      let result = await getPosts();
      if(result) {
        setPosts( result ? result : null); 
      }
      else 
        setErro('Nenhuma notícia foi encontrada');
    }
    getPagePosts();
  }, []);

  useEffect(() => {
    const getPagePostCategories = async () => {
      let resultCats = await getPostsCategories();
      setCategorias( resultCats ? resultCats : []);  
    }
    getPagePostCategories();
  }, []);

  const searchPostsByTerm = (e) => {
    e.preventDefault();
    if( catActive ) {
      setCatActive('');
    }
    if( search ) {
      let result = filterPostsByTerm(search);
      if( result ) {
        setHidePosts(true);
      }
      setFiltered(result);  
    }
  }

  const searchPostsByCategory = (cat) => {
    if( search ) {
      setFiltered(null); 
      setSearch('');
    }

    if(cat == catActive) {
      setCatActive('');
      setFiltered(null);
      setHidePosts(false);
    } else {

      setCatActive(cat);
      let result = filterPostsByCategory(cat);
      if( result ) {
        setHidePosts(true);
      }
      setFiltered(result);  
    }
  }


  const filterPostsByTerm = (term) => {
    return posts.filter((post, key) => {
      let containsTerm = false;
      let lowerTitle = post.title.toLowerCase();
      let lowerTerm = term.toLowerCase();
      if(lowerTitle.includes(lowerTerm)) 
        containsTerm = true;
      return containsTerm;
    })
  }

  const filterPostsByCategory = (cat) => {
    return posts.filter((post, key) => {
      let containsCat = false;
      if(post.category && post.category.name === cat) 
        containsCat = true;
      return containsCat;
    })
  }

  const removeSearch = () => {
    setFiltered(null);
    setSearch('');
    setHidePosts(false);
  }

  return (
    <div className="blog-inner">
        <NavbarTop name="Notícias" withGoBack={true} withMenu={false}></NavbarTop>
        <form onSubmit={searchPostsByTerm} className={ erro ? "search-form disabled" : "search-form"}>
        <input type="search" 
                     placeholder="Pesquisar" 
                     name="s" 
                     id="search" 
                     value={search} 
                     onChange={(e) => setSearch(e.target.value) } />
          <button disabled={ erro } className="btn-search" type="submit"><img src={ searchIcon } alt="Pesquisar"/></button>
          {filtered && search ? (<button className="btn-close" onClick={removeSearch} type="reset"><img src={close}/></button>) : ''}
        </form>
        <div className="tags">
          <ul className="tags-slider">
          {
            categorias ? categorias.map((cat, key) => (<li key={key} className={ catActive == cat.name ? 'search-active' : '' } ><button onClick={() => searchPostsByCategory(cat.name)}>{cat.name}</button></li>)) : ''
          }
          </ul>
        </div>
        <div className="posts-list">
          {
            erro ? (<div className="error-msg">{erro}</div>) : ''
          }
          {
            posts && !hidePosts ? posts.map((r, key) => (<PostCard key={key} post={r}></PostCard>)) : ''
          }
          {
            filtered && hidePosts ? filtered.map((r, key) => (<PostCard key={key} post={r}></PostCard>)) : ''
          }

          </div>

        <NavbarBottom></NavbarBottom>
    </div>
  );
}
