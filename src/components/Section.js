export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  addItem(item) {
    this._container.append(item);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}