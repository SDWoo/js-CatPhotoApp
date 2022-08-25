import { setItem } from '../util/sessionStorage.js';

export default class SearchBar {
  constructor({ $target, keywords, onSearch, onRandom }) {
    this.recent = keywords;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.section = document.createElement('section');
    this.section.className = 'searching-section';
    console.log(this.recent);

    $target.appendChild(this.section);

    this.render();
  }

  addRecentKeyword(keyword) {
    if (this.recent.includes(keyword)) return;
    if (this.recent.length == 5) this.recent.shift();

    this.recent.push(keyword);
    setItem('keywords', this.recent);

    this.render();
  }

  searchByKeyword(keyword) {
    if (keyword.length == 0) return;

    this.addRecentKeyword(keyword);
    this.onSearch(keyword);
  }

  deleteKeyword() {
    const searchBox = document.querySelector('.search-box');
    searchBox.value = '';
  }

  render() {
    this.section.innerHTML = `
    <span class="random-btn">🐱</span>
    <div class="search-box-wrapper">
        <input class="search-box" placeholder="고양이를 검색하세요" autofocus></input>
        <div class="recent-keywords">
        ${this.recent
          .map(
            (keyword) => `
        <span class="keyword">${keyword}</span>
        `
          )

          .join('')}</div>
    </div>"`;

    // const randomBtn = document.createElement('span');
    // randomBtn.className = 'random-btn';
    // randomBtn.innerText = '🐱';

    // const wrapper = document.createElement('div');
    // wrapper.className = 'search-box-wrapper';

    // const searchBox = document.createElement('input');
    // searchBox.className = 'search-box';
    // searchBox.placeholder = '고양이를 검색하세요.';

    // const recentKeywords = document.createElement('div');
    // recentKeywords.className = 'recent-keywords';

    // this.recent.map((keyword) => {
    //   const link = document.createElement('span');
    //   link.className = 'keyword';
    //   link.innerText = keyword;

    //   link.addEventListener('click', () => {
    //     this.searchByKeyword(keyword);
    //   });

    //   recentKeywords.appendChild(link);
    // });

    const recentKeywords = document.querySelector('.recent-keywords');
    const randomBtn = document.querySelector('.random-btn');
    const searchBox = document.querySelector('.search-box');
    if (this.recent) {
      recentKeywords.addEventListener('click', (e) => {
        this.searchByKeyword(e.target.value);
      });
    }

    randomBtn.addEventListener('click', this.onRandom);
    searchBox.addEventListener('focus', this.deleteKeyword);
    searchBox.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        console.log(searchBox.value);
        this.searchByKeyword(searchBox.value);
      }
    });

    // randomBtn.addEventListener('click', this.onRandom);
    // searchBox.addEventListener('focus', this.deleteKeyword);
    // searchBox.addEventListener('keyup', (event) => {
    //   if (event.keyCode == 13) {
    //     this.searchByKeyword(searchBox.value);
    //   }
    // });

    // wrapper.appendChild(searchBox);
    // wrapper.appendChild(recentKeywords);
    // this.section.appendChild(randomBtn);
    // this.section.appendChild(wrapper);
  }
}
