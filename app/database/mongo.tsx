import { Schema, model } from "mongoose";

export enum QuoteType {
  DID_YOU_KNOW = "didYouKnow",
  ON_THIS_DAY = "onThisDay",
  IN_THE_NEWS = "inTheNews"
}

interface Link {
  value: string;
  text: string;
}

export interface Quote {
  _id: string;
  fullText: string;
  links: Link[];
  type: QuoteType;
  date: string;
  rating: number;
  reviewCount: number;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Quote>({
  _id: { type: String, required: true },
  fullText: { type: String, required: true },
  links: { type: [{ value: String, text: Date }], required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true }
});

// 3. Create a Model.
export default model<Quote>("Quote", schema);
