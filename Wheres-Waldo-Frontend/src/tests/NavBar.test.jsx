/**
 * @jest-environment jsdom
 */
import NavBar from "../components/NavBar";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { test, expect } from "vitest";

test("NavBar renders", () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)
})