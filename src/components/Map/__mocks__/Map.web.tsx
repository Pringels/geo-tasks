import React, { forwardRef } from "react"
import { View } from "react-native"
import { Marker } from "react-native-svg"
import { MapProps } from "../types"
import { Text } from "react-native"

export const Map = forwardRef((props: MapProps, ref) => {
    if (ref) {
        const jumpTo = () => null
        const center = [10, 20]
        if (typeof ref === "function") {
            ref({ jumpTo, center })
        } else {
            ref.current = { jumpTo, center }
        }
    }
    return (
        <View>
            {props.markers?.map((m) => {
                return <Text key={m.id}>Map marker</Text>
            })}
        </View>
    )
})
