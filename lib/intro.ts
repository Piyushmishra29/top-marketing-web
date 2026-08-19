/**
 * The intro gate. Order-independent and idempotent: subscribers that arrive
 * after the intro has finished fire immediately, so a remount can never leave
 * the hero stuck in its hidden start state.
 */
let done = false;
const waiting: Array<() => void> = [];

export const markIntroDone = () => {
  if (done) return;
  done = true;
  waiting.splice(0).forEach((fn) => fn());
};

export const whenIntroDone = (fn: () => void) => {
  if (done) {
    fn();
    return () => {};
  }
  waiting.push(fn);
  return () => {
    const i = waiting.indexOf(fn);
    if (i > -1) waiting.splice(i, 1);
  };
};
