import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";
import { customRender } from "@/utils/customRender";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home", () => {
  it("renders unchanged", () => {
    const { container } = customRender(<Home />);
    expect(container).toMatchSnapshot();
  });
});
