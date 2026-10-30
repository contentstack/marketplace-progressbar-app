import ContentstackAppSDK from "@contentstack/app-sdk";
import { vi } from "vitest";

/** Builds a fake App SDK for the custom-field location and makes `init` resolve to it. */
export const mockSdk = (saved: unknown = null) => {
  const setData = vi.fn();
  const pulse = vi.fn();
  const sdk = {
    getConfig: vi.fn().mockResolvedValue({}),
    location: {
      CustomField: {
        field: { getData: vi.fn().mockReturnValue(saved), setData },
      },
    },
    stack: { _data: { api_key: "key-1", collaborators: [{ uid: "user-1" }] } },
    currentUser: { defaultOrganization: "org-1" },
    pulse,
  };
  vi.mocked(ContentstackAppSDK.init).mockResolvedValue(sdk as never);
  return { sdk, setData, pulse };
};
