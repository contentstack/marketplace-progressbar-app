import React from "react";
import { datadogRum } from "@datadog/browser-rum";

interface MyProps {
  children: any;
}

interface MyState {
  hasError: boolean;
}

const {
  VITE_DATADOG_RUM_APPLICATION_ID,
  VITE_DATADOG_RUM_CLIENT_TOKEN,
  VITE_DATADOG_RUM_SITE,
  VITE_DATADOG_RUM_SERVICE,
}: any = import.meta.env;

datadogRum.init({
  applicationId: VITE_DATADOG_RUM_APPLICATION_ID,
  clientToken: VITE_DATADOG_RUM_CLIENT_TOKEN,
  site: VITE_DATADOG_RUM_SITE,
  service: VITE_DATADOG_RUM_SERVICE,
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
