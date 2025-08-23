import { onReady } from "./ready";
import { resolveSymbol } from "./symbol";
import { getBars, subscribeBars, unsubscribeBars } from "./bars";

export const datafeed = {
  onReady,
  resolveSymbol,
  getBars,
  subscribeBars,
  unsubscribeBars,
};

export default datafeed;
