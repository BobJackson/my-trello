import {CardContainer} from "./styles.ts";


type CardProps = {
    text: string
}

export const Card = ({text}: CardProps) => {
    return <CardContainer>{text}</CardContainer>
}