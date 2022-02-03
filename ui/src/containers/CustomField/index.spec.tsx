import React from "react";
import { render, waitFor } from "@testing-library/react/pure";
import CustomField from "./index";

let customFieldDom: any;
const elementsToTest = [".customField", ".customField__slide_bar"];

beforeAll(async () => {
  customFieldDom = render(<CustomField />);
});

elementsToTest.forEach((e) => {
  test(`Testing ${e} element`, async () => {
    await expect(
      waitFor(() => customFieldDom?.container?.querySelector(e))
    ).toBeTruthy();
  });
});
