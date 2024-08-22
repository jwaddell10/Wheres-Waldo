/**
 * @jest-environment jsdom
 */
import NavBar from "../components/NavBar";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { test } from "vitest";

test("NavBar renders", () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)

    //NavBar links render
    expect(screen.getByText("Home"))
    expect(screen.getByText("LeaderBoard"));
})