import { datadogRum } from "@datadog/browser-rum";
import { renderHook } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import useJsErrorTracker from "./useJsErrorTracker";

beforeEach(() => vi.clearAllMocks());

it("setErrorsMetaData sets each key/value as a Datadog global context property", () => {
  const { result } = renderHook(() => useJsErrorTracker());
  result.current.setErrorsMetaData({ Stack: "s1", Organization: "o1" });
  expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledWith(
    "Stack",
    "s1"
  );
  expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledWith(
    "Organization",
    "o1"
  );
  expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledTimes(2);
});

it("trackError reports the error to Datadog", () => {
  const { result } = renderHook(() => useJsErrorTracker());
  const err = new Error("boom");
  result.current.trackError(err);
  expect(datadogRum.addError).toHaveBeenCalledWith(err);
});

it("trackError does not report in development", async () => {
  vi.resetModules();
  vi.stubEnv("NODE_ENV", "development");
  const { default: hook } = await import("./useJsErrorTracker");
  const { datadogRum: rum } = await import("@datadog/browser-rum");
  const { result } = renderHook(() => hook());
  result.current.trackError(new Error("boom"));
  expect(rum.addError).not.toHaveBeenCalled();
  vi.unstubAllEnvs();
});
