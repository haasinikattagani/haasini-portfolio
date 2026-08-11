class TypedText {
  constructor(el, { strings = [], typingSpeed = 80, eraseSpeed = 50, pauseDuration = 1800 } = {}) {
    this.el = el;
    this.strings = strings;
    this.typingSpeed = typingSpeed;
    this.eraseSpeed = eraseSpeed;
    this.pauseDuration = pauseDuration;

    // State machine states: 'typing' | 'pausing' | 'erasing' | 'switching'
    this.state = 'typing';
    this.stringIndex = 0;
    this.charIndex = 0;
    this.timer = null;
  }

  start() {
    this._tick();
  }

  stop() {
    clearTimeout(this.timer);
  }

  _tick() {
    const current = this.strings[this.stringIndex];

    if (this.state === 'typing') {
      this.el.textContent = current.slice(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === current.length) {
        this.state = 'pausing';
        this.timer = setTimeout(() => { this.state = 'erasing'; this._tick(); }, this.pauseDuration);
      } else {
        this.timer = setTimeout(() => this._tick(), this.typingSpeed);
      }

    } else if (this.state === 'erasing') {
      this.el.textContent = current.slice(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.state = 'switching';
        this.timer = setTimeout(() => this._tick(), 300);
      } else {
        this.timer = setTimeout(() => this._tick(), this.eraseSpeed);
      }

    } else if (this.state === 'switching') {
      this.stringIndex = (this.stringIndex + 1) % this.strings.length;
      this.charIndex = 0;
      this.state = 'typing';
      this._tick();
    }
  }
}
