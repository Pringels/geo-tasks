import React, { useState } from "react"
import styled from "styled-components/native"
import { ButtonSecondary, ButtonSmall } from "../Button/Button"
import * as ImagePicker from "expo-image-picker"
import { Image } from "react-native"

const Container = styled.View`
    flex-direction: column;
    width: 100%;
`

const Label = styled.Text`
    font-size: 14px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.primary};
`

const StyledTextInput = styled.TextInput`
    width: 100%;
    padding: 10px 0;
`

const Underline = styled.View`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.tertiary};
`

type InputProps = {
    label?: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
}
export const FormInput = ({ label, placeholder, value, onChange }: InputProps) => {
    return (
        <Container>
            <Label>{label}</Label>
            <StyledTextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
            ></StyledTextInput>
            <Underline />
        </Container>
    )
}

const ImageSelectioncontainer = styled.View`
    flex-direction: row;
    align-items: flex-start;
`

const ImagePreviewContainer = styled.Text`
    margin-left: auto;
`

const ImagePreview = styled.Image`
    width: 100px;
    height: 100px;
`

type FileInputProps = {
    label?: string
    value: string
    onChange: (image: string) => void
}

/**
 * TODO: make a version of this for web using an html file input
 */
export const ImageInput = ({ label, value, onChange }: FileInputProps) => {
    const [image, setImage] = useState(value || "")
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri)
            onChange(result.uri)
        }
    }
    return (
        <Container>
            <Label>{label}</Label>
            <ImageSelectioncontainer>
                <ButtonSmall title="Upload" onPress={pickImage} />
                {!!image && (
                    <ImagePreviewContainer>
                        <ImagePreview source={{ uri: image }} />
                    </ImagePreviewContainer>
                )}
            </ImageSelectioncontainer>
        </Container>
    )
}
