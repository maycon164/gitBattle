import { useState } from "react"

type useHoverReturnType = [
    hovering: boolean,
    attrs: {
        onMouseOut: () => void,
        onMouseOver: () => void
    }
]

export const useHover = (): useHoverReturnType => {
    const [hovering, setHovering] = useState(false);

    const onMouseOver = () => setHovering(true)
    const onMouseOut = () => setHovering(false)

    return [
        hovering,
        {
            onMouseOut,
            onMouseOver,
        }
    ]

}