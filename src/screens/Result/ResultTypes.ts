import { Result } from "../../types/CommonTypes";

export type sections = {percentage: number[]; colors: string[]}

export type ResultScreenViewProps = {
    result: Result
    sections: sections
    handleReTakeTest: () => void,
    logout: () => void;
  };