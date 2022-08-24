export default class Loading {
  constructor({ $target }) {
    this.spinnerWrapper = document.createElement('div');
    this.spinnerWrapper.classList.add('spinner-wrapper', 'hidden');

    $target.appendChild(this.spinnerWrapper);

    this.render();
  }
  toggleSpinner() {
    const spinner = document.querySelector('.spinner-wrapper');
    spinner.classList.toggle('hidden');
  }

  render() {
    this.spinnerWrapper.innerHTML = `
    <img class="spinner-image" src="src/img/Loading.gif"></img>
    `;
  }
}
