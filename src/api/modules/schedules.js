import api from '../api';

export const getSchedules = async (userID, pageOffset = 0) => {
  const params = { offset: pageOffset, per_page: 100 };

  if (userID && typeof userID === 'number') {
    params.paciente = userID;
  }

  const schedule = await api.get('agendamentos', {
    params,
  });

  return schedule;
};

export default { getSchedules };
