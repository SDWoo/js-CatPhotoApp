import Card from './Card.js';
// import { lazyLoad } from '../util/lazyLoad.js';
// import { scrollFetch } from '../util/scrollFetch.js';

export default class ResultsSection {
  constructor({ $target, data, onClick }) {
    this.data = data;
    this.onClick = onClick;
    this.section = document.createElement('section');
    this.section.className = 'results-section';

    $target.appendChild(this.section);

    this.render();
    // lazyLoad();
  }

  setState(data) {
    this.data = data.data;
    this.render();
    // lazyLoad();
  }

  findCatById(id) {
    const result = this.data.find((cat) => cat.id == id);
    return result;
  }

  render() {
    if (!this.data) return;

    this.section.innerHTML = '';

    if (this.data.length > 0) {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';
      this.data.map((cat) => {
        new Card({
          $target: cardContainer,
          data: cat,
        });
      });

      // Event Deligation을 위해서 cardContainer에 이벤트를 추가한다.
      cardContainer.addEventListener('click', (e) => {
        const path = e.path;
        const card = path.find((comp) => comp.className == 'cat-card');

        if (card) {
          const id = card.dataset.id;
          const catInfo = this.findCatById(id);

          this.onClick(id);
        }
      });

      this.section.appendChild(cardContainer);
    } else {
      this.section.innerHTML = `
            <section class="notice-section">
                <h2 class="h2">검색결과가 없습니다.</h2>
                <img class="notice-image" src="src/img/emptybox.png"></img>
            </section>
        `;
      //   const noticeSection = document.createElement('section');
      //   noticeSection.className = 'notice-section';

      //   const notice = document.createElement('h2');
      //   notice.className = 'notice';
      //   notice.innerText = '검색 결과가 없습니다.';

      //   const noticeImage = document.createElement('img');
      //   noticeImage.className = 'notice-image';
      //   noticeImage.src = 'src/img/emptybox.png';

      //   noticeSection.appendChild(notice);
      //   noticeSection.appendChild(noticeImage);
      //   this.section.appendChild(noticeSection);
    }
  }
}
