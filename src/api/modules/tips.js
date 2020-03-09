import api from '../connection';

export const getTips = async (pageOffset = 0) => {
  const tips = await api.get('dicas', {
    params: { offset: pageOffset, per_page: 100 },
  });

  return tips;
};

export default { getTips };
