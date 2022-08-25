import SearchingSection from './components/SearchingSection.js';
import ResultsSection from './components/ResultsSection.js';
import DetailModal from './components/DetailModal.js';
import Loading from './components/Loading.js';
import Error from './components/Error.js';

import { api } from './api/theCatAPI.js';
import { getItem, setItem } from './util/sessionStorage.js';

export default class App {
  constructor($target) {
    const keywords = getItem('keyword');
    const data = getItem('data');

    const searchingSection = new SearchingSection({
      $target,
      keywords,
      onSearch: async (keyword) => {
        loading.toggleSpinner();

        const response = await api.fetchCats(keyword);
        if (!response.isError) {
          setItem('data', response.data);
          resultsSection.setState(response.data);
        } else {
          error.setState(response.data);
        }
        loading.toggleSpinner();
      },
      onRandom: async () => {
        loading.toggleSpinner();

        const response = await api.fetchRandomCats();
        if (!response.isError) {
          setItem('data', response.data);
          resultsSection.setState(response.data);
        } else {
          error.setState(response.data);
        }
        loading.toggleSpinner();
      },
    });

    const resultsSection = new ResultsSection({
      $target,
      data,
      onClick: async (id) => {
        loading.toggleSpinner();
        const response = await api.fetchCat(id);
        if (!response.isError) {
          detailModal.setState(response.data);
          loading.toggleSpinner();
        } else {
          error.setState(response.data);
        }
      },
    });

    const detailModal = new DetailModal({
      $target,
    });

    const loading = new Loading({
      $target,
    });

    const error = new Error({
      $target,
    });

    const darkmodeBtn = document.createElement('span');
    darkmodeBtn.className = 'darkmode-btn';
    darkmodeBtn.innerText = '🌕';

    $target.appendChild(darkmodeBtn);
  }
}
