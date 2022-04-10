import React, { ReactNode } from "react"
import { View } from "react-native"
import styled from "styled-components/native"

type ModalProps = {
    children: ReactNode
}

/**
 * TODO: Use a native modal for iOS and Android
 */
const StyledModal = styled.View`
    width: 100%;
    shadow-opacity: 0.35;
    shadow-radius: 8px;
    shadow-color: #0f172a;
    shadow-offset: 0px 0px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.secondary};
`

export const Modal = ({ children }: ModalProps) => {
    return <StyledModal>{children}</StyledModal>
}
