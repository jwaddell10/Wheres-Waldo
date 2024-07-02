/**
 * @jest-environment jsdom
 */
import LeaderBoard from "../components/LeaderBoard";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test } from "vitest";

test("LeaderBoard renders", () => {
    render(<MemoryRouter><LeaderBoard /></MemoryRouter>)
})