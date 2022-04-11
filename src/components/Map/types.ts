export type LngLatTuple = [number, number]

export type MapMarker = {
    id: string
    lngLat: LngLatTuple
}

export type MapRef = {
    jumpTo: (lngLat: LngLatTuple) => void
    center: LngLatTuple
}

export type MapProps = {
    initialCenter: LngLatTuple
    markers?: MapMarker[]
    onClickMarker?: (marker: MapMarker) => void
    interactive?: boolean
}
