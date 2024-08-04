/**
 * @jest-environment jsdom
 */
import React from "react";
import LeaderBoard from "../components/LeaderBoard";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, test, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/vitest";
import userEvent from '@testing-library/user-event'

const imageId = import.meta.env.VITE_IMAGE_ID;

const server = setupServer(
  http.get(`/image/${imageId}/leaderboard`, () => {
    return HttpResponse.json({
      user: {
        name: "TestUser",
        time: 123,
      }, 
      user2: {
        name: "TestUser2",
        time: 456,
      }
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test("LeaderBoard component", async () => {
  const user = userEvent.setup();
  server.use(

  )
  
  render(
    <MemoryRouter>
      <LeaderBoard />
    </MemoryRouter>
  );

  // Find the button
  const clickAbleImage = await screen.findByAltText('waldobeach');

  // Click the button
  user.click(clickAbleImage);

  // Wait for the API call to complete and the data to be rendered
  waitFor(() => {
    expect(screen.getByText(/TestUserfdsfdsfsd/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });
});
