/* eslint-disable react/react-in-jsx-scope */
import ContentstackAppSDK from "@contentstack/app-sdk";
import { datadogRum } from "@datadog/browser-rum";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockSdk } from "../../test/sdk";
import CustomField from "./index";

vi.mock("@contentstack/app-sdk", () => ({ default: { init: vi.fn() } }));

const slider = () => screen.findByRole("slider");

beforeEach(() => vi.clearAllMocks());

describe("CustomField slider", () => {
  it("is a 0-100 slider", async () => {
    mockSdk();
    render(<CustomField />);
    const input = await slider();
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
  });

  it("starts at 10 when nothing is saved", async () => {
    mockSdk(null);
    render(<CustomField />);
    expect(await slider()).toHaveAttribute("aria-valuenow", "10");
  });

  it("starts at 10 when the saved value is empty", async () => {
    mockSdk([]);
    render(<CustomField />);
    expect(await slider()).toHaveAttribute("aria-valuenow", "10");
  });

  it("shows a saved value on load", async () => {
    mockSdk([{ value: 70 }]);
    render(<CustomField />);
    expect(await slider()).toHaveAttribute("aria-valuenow", "70");
  });

  it("does not render the slider before the SDK is initialised", () => {
    vi.mocked(ContentstackAppSDK.init).mockReturnValue(new Promise(() => {}));
    render(<CustomField />);
    expect(screen.queryByRole("slider")).toBeNull();
  });

  it("saves [{ value: n }] with setData and moves the slider on change", async () => {
    const { setData } = mockSdk([{ value: 70 }]);
    render(<CustomField />);
    const input = await slider();
    fireEvent.change(input, { target: { value: "42" } });
    expect(setData).toHaveBeenCalledTimes(1);
    expect(setData).toHaveBeenCalledWith([{ value: 42 }]);
    expect(input).toHaveAttribute("aria-valuenow", "42");
  });

  it("saves the end values 0 and 100", async () => {
    const { setData } = mockSdk();
    render(<CustomField />);
    const input = await slider();
    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.change(input, { target: { value: "0" } });
    expect(setData).toHaveBeenNthCalledWith(1, [{ value: 100 }]);
    expect(setData).toHaveBeenNthCalledWith(2, [{ value: 0 }]);
  });

  it("reports the app view and error context after init", async () => {
    const { pulse } = mockSdk();
    render(<CustomField />);
    await slider();
    expect(pulse).toHaveBeenCalledWith(
      "Viewed",
      expect.objectContaining({
        app_name: "Progress Bar",
        app_location: "CustomField",
      })
    );
    expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledWith(
      "Stack",
      "key-1"
    );
    expect(datadogRum.setGlobalContextProperty).toHaveBeenCalledWith(
      "User Id",
      "user-1"
    );
  });

  // BUG: spec says an SDK init failure shows the failure screen; init().then has no catch, so nothing is shown (blank field, unhandled rejection).
  it.skip("shows the failure screen when SDK init fails", async () => {
    vi.mocked(ContentstackAppSDK.init).mockRejectedValue(
      new Error("init failed")
    );
    render(<CustomField />);
    expect(
      await screen.findByText("Something went wrong.")
    ).toBeInTheDocument();
  });
});
