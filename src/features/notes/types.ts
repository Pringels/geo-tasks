import { LngLatTuple } from "../../components/Map/types"

export type Note = {
    id?: string
    title: string
    description: string
    image?: string
    lngLat: LngLatTuple
}
