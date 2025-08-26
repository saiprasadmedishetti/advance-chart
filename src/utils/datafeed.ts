import { resolveSymbol } from "./symbol";
import { getBars, subscribeBars, unsubscribeBars } from "./bars";

const configurationData = {
  supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
  // ... other configuration data
};

const onReady = (callback: (config: typeof configurationData) => void) => {
  console.log("[onReady]: Method call");
  setTimeout(() => callback(configurationData));
};

export const datafeed = {
  onReady,
  resolveSymbol,
  getBars,
  subscribeBars,
  unsubscribeBars,
};

export default datafeed;
