export default class DetailModal {
  constructor({ $target }) {
    this.isVisible = false;
    this.data = null;
    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = 'modal-wrapper';
    this.modalWrapper.classList.add('hidden');

    $target.appendChild(this.modalWrapper);

    this.render();
  }

  toggleModal() {
    this.isVisible = !this.isVisible;

    const modal = document.querySelector('.modal-wrapper');
    modal.classList.toggle('hidden');
  }

  setState(data) {
    this.toggleModal();
    this.data = data.data;
    this.render();
  }

  onClose() {
    this.toggleModal();
    this.data = null;
    this.modalWrapper.innerHTML = '';
  }

  render() {
    if (!this.isVisible) return;

    console.log(this.data);
    const { url, name, origin, temperament, width, height } = this.data;
    //   ? this.data.breeds[0]
    //   : { name: '정보없음', origin: '정보없음', temperament: '정보없음' };
    // const { imperial, metric } = this.data.breeds[0]
    //   ? this.data.breeds[0].weight
    //   : { imperial: '정보없음', metric: '정보없음' };

    this.modalWrapper.innerHTML = `
        <div class="overlay"></div>
        <section class="modal-contents">
            <header class="modal-header">
                <p class="modal-title">${name}</p>
                <span class="close-btn">X</span>
            </header>
            <img class="modal-image" src="${url}"></img>
            <article class="modal-info">
                <p class="cat-origin">${origin}</p>
                <p class="cat-temperament">${temperament}</p>
                <p class="cat-width">${`${width} (imperial) / ${height} (metric)`}</p>
            </article>
        </section>
        `;

    document.querySelector('.close-btn').addEventListener('click', () => {
      this.onClose();
    });
    document.querySelector('.overlay').addEventListener('click', () => {
      this.onClose();
    });
    // const overlay = document.createElement('div');
    // overlay.className = 'overlay';

    // const modalContents = document.createElement('section');
    // modalContents.className = 'modal-contents';

    // const modalHeader = document.createElement('header');
    // modalHeader.className = 'modal-header';

    // const modalTitle = document.createElement('p');
    // modalTitle.className = 'modal-title';
    // modalTitle.innerText = name;

    // const closeBtn = document.createElement('span');
    // closeBtn.className = 'close-btn';
    // closeBtn.innerText = 'X';

    // const modalImage = document.createElement('img');
    // modalImage.className = 'modal-image';
    // modalImage.src = url;

    // const modalInfo = document.createElement('article');
    // modalInfo.className = 'modal-info';

    // const catOrigin = document.createElement('p');
    // catOrigin.className = 'cat-origin';
    // catOrigin.innerText = origin;

    // const catTemperament = document.createElement('p');
    // catTemperament.className = 'cat-temperament';
    // catTemperament.innerText = temperament;

    // const catWeight = document.createElement('p');
    // catWeight.className = 'cat-width';
    // catWeight.innerText = `${imperial} (imperial) / ${metric} (metric)`;

    // modalHeader.appendChild(modalTitle);
    // modalHeader.appendChild(closeBtn);

    // modalInfo.appendChild(catOrigin);
    // modalInfo.appendChild(catTemperament);
    // modalInfo.appendChild(catWeight);

    // modalContents.appendChild(modalHeader);
    // modalContents.appendChild(modalImage);
    // modalContents.appendChild(modalInfo);

    // this.modalWrapper.appendChild(overlay);
    // this.modalWrapper.appendChild(modalContents);
  }
}
