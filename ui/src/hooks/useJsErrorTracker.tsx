import { datadogRum } from "@datadog/browser-rum";
import { each } from "lodash";

const ENV: string = process.env.NODE_ENV || "";

const useJsErrorTracker = () => {
  const trackError = (error: any) => {
    if (ENV === "development") {
      return;
    }
    datadogRum.addError(error);
  };

  const setErrorsMetaData = (properties:{ [key: string]: string }) => {
    each(properties, (key, value) => {
      datadogRum.setGlobalContextProperty(value, key);
    });
  };
  return { trackError, setErrorsMetaData };
};

export default useJsErrorTracker;
