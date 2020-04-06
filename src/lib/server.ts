export type ResponseItem = {
  v: number;
}

type BeaconData = {
  type: string;
  id: number;
  param: string | number;
}

const serverApiRequest = async (path: string): Promise<Array<ResponseItem>> => {
  return await fetch(`https://t.syshub.ru${path}`, { cache: 'force-cache' }).then((response) => {
    return response.json();
  }).catch((error) => {
    console.error(error);
    throw error;
  });
};

/* Какой хост у сервера аналитики? */
const analyticsHost: string = undefined;
// Можно выполнить по аналогии с serverApiRequest(), а можно лучше, см. подсказку ниже
const sendAnalytics = (path: string, data: BeaconData) => {
  if (typeof analyticsHost !== 'undefined') {
    navigator.sendBeacon(`${analyticsHost}${path}`, JSON.stringify(data));
  }
};

/* Нужно:
    1 Сделать функцию рабочей в принципе не меняя логики но доступно ES8+
    2 Общая логика: запрос, если успех, то отправка данных в аналитику, обработка данных и их возврат
    3 Подсветить места, где ТЗ недостаточно
    4 Подсветить места, вероятно проблемные
*/
type RequestDataParams = {
  id: number;
  param: string | number;
}
export const requestData = async (requestDataParams: RequestDataParams): Promise<Array<number>> => {
  const { id, param } = requestDataParams
  // should return [null, {v: 1}, {v: 4}, null] or Error (may return array (null | {v: number})[])
  let array2: Array<number>;
  try {
    const result = await serverApiRequest(`/query/data/${id}/param/${param}`);
    array2 = result.filter((item) => item).map(({ v }) => v);
    sendAnalytics('/requestDone', {
      type: 'data',
      id,
      param,
    });
  } catch (e) {
    console.error('Ошибка получения данных:', e);
  } finally {
    return array2;
  }
};
