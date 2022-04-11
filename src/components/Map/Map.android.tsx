import MapboxGL from "@react-native-mapbox-gl/maps"
import React, { forwardRef, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import styled from "styled-components/native"
import { Marker } from "../Icons/Marker"
import { LngLatTuple, MapProps, MapRef } from "./types"

if (!process.env.MAPBOX_ACCESS_TOKEN) {
    throw new Error("MAPBOX_ACCESS_TOKEN is not set")
}

MapboxGL.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN)

const Container = styled.View`
    height: 100%;
    width: 100%;
`

const MarkerContainer = styled.View`
    width: 60px;
`

const TouchableMarkerContainer = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
})

export const Map = forwardRef<MapRef, MapProps>(
    ({ initialCenter, markers, onClickMarker, interactive = true }: MapProps, ref) => {
        useEffect(() => {
            MapboxGL.setTelemetryEnabled(false)
        }, [])

        const [cameraCenter, setCameraCenter] = useState<LngLatTuple>(initialCenter)
        const [center, setCenter] = useState<LngLatTuple>(initialCenter)

        useEffect(() => {
            const jumpTo = (lngLat: LngLatTuple) => setCameraCenter(lngLat)
            if (ref) {
                if (typeof ref === "function") {
                    ref({ jumpTo, center })
                } else {
                    ref.current = { jumpTo, center }
                }
            }
        }, [ref, center])

        return (
            <Container>
                <MapboxGL.MapView
                    zoomEnabled={interactive}
                    scrollEnabled={interactive}
                    pitchEnabled={interactive}
                    rotateEnabled={interactive}
                    style={styles.map}
                    onRegionDidChange={(e) => {
                        setCenter(e.geometry.coordinates)
                    }}
                >
                    <MapboxGL.Camera
                        zoomLevel={9}
                        animationMode={"flyTo"}
                        centerCoordinate={cameraCenter}
                    />
                    {markers?.map((m) => {
                        return (
                            <MapboxGL.MarkerView id={m.id} key={m.id} coordinate={m.lngLat}>
                                <MarkerContainer>
                                    <TouchableMarkerContainer
                                        onPress={() => {
                                            if (onClickMarker) onClickMarker(m)
                                        }}
                                    >
                                        <Marker />
                                    </TouchableMarkerContainer>
                                </MarkerContainer>
                            </MapboxGL.MarkerView>
                        )
                    })}
                </MapboxGL.MapView>
            </Container>
        )
    }
)
