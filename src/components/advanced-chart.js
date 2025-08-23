import { useEffect, useRef } from "react";

import { widget } from "../charting_library";
import { datafeed } from "../utils/datafeed";

const TVChartContainer = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const widgetOptions = {
      symbol: "BTC/USDT",
      datafeed,
      container: chartContainerRef.current,
      library_path: "/charting_library/",
      interval: "5",

      locale: "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "symbol_search_hot_key",
      ],
      enabled_features: ["theme"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",

      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      studies_overrides: {},
      supports_marks: false,
      supports_timescale_marks: false,
      theme: "dark",

      overrides: {
        "mainSeriesProperties.statusViewStyle.showInterval": true,
        "mainSeriesProperties.statusViewStyle.symbolTextSource": "ticker",
      },
    };

    const tvWidget = new widget(widgetOptions);

    return () => {
      tvWidget.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{ height: "100vh", backgroundColor: "black" }}
    />
  );
};

export default TVChartContainer;
