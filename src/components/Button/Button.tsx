import React from "react"
import styled from "styled-components/native"

type ButtonProps = {
    title: string
    onPress: () => void
}

const ButtonBase = styled.TouchableOpacity`
    shadow-opacity: 0.25;
    shadow-radius: 2px;
    shadow-color: #0f172a;
    shadow-offset: 0px 5px;
    border-radius: 10px;
    padding: 12px 24px;
`

const TextBase = styled.Text`
    font-weight: bold;
    text-align: center;
`

const ButtonPrimaryContainer = styled(ButtonBase)`
    background-color: ${({ theme }) => theme.colors.primary};
`
const ButtonPimaryText = styled(TextBase)`
    color: white;
    font-weight: bold;
    text-align: center;
`

export const ButtonPrimary = ({ title, onPress }: ButtonProps) => {
    return (
        <ButtonPrimaryContainer onPress={onPress}>
            <ButtonPimaryText>{title}</ButtonPimaryText>
        </ButtonPrimaryContainer>
    )
}

const ButtonSecondaryContainer = styled(ButtonBase)`
    background-color: ${({ theme }) => theme.colors.secondary};
`
const ButtonSecondaryText = styled(TextBase)`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    text-align: center;
`

export const ButtonSecondary = ({ title, onPress }: ButtonProps) => {
    return (
        <ButtonSecondaryContainer onPress={onPress}>
            <ButtonSecondaryText>{title}</ButtonSecondaryText>
        </ButtonSecondaryContainer>
    )
}

const ButtonSmallContainer = styled.TouchableOpacity`
    border-radius: 5px;
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.tertiary};
`
const ButtonSmallText = styled(TextBase)`
    color: ${({ theme }) => theme.colors.tertiary};
    text-align: center;
`

export const ButtonSmall = ({ title, onPress }: ButtonProps) => {
    return (
        <ButtonSmallContainer onPress={onPress}>
            <ButtonSmallText>{title}</ButtonSmallText>
        </ButtonSmallContainer>
    )
}
