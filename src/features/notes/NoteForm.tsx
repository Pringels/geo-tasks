import React, { useEffect, useState } from "react"
import { ButtonPrimary, ButtonSecondary, ButtonSmall } from "../../components/Button/Button"
import { ImageInput, FormInput } from "../../components/Forms/Input"
import { Note } from "./types"
import styled from "styled-components/native"

import { FormRow } from "../../components/Forms/Layout"
import { View } from "react-native"

const NoteFormContainer = styled.View`
    margin: 16px;
`

const TitleBarContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
`

type NoteFormProps = {
    note?: Note
    onSave?: (note: Note) => void
    onCancel?: () => void
    onCreate?: (note: Pick<Note, "title" | "description" | "image">) => void
    onDelete?: (note: Note) => void
}

/**
 * TODO: Consider splitting forms out to native/web components. Or find out how to improve form accesibility with RN Web
 */
export const NoteForm = ({ note, onSave, onCancel, onCreate, onDelete }: NoteFormProps) => {
    const mode = note ? "edit" : "create"

    const [title, setTitle] = useState(note?.title || "")
    const [description, setDescription] = React.useState(note?.description || "")
    const [image, setImage] = useState(note?.image || "")

    useEffect(() => {
        setTitle(note?.title || "")
        setDescription(note?.description || "")
        setImage(note?.image || "")
    }, [note])

    return (
        <NoteFormContainer>
            <TitleBarContainer>
                <Title>Note details</Title>
                {onCancel && (
                    <ButtonSecondary
                        title="X"
                        onPress={() => {
                            if (onCancel) onCancel()
                        }}
                    />
                )}
            </TitleBarContainer>
            <FormRow>
                <FormInput
                    label="Title"
                    placeholder="Vegetation"
                    value={title}
                    onChange={setTitle}
                />
            </FormRow>
            <FormRow>
                <FormInput
                    label="Description"
                    placeholder="Power lines obstructed"
                    value={description}
                    onChange={setDescription}
                />
            </FormRow>
            <FormRow>
                <ImageInput label="Image" value={image} onChange={setImage} />
            </FormRow>
            {mode === "edit" && (
                <FormRow>
                    <ButtonSecondary
                        title="Delete"
                        onPress={() => {
                            if (onDelete && note) onDelete(note)
                        }}
                    />
                    <View style={{ marginLeft: "auto" }}>
                        <ButtonPrimary
                            title="Save"
                            onPress={() => {
                                if (onSave && note) onSave({ ...note, title, description, image })
                            }}
                        />
                    </View>
                </FormRow>
            )}
            {mode === "create" && (
                <FormRow>
                    <View style={{ marginLeft: "auto" }}>
                        <ButtonPrimary
                            title="Submit"
                            onPress={() => {
                                if (onCreate) onCreate({ title, description, image })
                            }}
                        />
                    </View>
                </FormRow>
            )}
        </NoteFormContainer>
    )
}
