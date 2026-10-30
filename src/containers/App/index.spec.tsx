/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockSdk } from "../../test/sdk";
import App from "./index";

vi.mock("@contentstack/app-sdk", () => ({ default: { init: vi.fn() } }));

beforeEach(() => mockSdk());

describe("App routing", () => {
  it("renders the slider at #/custom-field", async () => {
    window.history.pushState({}, "", "/#/custom-field");
    render(<App />);
    expect(await screen.findByRole("slider")).toBeInTheDocument();
  });

  it("renders no field at the root route", () => {
    window.history.pushState({}, "", "/");
    const { container } = render(<App />);
    expect(screen.queryByRole("slider")).toBeNull();
    expect(container.querySelector(".app")).toBeEmptyDOMElement();
  });

  it("redirects a non-root pathname into the hash router", async () => {
    window.history.pushState({}, "", "/custom-field");
    render(<App />);
    expect(await screen.findByRole("slider")).toBeInTheDocument();
    expect(window.location.hash).toBe("#/custom-field");
  });
});
