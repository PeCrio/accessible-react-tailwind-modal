import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

test("renders modal content", () => {
  render(
    <Modal.Frame open={true} onClose={() => {}}>
      <div>Modal Content</div>
    </Modal.Frame>
  );
  const modalContent = screen.getByText(/Modal Content/i);
  expect(modalContent).toBeInTheDocument();
});

test("does not render modal content when isOpen is false", () => {
  render(
    <Modal.Frame open={false} onClose={() => {}}>
      <div>Modal Content</div>
    </Modal.Frame>
  );
  const modalContent = screen.queryByText(/Modal Content/i);
  expect(modalContent).toBeNull();
});

describe("Closing Modal", () => {
  test("Calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal.Frame open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal.Frame>
    );
    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Pressing the escape button closes the modal", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal.Frame open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal.Frame>
    );
    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Clicking outside closes the modal", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal.Frame open={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal.Frame>
    );
    const modalContent = screen.getByText(/Modal Content/i);
    expect(modalContent).toBeInTheDocument();

    const modalOverlay = screen.getByTestId("modal-overlay");
    fireEvent.click(modalOverlay);
    expect(onCloseMock).toHaveBeenCalled();
  });
});

test("Focus is locked within the modal", () => {
  render(
    <Modal.Frame open={true} onClose={() => {}}>
      <div>Modal Content</div>
      <button data-testid="first-focusable-element">
        First Focusable Element
      </button>
      <button data-testid="last-focusable-element">
        Last Focusable Element
      </button>
    </Modal.Frame>
  );

  const modalContent = screen.getByText(/Modal Content/i);
  const firstFocusableElement = screen.getByTestId("first-focusable-element");
  const lastFocusableElement = screen.getByTestId("last-focusable-element");
  const closeButton = screen.getByTestId("modal-close-button");

  expect(modalContent).toBeInTheDocument();
  expect(firstFocusableElement).toHaveFocus();

  // Simulate pressing the Tab key to check if focus is locked within the modal
  fireEvent.keyDown(document, { key: "Tab" });
  expect(lastFocusableElement).toHaveFocus();

  fireEvent.keyDown(document, { key: "Tab" });
  expect(closeButton).toHaveFocus();

  fireEvent.keyDown(document, { key: "Tab" });
  expect(firstFocusableElement).toHaveFocus();
});
