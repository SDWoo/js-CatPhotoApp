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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.onClose();
      }
    });
  }
}
