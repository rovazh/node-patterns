import ConcurrentTaskQueue from './ConcurrentTaskQueue.mjs';

// The following example demonstrates how to run 4 asynchronous tasks
// while restricting execution to a maximum of two tasks running at the same time.

const queue = new ConcurrentTaskQueue(2);
queue.on('done', () => console.log('done!'));
queue.on('error', console.error);

queue.push((cb) => {
  setTimeout(() => {
    console.log('1st');
    cb();
  }, 500);
});

queue.push((cb) => {
  setTimeout(() => {
    console.log('2nd');
    cb();
  }, 500);
});

queue.push((cb) => {
  setTimeout(() => {
    cb(new Error('Oops...'));
  }, 500);
});

queue.push((cb) => {
  setTimeout(() => {
    console.log('4th');
    cb();
  }, 500);
});
