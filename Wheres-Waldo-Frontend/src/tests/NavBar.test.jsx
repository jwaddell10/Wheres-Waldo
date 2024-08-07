/**
 * @jest-environment jsdom
 */
import NavBar from "../components/NavBar";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { test } from "vitest";

test("NavBar renders", () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)

    //NavBar links render
    screen.getByText("Home")
    screen.getByText("LeaderBoard")
})