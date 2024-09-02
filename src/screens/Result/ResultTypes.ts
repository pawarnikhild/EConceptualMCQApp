import { Result } from "../Question/QuestionTypes";

export type sections = {percentage: number[]; colors: string[]}
export type ResultScreenViewProps = {
    result: Result
    sections: sections
    handleReTakeTest: () => void,
    logout: () => void;
  };