import "react-native"
import React, { forwardRef } from "react"
import { fireEvent, render } from "@testing-library/react-native"
import { Notes } from "./Notes"
import { expect, it } from "@jest/globals"

describe("Notes", () => {
    it("should toggle pin selection mode", () => {
        const { getByText, queryByText } = renderWithWrapper(<Notes />)

        let addNoteButton = getByText(/Add a note/i)
        fireEvent.press(addNoteButton)

        const setPinButton = queryByText(/Set pin here/i)
        expect(setPinButton).toBeTruthy()
        addNoteButton = queryByText(/Add a note/i)
        expect(addNoteButton).toBeFalsy()
    })

    it("should open a form when pin is selected", () => {
        const { getByText, getByPlaceholderText } = renderWithWrapper(<Notes />)

        fireEvent.press(getByText(/Add a note/i))
        fireEvent.press(getByText(/Set pin here/i))

        const titleInput = getByPlaceholderText("Vegetation")
        const descriptionInput = getByPlaceholderText("Power lines obstructed")

        expect(titleInput).toBeTruthy()
        expect(descriptionInput).toBeTruthy()
    })

    it("should populate the form and save a map marker", () => {
        const { getByText, getByPlaceholderText, queryByText } = renderWithWrapper(<Notes />)

        expect(queryByText("Map marker")).toBeFalsy()

        fireEvent.press(getByText(/Add a note/i))
        fireEvent.press(getByText(/Set pin here/i))

        const titleInput = getByPlaceholderText("Vegetation")
        const descriptionInput = getByPlaceholderText("Power lines obstructed")

        fireEvent(getByPlaceholderText("Vegetation"), "onChangeText", "Note title")
        fireEvent(getByPlaceholderText("Power lines obstructed"), "onChangeText", "Note desc")
        fireEvent.press(getByText(/Submit/i))

        expect(queryByText("Map marker")).toBeTruthy()
        expect(getByText(/Add a note/i)).toBeTruthy()
    })
})
