/**
 * @jest-environment jsdom
 */
import React from "react";
import LeaderBoard from "../components/LeaderBoard";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, test, expect, vitest } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/vitest";
import userEvent from '@testing-library/user-event'

vitest.mock('components/apiCalls/getLeaderboard.js', {
  getLeaderboard: vitest.fn(() => {
    {data: 'Something'}
  })
})

const imageId = import.meta.env.VITE_IMAGE_ID;

// const server = setupServer(
//   http.get(`/image/${imageId}/leaderboard`, () => {
//     return HttpResponse.json({
//       user: {
//         name: "TestUser",
//         time: 123,
//       }, 
//       user2: {
//         name: "TestUser2",
//         time: 456,
//       }
//     });
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());


test("LeaderBoard component", async () => {
  const user = userEvent.setup();
  // server.use(

  // )
  
  render(
    <MemoryRouter>
      <LeaderBoard />
    </MemoryRouter>
  );

  // Find the button
  const clickAbleImage = await screen.findByAltText('waldobeach');
  
  // Click the button
  user.click(clickAbleImage);

  expect(screen.getByText(/TestUser/)).toBeInTheDocument();

  // Wait for the API call to complete and the data to be rendered
  // await waitFor(() => {
  //   expect(screen.getByText(/TestUser/)).toBeInTheDocument();
  //   expect(screen.getByText(/123/)).toBeInTheDocument();
  // });
});
