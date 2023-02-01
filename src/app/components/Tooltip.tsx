import { CSSProperties, PropsWithChildren } from "react"
import { useHover } from "../hooks/useHover";

type TooltipType = PropsWithChildren<{
    text: string
}>

const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'flex'
}

const tooltipStyle: CSSProperties = {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
}

export const Tooltip = ({ text, children }: TooltipType) => {
    const [hovering, attrs] = useHover();
    return (
        <div style={containerStyle} {...attrs}>
            {hovering === true && <div style={tooltipStyle}>{text}</div>}
            {children}
        </div>
    )
}
