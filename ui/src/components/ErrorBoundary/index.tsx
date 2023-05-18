import React from "react";
import { datadogRum } from "@datadog/browser-rum";

interface MyProps {}

interface MyState {
  hasError: boolean;
}

const {
  REACT_APP_DATADOG_RUM_APPLICATION_ID,
  REACT_APP_DATADOG_RUM_CLIENT_TOKEN,
  REACT_APP_DATADOG_RUM_SITE,
  REACT_APP_DATADOG_RUM_SERVICE,
}: any = process.env;

datadogRum.init({
  applicationId: REACT_APP_DATADOG_RUM_APPLICATION_ID,
  clientToken: REACT_APP_DATADOG_RUM_CLIENT_TOKEN,
  site: REACT_APP_DATADOG_RUM_SITE,
  service: REACT_APP_DATADOG_RUM_SERVICE,
  sampleRate: 100,
  sessionReplaySampleRate: 20,
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  useCrossSiteSessionCookie: true,
});

datadogRum.setGlobalContextProperty("Application Type", "Marketplace");
datadogRum.setGlobalContextProperty("Application Name", "Progress Bar App");

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.warn(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    datadogRum.addError(error);
    throw new Error(errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
