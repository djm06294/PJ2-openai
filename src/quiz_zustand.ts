import { create } from "zustand";
import "./types.d.ts"; // Quiz, QuizOption 등의 타입이 정의된 파일을 임포트

interface QuizState {
  quizzes: Quiz[]; // 상태 타입 명시
  quizType: QuizType;
  setQuiz: (data: Quiz[]) => void; // 상태 변경 함수 타입 명시
  setQuizType: (data: QuizType) => void;
  removeQuiz: () => void;
  getCountQuiz: () => number;
}
// Quiz 관련 상태 저장소
const useQuiz = create<QuizState>((set, get) => ({
  quizzes: [],
  quizType: "객관식",
  setQuiz: (data: Quiz[]) => set(() => ({ quizzes: data })),
  setQuizType: (data: QuizType) => set(() => ({ quizType: data })),
  removeQuiz: () => set({ quizzes: [] }),
  getCountQuiz: () => get().quizzes.length,
}));

interface QuizSetting {
  quizOption: QuizOption;
  setTopic: (topic_: string) => void;
  setType: (quizType_: QuizType) => void;
  setDiff: (difficulty_: Difficulty) => void;
  setNum: (quizNum_: QuizNum) => void;
  resetQuizOption: () => void; // 초기 상태로 돌려놓는 함수
}
// Quiz 옵션 관련 상태 저장소
const useQuizOption = create<QuizSetting>((set) => ({
  quizOption: {
    topic: "",
    quizType: "객관식",
    difficulty: "중",
    quizNum: "10",
  },
  setTopic: (topic_: string) =>
    set((state) => ({ quizOption: { ...state.quizOption, topic: topic_ } })),

  setType: (quizType_: QuizType) =>
    set((state) => ({
      quizOption: { ...state.quizOption, quizType: quizType_ },
    })),

  setDiff: (difficulty_: Difficulty) =>
    set((state) => ({
      quizOption: { ...state.quizOption, difficulty: difficulty_ },
    })),
  setNum: (quizNum_: QuizNum) =>
    set((state) => ({
      quizOption: { ...state.quizOption, quizNum: quizNum_ },
    })),
  resetQuizOption: () =>
    set(() => ({
      quizOption: {
        topic: "",
        quizType: "객관식",
        difficulty: "중",
        quizNum: "10",
      }, // 초기 상태로 되돌리기
    })),
}));

interface UserAnswer {
  answers: (string | boolean)[];
  setAnswer: (idx: number, ans: string | boolean) => void;
  removeAnswer: () => void;
  getCountAnswer: () => number;
}
const userAnswer = create<UserAnswer>((set, get) => ({
  answers: [],
  setAnswer: (idx: number, ans: string | boolean) =>
    set((state) => {
      const updatedAnswers = [...state.answers]; // 기존 배열 복사
      updatedAnswers[idx] = ans; // 해당 인덱스에 값을 저장
      return { answers: updatedAnswers }; // 상태 업데이트
    }),
  removeAnswer: () => set({ answers: [] }),
  getCountAnswer: () =>
    get().answers.filter((ans) => typeof ans !== "undefined").length,
}));

export default useQuiz;
export { useQuizOption };
export { userAnswer };
