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
    expect(screen.getByText(`Where's Waldo`))
    expect(screen.getByText(`Welcome to Where's Waldo! To play, click image below. Timer starts once you select your image. Good luck!`))

    //images display on screen
    expect(screen.getByText("Waldo Beach"))
    expect(screen.getByText("Waldo Downtown"))
    expect(screen.getByText("Waldo Factory"))
});