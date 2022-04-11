import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock"
import { render } from "@testing-library/react-native"
import { ThemeProvider } from "styled-components/native"
import { theme } from "./src/theme"

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage)
jest.mock("./src/components/Map/Map.web")

/**
 * A global theme wrapper for tests that contain styled-components
 */
global.renderWithWrapper = (component, options) => {
    const Wrapper = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
    return render(component, { wrapper: Wrapper, ...options })
}
