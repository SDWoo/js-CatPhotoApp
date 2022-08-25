const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    const data = await response.json();
    return data;
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

export const api = {
  fetchCats: async (keyword) => {
    try {
      const cats = await request(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}`
      );
      console.log(cats);
      // const requests = cats.data.map(async (cat) => {
      //   return await request(`${API_ENDPOINT}/api/cats/${cat.id}`);
      // });
      // const responses = await Promise.all(requests);
      // console.log(responses);
      // const result = Array.prototype.concat.apply([], responses);
      // console.log(result);
      // result로 가지고 있는 이유는?? lazyload 나 카드 하나 검색을 위하여
      return {
        isError: false,
        data: cats,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
  fetchCat: async (catId) => {
    try {
      const result = await request(`${API_ENDPOINT}/api/cats/${catId}`);
      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
  fetchRandomCats: async () => {
    try {
      const result = await request(`${API_ENDPOINT}/api/cats/random50`);
      return {
        isError: false,
        data: result,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};
