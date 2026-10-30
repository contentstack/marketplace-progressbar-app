import { expect, it, vi } from "vitest";
import reportWebVitals from "./reportWebVitals";

const fns = vi.hoisted(() => ({
  getCLS: vi.fn(),
  getFID: vi.fn(),
  getFCP: vi.fn(),
  getLCP: vi.fn(),
  getTTFB: vi.fn(),
}));
vi.mock("web-vitals", () => fns);

it("passes the callback to every web-vitals metric", async () => {
  const cb = vi.fn();
  reportWebVitals(cb);
  await vi.waitFor(() => expect(fns.getTTFB).toHaveBeenCalledWith(cb));
  Object.values(fns).forEach((f) => expect(f).toHaveBeenCalledWith(cb));
});

it("does nothing without a callback", async () => {
  Object.values(fns).forEach((f) => f.mockClear());
  reportWebVitals();
  await new Promise((r) => {
    setTimeout(r, 0);
  });
  Object.values(fns).forEach((f) => expect(f).not.toHaveBeenCalled());
});
