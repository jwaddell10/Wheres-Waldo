/**
 * @jest-environment jsdom
 */
import Image3 from "../components/Image3";
import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

test("Image3 Component", () => {
	// Render the component
	render(
		<MemoryRouter>
			<Image3 />
		</MemoryRouter>
	);

	// Check that the element is not present before the click
	expect(() => screen.getByTitle("circle")).toThrow();
	const clickAbleImage = screen.getByTitle("circleAndDropDownMenu");

	// Perform the click event and check if element is present
	fireEvent.click(clickAbleImage);
	expect(screen.getByTitle("circle")).toBeInTheDocument();
	expect(screen.getByText("Waldo")).toBeInTheDocument();
	expect(screen.getByText("Wenda")).toBeInTheDocument();
	expect(screen.getByText("Odlaw")).toBeInTheDocument();

	//item not present when click happens again
	fireEvent.click(clickAbleImage);
	expect(screen.queryByTitle("circle")).not.toBeInTheDocument();
	expect(screen.queryByText("Waldo")).not.toBeInTheDocument();
	expect(screen.queryByText("Wenda")).not.toBeInTheDocument();
	expect(screen.queryByText("Odlaw")).not.toBeInTheDocument();
});