import React, { ReactNode } from "react"
import styled from "styled-components/native"

/**
 * TODO: Get rid of absolute positioning here and use flexbox instead
 */
const FullPageContainer = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 24px;
    flex-direction: row;
    justify-content: space-between;
`

type FullPageLayoutProps = {
    children: ReactNode
}

export const FullPageLayout = ({ children, ...props }: FullPageLayoutProps) => {
    return <FullPageContainer {...props}>{children}</FullPageContainer>
}
