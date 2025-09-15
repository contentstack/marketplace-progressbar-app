import { render, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeAll } from "vitest";
import CustomField from "./index";

let customFieldDom: any;
const elementsToTest = [".customField", ".customField__slide_bar"];

beforeAll(async () => {
  customFieldDom = render(<CustomField />);
});

describe("CustomField Component", () => {
  elementsToTest.forEach((e) => {
    test(`Testing ${e} element`, async () => {
      await expect(
        waitFor(() => customFieldDom?.container?.querySelector(e))
      ).toBeTruthy();
    });
  });
});
