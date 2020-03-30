import api from '../api';
import moment from "moment";
import Storage from "../../services/Storage";
import isSameDay from "../../utils/isSameDay";

export const getTips = async (pageOffset = 0) => {
  let stored = Storage.getLocalStorage("tips");
  let now = moment();
  if( stored && stored.tips.length > 0 ) {
    let { data_criado } = stored;
    let date_mom = moment(data_criado);
    if( date_mom.isSame(now, "day") ) {
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
