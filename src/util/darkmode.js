const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const darkmodeBtn = document.querySelector('.darkmode-btn');

const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );

  console.log(response);
  if (response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }

  return response;
};

const applySetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute(
      'data-user-color-scheme',
      currentSetting
    );
    setButtonLabel(currentSetting);
  } else {
    setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY));
  }
};

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
};

const setButtonLabel = (currentSetting) => {
  darkmodeBtn.innerText = currentSetting === 'dark' ? '🌕' : '🌑';
};

darkmodeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  applySetting(toggleSetting());
});

applySetting();
