
import { QuoteType } from "@database/mongo";
import { ReactElement } from "react";

export interface IQuoteType {
    text: string;
    color: string;
    icon: ReactElement;
    colorScheme: string;
}

export type IQuoteTypes = {
    [key in QuoteType]: IQuoteType;
};
