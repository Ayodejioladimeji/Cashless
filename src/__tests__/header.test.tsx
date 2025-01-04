import { render, screen, fireEvent } from "@testing-library/react"
import { DataContext } from "@/store/GlobalState"
import Header from "@/components/layout/header"
import { ACTIONS } from "@/store/Actions"
import React from "react"


const mockDispatch = jest.fn();

const mockContextValue = {
    state: { user: { fullname: "John Doe" } },
    dispatch: mockDispatch
};

describe("Header Component", () => {
    test("renders the title prop correctly", () => {
        render(
            <DataContext.Provider value={mockContextValue}>
                <Header title="Test Title" />
            </DataContext.Provider>
        );

        // Check if the title is rendered correctly
        expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    test("displays user initials correctly", () => {
        render(
            <DataContext.Provider value={mockContextValue}>
                <Header title="Test Title" />
            </DataContext.Provider>
        );

        // Verify the initials are displayed in the avatar div
        expect(screen.getByText("JD")).toBeInTheDocument();
    });

    test("dispatches OPEN_SIDEBAR action when menu icon is clicked", () => {
        render(
            <DataContext.Provider value={mockContextValue}>
                <Header title="Test Title" />
            </DataContext.Provider>
        );

        // Simulate clicking the MenuIcon
        fireEvent.click(screen.getByRole('button'));

        // Verify that the dispatch function is called with the correct action
        expect(mockDispatch).toHaveBeenCalledWith({
            type: ACTIONS.OPEN_SIDEBAR,
            payload: true
        });
    });
});
