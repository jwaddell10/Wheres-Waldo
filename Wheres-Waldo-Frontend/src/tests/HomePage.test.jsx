/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "../components/HomePage";
import NavBar from "../components/NavBar";
import { MemoryRouter } from "react-router-dom";

test("HomePage tests", async () => {

    //renders homepage component
    render(<MemoryRouter><HomePage /></MemoryRouter>);

    //title and gamerules display on the screen
    expect(screen.getByRole('title'))
    expect(screen.getByRole('gameRules'))

    //images display on screen
    expect(screen.getByRole("Image1"))
    expect(screen.getByRole("Image2"))
    expect(screen.getByRole("Image3"))
});