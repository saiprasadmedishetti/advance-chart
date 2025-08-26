import axios from "axios";

interface SymbolInfo {
  name: string;
  [key: string]: any;
}

interface PeriodParams {
  from: number;
  to: number;
  countBack?: number;
  [key: string]: any;
}

export const getBars = async (
  symbolInfo: SymbolInfo,
  resolution: string,
  periodParams: PeriodParams,
  onHistoryCallback: (bars: any[], meta: { noData: boolean }) => void,
  onErrorCallback: (error: any) => void
) => {
  try {
    const fromTime = new Date(periodParams.from * 1000).toISOString();
    const toTime = new Date(periodParams.to * 1000).toISOString();
    console.log("fromTime:", fromTime);
    console.log("toTime:", toTime);
    const requiredBars = 302;
    console.log("requiredBars", requiredBars);
    console.log({ resolution });
    const symbol = symbolInfo.name?.replace(/\//, "");

    const interval = isNaN(Number(resolution)) ? resolution : `${resolution}m`;

    let time = new Date(periodParams.to * 1000);
    time.setUTCHours(0);
    time.setUTCMinutes(0);
    time.setUTCMilliseconds(0);

    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
    );

    console.log("response ", response);

    const bars = response.data
      .map((d: any) => ({
        time: d[0],
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
        volume: parseFloat(d[5]),
      }))
      .filter(
        (bar: any) =>
          bar.time >= periodParams.from * 1000 &&
          bar.time <= periodParams.to * 1000
      )
      .sort((a: any, b: any) => a.time - b.time);

    if (bars.length === 0) {
      onHistoryCallback([], { noData: true });
    } else {
      onHistoryCallback(bars, { noData: false });
    }
  } catch (err) {
    console.error(err);
    onErrorCallback(err);
  }
};

export const subscribeBars = (
  symbolInfo: SymbolInfo,
  resolution: string,
  onRealtimeCallback: (...args: any[]) => void,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void
) => {
  // Implement your subscription logic here
};

export const unsubscribeBars = (subscriberUID: string) => {
  // Implement your unsubscription logic here
};
