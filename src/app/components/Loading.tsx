import { CSSProperties, useEffect, useState } from "react"

const styleContent: CSSProperties = {
    fontSize: '35px',
    // position: 'absolute',
    // left: '0',
    // top: '0',
    marginTop: '20px',
    textAlign: 'center'
}

type LoadingType = {
    text?: string
    speed?: number
}

export const Loading = ({ text = 'Loading', speed = 300 }: LoadingType) => {
    const [content, setContent] = useState(text);

    useEffect(() => {
        const id = window.setInterval(() => {
            setContent((content) => {
                return content === `${text}...` ? text : `${content}.`
            })
        }, speed);

        return () => window.clearInterval(id)
    }, [text, speed])

    return (
        <p style={styleContent}>{content}</p>
    )
}
