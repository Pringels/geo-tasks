import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { errorReportingService } from "../../services/errorReporting.service"
import { uuid } from "../../utils/uuid"
import { Note } from "./types"
import notesMock from "../../__mocks__/notesMock"

/**
 * This hook persists the notes in local storage for mocking purposes.
 * It does not perform well as all notes get serialized on every change.
 * In a real applicaiton this should call an API to persist data.
 */

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const { getItem, setItem } = useAsyncStorage("geo-notes")

    const createNote = (note: Note) => {
        const noteToCreate: Note = {
            ...note,
            id: uuid(),
        }
        setNotes((state) => [...state, noteToCreate])
    }
    const updateNote = (note: Note) => {
        if (note.id) {
            deleteNote(note.id)
            setNotes((state) => [...state, note])
        }
    }
    const deleteNote = (noteId: string) => setNotes((state) => state.filter((n) => n.id !== noteId))

    useEffect(() => {
        getItem().then((value: string | null) => {
            if (value) {
                try {
                    let _notes: Note[] = JSON.parse(value)
                    if (!_notes.length) {
                        setItem(JSON.stringify(notesMock))
                        _notes = notesMock
                    }
                    setNotes(_notes)
                } catch (e) {
                    errorReportingService.logError(e)
                }
            }
        })
    }, [])

    useEffect(() => {
        setItem(JSON.stringify(notes))
    }, [notes])

    return { notes, createNote, updateNote, deleteNote }
}
