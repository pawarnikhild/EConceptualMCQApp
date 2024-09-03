import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchQuestionsService } from "../../services/question-services";
import { Question } from "../../screens/Question/QuestionTypes";

type QuestionState = {
    questions: Question[],
    loading: boolean,
    error: string | null
}

const initialState: QuestionState = {
    questions: [],
    loading: false,
    error: null
}

export const fetchQuestions = createAsyncThunk<
    Question[], // Return type of the payload creator
    string // Argument type (token)
>('fetchQuestions', async (token) => fetchQuestionsService(token))

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.loading = false;
            state.questions = action.payload;
            console.log('Questions fetched and stored in questionSlice');
            // console.log('questionState', state);
        })
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            console.log('Error in fetching question in RDK', action.payload);
            state.loading = false;
            state.error = action.payload as string
        })

    }
});

export default questionSlice.reducer;