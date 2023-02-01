import { Children, PropsWithChildren, useContext } from "react"
import ThemeContext from "../contexts/theme"

type CardType = PropsWithChildren<{
    header: string,
    subheader?: string,
    avatar: string,
    href: string,
    name: string
}>

export const Card = ({ header, avatar, subheader, href, name, children }: CardType) => {

    const theme = useContext(ThemeContext);

    return (
        <div className={`card bg-${theme}`}>
            <h4 className="header-lg center-text">
                {header}
            </h4>
            <img
                className="avatar"
                src={avatar}
                alt={`avatar for ${name}`}
            />
            {
                subheader && (
                    <h4 className="center-text">
                        {subheader}
                    </h4>
                )
            }
            <h2 className="center-text">
                <a href={href} className="link">{name}</a>
            </h2>
            {children}
        </div>
    )
}
