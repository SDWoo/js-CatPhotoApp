export default class Error {
  constructor({ $target }) {
    this.$target = $target;
    this.errorData = null;

    this.render();
  }

  setState(nextData) {
    this.errorData = nextData;
    this.render();
  }

  render() {
    if (!this.errorData) return;

    this.$target.innerHTML = '';

    console.log(this.errorData);
    this.$target.innerHTML = `
    <section class="error-section">
        <img class="error-image" src="/src/img/squarecat.jpg"></img>
        <p class="status-code"></p>
        <p class="error-message"></p>
        <p class="return-btn">돌아가기</p>
    </section>
    `;

    document.querySelector('.return-btn').addEventListener('click', () => {
      location.reload();
    });
  }
}
