import {CardContainer, ColumnContainer, ColumnTitle} from "./styles.ts";

type ColumnProps = {
    text: string
}

export const Column = ({text}: ColumnProps) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            <CardContainer>Generate app scaffold</CardContainer>
            <CardContainer>Second Item</CardContainer>
            <CardContainer>Third Item</CardContainer>
        </ColumnContainer>
    )
}