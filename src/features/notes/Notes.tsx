import React, { useMemo, useRef, useState } from "react"
import { Platform } from "react-native"
import { useNotes } from "./useNotes"
import { Map } from "../../components/Map"
import styled from "styled-components/native"
import { NoteForm } from "./NoteForm"
import { ButtonPrimary, ButtonSecondary } from "../../components/Button/Button"
import { LngLatTuple, MapMarker, MapRef } from "../../components/Map/types"
import { Marker as MarkerIcon } from "../../components/Icons/Marker"
import { Note } from "./types"
import { errorReportingService } from "../../services/errorReporting.service"
import { FullPageLayout } from "../../components/Layout/FullPageLayout"
import { Modal } from "../../components/Modal"

const STARTING_LNG_LAT = [13.4, 52.52]

const NotesContainer = styled.View`
    width: 100%;
    height: 100%;
`
const ActionsContainer = styled.View`
    flex-direction: column;
    align-items: flex-start;
`
const FormContainer = styled.View`
    margin-left: auto;
    margin-right: 100px;
    width: 300px;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

const MobileFormContainer = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`

const ActionRow = styled.View`
    margin: 8px 0;
`

type ModeInitial = {
    state: "initial"
}
type ModePickingLocation = {
    state: "pickLocation"
}
type ModeAddingNote = {
    state: "createNote"
    lngLat: LngLatTuple
}
type ModeEditingNote = {
    state: "editNote"
    note: Note
}
type Mode = ModeInitial | ModePickingLocation | ModeAddingNote | ModeEditingNote

export const Notes = () => {
    const { notes, createNote, updateNote, deleteNote } = useNotes()
    const [mode, setMode] = useState<Mode>({ state: "initial" })
    const isWeb = Platform.OS === "web"

    const handleCancel = () => {
        setMode({ state: "initial" })
    }
    const handleAddNote = () => {
        setMode({ state: "pickLocation" })
    }
    const handlePickLocation = () => {
        const lngLat = mapRef.current?.center
        if (lngLat) {
            setMode({ state: "createNote", lngLat })
        } else {
            setMode({ state: "initial" })
        }
    }
    const handleCreate = (note: Note) => {
        setMode({ state: "initial" })
        createNote(note)
    }
    const handleEdit = (mapMarker: MapMarker) => {
        const note = notes.find((n) => n.id === mapMarker.id)
        if (note) {
            setMode({ state: "editNote", note })
            if (mapRef) {
                mapRef.current?.jumpTo(mapMarker.lngLat)
            }
        } else {
            errorReportingService.logError(
                `A marker was clicked for a note that does not exist. Note ID: ${mapMarker.id}`
            )
            setMode({ state: "initial" })
        }
    }
    const handleSave = (editedNote: Note) => {
        const lngLat = mapRef.current?.center
        if (lngLat) {
            updateNote({ ...editedNote, lngLat })
            setMode({ state: "initial" })
        }
    }
    const handleDelete = (note: Note) => {
        if (note.id) deleteNote(note.id)
        setMode({ state: "initial" })
    }

    const mapRef = useRef<MapRef>()
    const mapMarkers = useMemo(() => notes.map(({ lngLat, id }) => ({ lngLat, id })), [notes])
    const mapDisabled = mode.state === "createNote"
    const centerMarkerVisible =
        mode.state === "pickLocation" || mode.state === "createNote" || mode.state === "editNote"

    const cancelButton = (
        <ActionRow>
            <ButtonSecondary title="X" onPress={handleCancel} />
        </ActionRow>
    )

    // Dirty workarounds due to my inexperience with react-native for web :D
    const disablePointerEvents = isWeb
    const DeviceSpecificFormContainer = Platform.OS === "web" ? FormContainer : MobileFormContainer

    return (
        <NotesContainer pointerEvents={disablePointerEvents ? "none" : "box-none"}>
            <Map
                initialCenter={STARTING_LNG_LAT}
                markers={mapMarkers}
                onClickMarker={handleEdit}
                interactive={!mapDisabled}
                ref={mapRef}
            />
            {centerMarkerVisible && <CenterMarker />}
            <FullPageLayout pointerEvents="box-none">
                {mode.state === "initial" && (
                    <ActionsContainer>
                        <ActionRow>
                            <ButtonPrimary
                                onPress={handleAddNote}
                                title="Add a note"
                            ></ButtonPrimary>
                        </ActionRow>
                    </ActionsContainer>
                )}
                {mode.state === "pickLocation" && (
                    <ActionsContainer>
                        {cancelButton}
                        <ActionRow>
                            <ButtonPrimary title="Set pin here" onPress={handlePickLocation} />
                        </ActionRow>
                    </ActionsContainer>
                )}
                {mode.state === "createNote" && (
                    <>
                        <DeviceSpecificFormContainer>
                            <Modal>
                                <NoteForm
                                    onCreate={(partialNote) =>
                                        handleCreate({ ...partialNote, lngLat: mode.lngLat })
                                    }
                                    onCancel={handleCancel}
                                />
                            </Modal>
                        </DeviceSpecificFormContainer>
                    </>
                )}
                {mode.state === "editNote" && (
                    <DeviceSpecificFormContainer>
                        <Modal>
                            <NoteForm
                                note={mode.note}
                                onSave={handleSave}
                                onDelete={handleDelete}
                                onCancel={handleCancel}
                            />
                        </Modal>
                    </DeviceSpecificFormContainer>
                )}
            </FullPageLayout>
        </NotesContainer>
    )
}

const CenterMarkerContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -20px;
    right: 4px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const CenterMarker = () => (
    <CenterMarkerContainer pointerEvents="none">
        <MarkerIcon viewBox="0 0 28 32" />
    </CenterMarkerContainer>
)
