import { beforeEach, expect, it, vi } from "vitest";
import { mockSdk } from "./test/sdk";

vi.mock("@contentstack/app-sdk", () => ({ default: { init: vi.fn() } }));
vi.mock("./reportWebVitals", () => ({ default: vi.fn() }));

beforeEach(() => vi.resetModules());

// The manifest loads the field at <host>/#/custom-field, so the real entry must route on the hash.
it("renders the slider when Contentstack loads the field at /#/custom-field", async () => {
  mockSdk([{ value: 33 }]);
  window.history.pushState({}, "", "/#/custom-field");
  document.body.innerHTML = '<div id="root"></div>';

  await import("./index");

  await vi.waitFor(() =>
    expect(document.querySelector('input[type="range"]')).toHaveAttribute(
      "aria-valuenow",
      "33"
    )
  );
});

it("throws when there is no root element", async () => {
  document.body.innerHTML = "";
  await expect(import("./index")).rejects.toThrow(
    "Failed to find the root element"
  );
});
