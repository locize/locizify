import { getClickedElement } from './utils';

const editor = {
  init(i18next) {
    setTimeout(() => {
      this.on();
    }, 100);
  },

  handler(e) {
    const el = getClickedElement(e);

    const str = el.textContent || el.text.innerText;
    const res = str.replace(/\n +/g, '');

    console.warn(el, res);
  },

  on() {
    document.body.addEventListener("click", this.handler);
  },

  off() {
    document.body.removeEventListener("click", this.handler);
  }
};

export default editor;
