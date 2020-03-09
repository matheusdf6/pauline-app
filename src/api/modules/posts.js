import api from '../api';

export const getPosts = async (pageOffset = 0) => {
  const posts = await api.get('posts', {
    params: { offset: pageOffset, per_page: 100 },
  });

  return posts.map(post => ({
    id: post.id,
    title: post.title.rendered,
    image: post.acf.imagem_destacada,
    category: (post.acf && post.acf.categoria && post.acf.categoria[0]) ? post.acf.categoria[0] : null,
    body: post.content.rendered,
  }));
};

export const getPostsCategories = async (pageOffset = 0) => {
  const categories = await api.get('categories', {
    params: { offset: pageOffset, per_page: 100 },
  });

  return categories;
};

export const getPostsCategory = async (categoryID) => {
  if (!categoryID) {
    return null;
  }

  const category = await api.get(`categories/${categoryID}`);
  return category;
};

export default { getPosts, getPostsCategories, getPostsCategory };
