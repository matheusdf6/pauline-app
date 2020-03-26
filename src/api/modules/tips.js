import api from '../api';
import Storage from "../../services/Storage";
import isSameDay from "../../utils/isSameDay";

export const getTips = async (pageOffset = 0) => {
  let stored = Storage.getLocalStorage("tips");
  let now = new Date();
  if( stored && stored.tips.length > 0 ) {
    let { data_criado } = stored;
    if( isSameDay(new Date(data_criado), now) ) {
      return stored;
    }
  }

  const tips = await api.get('dicas', {
    params: { offset: pageOffset, per_page: 100 },
  });
  Storage.storeTips(tips);

  return tips;
};

export default { getTips };
