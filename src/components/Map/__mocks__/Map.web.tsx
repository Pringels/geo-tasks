import React, { forwardRef } from "react"
import { Text, View } from "react-native"
import { MapProps } from "../types"

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
