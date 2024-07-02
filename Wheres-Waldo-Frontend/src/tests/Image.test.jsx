/**
 * @jest-environment jsdom
 */

import Image1 from "../components/Image1";
import Image2 from "../components/Image1";
import Image3 from "../components/Image1";
import { test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
// screen.debug()

test("Image1 Component", async () => {
    // Render the component
    render(<MemoryRouter><Image1 /></MemoryRouter>);

    // Check that the element is not present before the click
    expect(() => screen.getByTitle("circle")).toThrow();

    // Perform the click event
    fireEvent.click(screen.getByAltText("Waldo Beach"));

    // Now check that the element is present after the click
    expect(screen.getByTitle("circle"))
});
