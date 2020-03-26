import api from '../api';

import Storage from "../../services/Storage";

export const getSchedulesByUser = async (userID, pageOffset = 0) => {
  const params = { offset: pageOffset, per_page: 100 };

  if (userID && typeof userID === 'number') {
    params.paciente = userID;
  }

  const schedule = await api.get('agendamentos', {
    params,
  });

  return schedule;
};


export const getSchedules = async (pageOffset = 0) => {

  let user_raw = Storage.getLocalStorage("user");
  let user = JSON.parse(user_raw);
  let userID = user.id;

  const params = { offset: pageOffset, per_page: 100 };

  if (userID && typeof userID === 'number') {
    params.paciente = userID;
  }

  const schedule = await api.get('agendamentos', {
    params,
  });

  return schedule;
};


export default { getSchedules, getSchedulesByUser };
