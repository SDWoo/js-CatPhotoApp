import { setItem } from '../util/sessionStorage.js';

export default class SearchBar {
  constructor({ $target, keywords, onSearch, onRandom }) {
    this.recent = keywords;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.section = document.createElement('section');
    this.section.className = 'searching-section';

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
    </div>`;

    const recentKeywords = document.querySelector('.recent-keywords');
    const randomBtn = document.querySelector('.random-btn');
    const searchBox = document.querySelector('.search-box');
    if (this.recent) {
      recentKeywords.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        this.searchByKeyword(e.target.innerText);
      });
    }

    randomBtn.addEventListener('click', this.onRandom);
    searchBox.addEventListener('focus', this.deleteKeyword);
    searchBox.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        this.searchByKeyword(searchBox.value);
      }
    });
  }
}
