import { Results } from "../Question/QuestionTypes";

export type sections = {percentage: number[]; colors: string[]}
export type ResultScreenViewProps = {
    results: Results
    sections: sections
    handleReTakeTest: () => void,
    logout: () => void;
  };