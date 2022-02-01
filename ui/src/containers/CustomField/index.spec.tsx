import React from "react";
import { render, waitFor } from "@testing-library/react/pure";
import CustomField from "./index";

let customFieldDom: any;
beforeAll(async () => {
  customFieldDom = render(<CustomField />);
});

describe(`UI Elements of Custom Field Screen`, () => {
  test(`Layout container element test`, async () => {
    await expect(
      waitFor(() =>
        customFieldDom?.container.querySelector(".layout-container")
      )
    ).toBeTruthy();
  });

  test(`progress bar element test`, async () => {
    await expect(
      waitFor(() => customFieldDom?.container.querySelector(".slideBarDiv"))
    ).toBeTruthy();
  });
});
