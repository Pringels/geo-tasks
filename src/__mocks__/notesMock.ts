import { faker } from "@faker-js/faker"
import { LngLatTuple } from "../components/Map/types"
import { Note } from "../features/notes/types"
import { uuid } from "../utils/uuid"

const count = 20
const notesMock: Note[] = []

for (let i = 0; i <= count; i++) {
    const title = faker.lorem.word()
    const description = faker.lorem.words(3)
    const lngLat = faker.address
        .nearbyGPSCoordinate([13.4, 52.52], 10, true)
        .map((n) => parseFloat(n)) as LngLatTuple
    const note = { id: uuid(), title, description, lngLat }
    notesMock.push(note)
}

export default notesMock
