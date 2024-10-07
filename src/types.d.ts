declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMeta {
  env: {
    VITE_OPENAI_API_KEY: string;
  };
}

type Difficulty = "상" | "중" | "하";
type QuizNum = "5" | "10" | "15";
type QuizType = "객관식" | "빈칸 채우기" | "OX 퀴즈" | "랜덤";

interface CardProps {
  topic: string;
}

type QuizOption = {
  // card: CardProps;
  topic: string;
  quizType: QuizType;
  difficulty: Difficulty;
  quizNum: QuizNum;
};

type Quiz =
  | {
      question: string;
      options: string[];
      answer: string;
    }
  | {
      question: string;
      option: boolean;
      answer: boolean;
    }
  | {
      question: string;
      answer: string;
    };

interface QuizResponse {
  MultipleQuestion?: Quiz[];
  TrueOrFalse?: Quiz[];
  FillBlank?: Quiz[];
}
interface TopicType {
  id: number;
  title: string;
  "background-color": string;
  icon: string;
  isIconBlack: boolean;
  discription: string;
}
