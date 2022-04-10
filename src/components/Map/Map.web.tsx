import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import mapboxgl, { Map as MapType, Marker } from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { LngLatTuple, MapMarker, MapProps, MapRef } from "./types"
import styled from "styled-components"

if (!process.env.MAPBOX_ACCESS_TOKEN) {
    throw new Error("MAPBOX_ACCESS_TOKEN is not set")
}
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || ""

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`
/**
 * TODO: Look into using react-map-gl or similar wrapper instead of manually binding the map to a ref
 */
export const Map = forwardRef<MapRef, MapProps>(
    ({ initialCenter, markers, onClickMarker, interactive = true }: MapProps, ref) => {
        const [lngLat, setLngLat] = useState<LngLatTuple>(initialCenter)
        const markersRef = useRef<Marker[]>([])

        const mapContainer = useRef(null)
        const map = useRef<MapType>()

        useEffect(() => {
            if (map.current) return
            map.current = new mapboxgl.Map({
                container: mapContainer.current as any,
                style: "mapbox://styles/mapbox/streets-v11",
                center: initialCenter,
                interactive,
                zoom: 9,
            }) as MapType
            map.current.on("moveend", (e) => {
                const center = map.current?.getCenter()
                if (center) {
                    setLngLat([center.lng, center.lat])
                }
            })
            markers?.forEach(addMarker)
        }, [])

        useEffect(() => {
            markersRef.current.forEach((m) => m.remove())
            markersRef.current = []
            markers?.forEach(addMarker)
        }, [markers])

        // Update the forwarded ref whenever map's center changes
        useEffect(() => {
            if (ref) {
                const jumpTo = (lngLat: LngLatTuple) => map.current?.flyTo({ center: lngLat })
                if (typeof ref === "function") {
                    ref({ jumpTo, center: lngLat })
                } else {
                    ref.current = { jumpTo, center: lngLat }
                }
            }
        }, [lngLat])

        const addMarker = (marker: MapMarker) => {
            if (map.current) {
                const mapMarker = new mapboxgl.Marker({ color: "#222" })
                    .setLngLat(marker.lngLat)
                    .addTo(map.current)
                markersRef.current.push(mapMarker)
                if (onClickMarker) {
                    mapMarker.getElement().addEventListener("click", () => {
                        onClickMarker(marker)
                    })
                }
            }
        }

        return (
            <Container
                style={{
                    pointerEvents: interactive ? "all" : "none",
                }}
                ref={mapContainer}
            ></Container>
        )
    }
)
