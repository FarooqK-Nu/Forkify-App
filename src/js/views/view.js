import icons from 'url:../../img/icons.svg';
export default class View {
  _parentElement = document.querySelector('.recipe');
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError('No recipe Found!!!');
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      if (!currEl) return;

      //update changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      //update changed attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(att =>
          currEl.setAttribute(att.name, att.value),
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const html = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(msge) {
    const html = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${msge}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderMessege(msge) {
    const html = `<div class="message">
                        <div>
                          <svg>
                            <use href="${icons}#icon-smile"></use>
                          </svg>
                        </div>
                        <p>
                          ${msge}
                        </p>
                      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
