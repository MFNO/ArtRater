import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { ArtItem } from "./components/art-item/art-item";
import { rest } from "msw";
import { setupServer } from "msw/node";
import notistack from "notistack";

const server = setupServer(
  rest.post("https://v0867.mocklab.io/rating", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: { message: "test" } }));
  }),
  rest.get("https://api.artic.edu/api/v1/artworks/2", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: { title: "Mock", artist_title: "Mock", image_id: "2" } })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockEnqueue = jest.fn();
const mockClose = jest.fn();

jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
      closeSnackbar: mockClose,
    };
  },
}));

test("has title", () => {
  render(<App />);
  const title = screen.getByText("ART RATER");
  expect(title).toBeInTheDocument();
});

test("for an art item, submit button is disabled until a rating is selected", async () => {
  render(<ArtItem id={2} />);

  const submit = await screen.findByTestId("submit");
  expect(submit).toBeDisabled();

  const rating = screen.getByTestId("rating-1");
  fireEvent.click(rating);

  expect(submit).toBeEnabled();
});

test("for an art item, clicking numbered button updates rating display below image to be that number", async () => {
  render(<ArtItem id={2} />);

  const ratingButton = await screen.findByTestId("rating-1");

  fireEvent.click(ratingButton);

  expect(ratingButton).toHaveClass("selected");
});

test("for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other", async () => {
  render(<ArtItem id={2} />);

  const ratingButtonOne = await screen.findByTestId("rating-1");
  fireEvent.click(ratingButtonOne);
  expect(ratingButtonOne).toHaveClass("selected");

  const ratingButtonTwo = await screen.findByTestId("rating-2");
  fireEvent.click(ratingButtonTwo);
  expect(ratingButtonTwo).toHaveClass("selected");
});

test("for an art item, clicking submit POSTs update, displays a toast success message, hides buttons", async () => {
  render(<ArtItem id={2} />);

  const snackbarSpy = jest.spyOn(notistack, "useSnackbar");
  const ratingButtonOne = await screen.findByTestId("rating-1");
  fireEvent.click(ratingButtonOne);

  const submit = await screen.findByTestId("submit");
  fireEvent.click(submit);
  expect(snackbarSpy).toHaveBeenCalled();
});
