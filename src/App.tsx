import React from "react"
import styled, { ThemeProvider } from "styled-components/native"
import { Notes } from "./features/notes/Notes"
import { theme } from "./theme"

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`

export default function App() {
    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Notes />
            </ThemeProvider>
        </Container>
    )
}
