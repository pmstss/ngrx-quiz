import { QuizStateNormalized } from "./quiz.state";

export class QuizHelpers {
    static isFinished(state: QuizStateNormalized) {
        return state && state.totalQuestions === state.answers.size;
    }

    static isStarted(state: QuizStateNormalized) {
        return state && state.answers.size > 0;
    }

    static isAnswered(state: QuizStateNormalized, step: number) {
        return state && state.answers.has(state.itemIds[step - 1]);
    }

    static getNextStep(state: QuizStateNormalized, startStep: number = 0) {
        if (state && !QuizHelpers.isFinished(state)) {
            const total = state.totalQuestions;
            for (let step = startStep + 1; step <= startStep + total + 1; ++step) {
                if (!QuizHelpers.isAnswered(state, step)) {
                    return step;
                }
            }
        }
        return 1;
    }

    static getScore(state: QuizStateNormalized) {
        console.log('### getScore recalculation');
        return 42;
    }
}