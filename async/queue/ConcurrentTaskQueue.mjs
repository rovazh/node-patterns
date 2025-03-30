import EventEmitter from 'node:events';

export default class extends EventEmitter {
  #concurrency;
  #running;
  #queue;

  constructor(concurrency) {
    super();
    this.#concurrency = concurrency;
    this.#running = 0;
    this.#queue = [];
  }

  push = (task) => {
    this.#queue.push(task);
    process.nextTick(this.#next);
    return this;
  };

  #next = () => {
    if (this.#running === 0 && this.#queue.length === 0) {
      return this.emit('done');
    }
    while (this.#running < this.#concurrency && this.#queue.length > 0) {
      const task = this.#queue.shift();
      task((err) => {
        if (err) {
          this.emit('error', err);
        }
        this.#running--;
        process.nextTick(this.#next);
      });
      ++this.#running;
    }
  };
}
