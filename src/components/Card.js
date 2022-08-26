/*
    아티클
    고양이 정보

    아티클
        -> img
        -> 아티클
            -> 네임
            -> 종
*/
export default class Card {
  constructor({ $target, data }) {
    this.data = data;
    this.card = document.createElement('article');
    this.card.className = 'cat-card';
    this.card.dataset.id = data.id;

    $target.appendChild(this.card);

    this.render();
  }

  render() {
    const { url, name, origin } = this.data;
    // : { name: '정보없음', origin: '정보없음' };

    this.card.innerHTML = `
    <img class="card-image lazy" data-src="${url}"/>
    <article class="card-info">
        <p class="cat-name">${name}</p>
        <p class="cat-origin>${origin}</p>
    </article>
    `;

    // const cardImage = document.createElement('img');
    // cardImage.className = 'card-image';
    // cardImage.classList.add('lazy');
    // cardImage.dataset.src = url;

    // const cardInfo = document.createElement('article');
    // cardInfo.className = 'card-info';

    // const catName = document.createElement('p');
    // catName.className = 'cat-name';
    // catName.innerText = name;

    // const catOrigin = document.createElement('p');
    // catOrigin.className = 'cat-origin';
    // catOrigin.innerText = origin;

    // cardInfo.appendChild(catName);
    // cardInfo.appendChild(catOrigin);
    // this.card.appendChild(cardImage);
    // this.card.appendChild(cardInfo);
  }
}
