/**
 *
 * @param {number} when timestamp in *seconds*
 */
const THRESHOLD = 1000 * 5;

export function schedule(when: number): Promise<never> {
  return new Promise((resolve) => {
    const currentTs = Math.floor(Date.now() / 1000);
    let timeout = (when - currentTs) * 1000;

    console.log(currentTs, when, timeout, (timeout / 1000) / 60);
    if (timeout < THRESHOLD) {
      timeout = THRESHOLD * 2;
    }

    window.setTimeout(resolve, timeout);
  });
}
