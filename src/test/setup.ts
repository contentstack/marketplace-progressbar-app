import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Contentstack App SDK
vi.mock("@contentstack/app-sdk", () => ({
  default: {
    init: vi.fn().mockResolvedValue({
      getConfig: vi.fn().mockResolvedValue({}),
      location: {
        CustomField: {
          field: {
            getData: vi.fn().mockReturnValue(null),
            setData: vi.fn(),
          },
        },
      },
      stack: {
        _data: {
          api_key: "test-api-key",
          collaborators: [{ uid: "test-user-id" }],
        },
      },
      currentUser: {
        defaultOrganization: "test-org",
      },
      pulse: vi.fn(),
    }),
  },
}));

// Mock useJsErrorTracker hook
vi.mock("../hooks/useJsErrorTracker", () => ({
  default: () => ({
    setErrorsMetaData: vi.fn(),
  }),
}));

// Mock any global objects or functions that might be needed
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})) as unknown as typeof IntersectionObserver;
