import api from '../api';

export const getPosts = async (pageOffset = 0) => {
  try {
    const posts = await api.get('posts', {
      params: { offset: pageOffset, per_page: 100 },
    });
  
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      image: post.acf.imagem_destacada,
      category: (post.acf && post.acf.categoria && post.acf.categoria[0]) ? post.acf.categoria[0] : null,
      tempo: post.acf && post.acf.numero_palavra ? post.acf.numero_palavra : null,
      body: post.content.rendered,
    }));  
  } catch {
    return false;
  }
};

export const getPostsCategories = async (pageOffset = 0) => {
  try {
    const categories = await api.get('categories', {
      params: { offset: pageOffset, per_page: 100 },
    });
  
    return categories.filter(c => c.name.toLowerCase() != "sem categoria" );  
  } catch {
    return false;
  }
};

export const getPostsCategory = async (categoryID) => {
  try {
    if (!categoryID) {
      return null;
    }
  
    const category = await api.get(`categories/${categoryID}`);
    return category;  
  } catch {
    return false;
  }
};

export const getSinglePost = async (id) => {
  let cached = Storage.getLocalStorage("posts");
  let stored = cached ? JSON.parse(cached) : null;
  if( stored ) {
    let post = stored.filter((r) => r.id == id);
    return post;  
  } 

  const response = await api.get(`/posts/${id}`);
  if( response ) {
    return {
      id: response.id,
      title: response.title.rendered,
      image: response.acf.imagem_destacada,
      category: (response.acf && response.acf.categoria && response.acf.categoria[0]) ? response.acf.categoria[0] : null,
      tempo: response.acf && response.acf.numero_palavra ? response.acf.numero_palavra : null,
      body: response.content.rendered,
    }
  }

  return null;
}

export default { getPosts, getPostsCategories, getPostsCategory, getSinglePost };
