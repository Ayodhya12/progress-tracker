import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppProgressTracker from "./appProgressTracker";
import { ELessonStatus, EUserCourseStatus, ILessonStatusDTO } from "./types";

const App = () => {
  const sampleLessons: ILessonStatusDTO[] = [
    {
      lessonId: 1,
      lessonName: "Introduction to Programming",
      lessonDescription: "Basic concepts of programming.",
      lessonStatus: ELessonStatus.COMPLETED,
    },
    {
      lessonId: 2,
      lessonName: "JavaScript Basics",
      lessonDescription: "Learn variables, loops, and functions in JavaScript.",
      lessonStatus: ELessonStatus.IN_PROGRESS,
    },
    {
      lessonId: 3,
      lessonName: "React Fundamentals",
      lessonDescription: "Introduction to components and hooks in React.",
      lessonStatus: ELessonStatus.NOT_STARTED,
    },
    {
      lessonId: 4,
      lessonName: "Advanced React",
      lessonDescription: "Deep dive into React context and custom hooks.",
      lessonStatus: ELessonStatus.NOT_STARTED,
    },
  ];

  const userProgressStatus: EUserCourseStatus = EUserCourseStatus.IN_PROGRESS;

  return (
    <AppProgressTracker
      lessons={sampleLessons}
      userProgressStatus={userProgressStatus}
    />
  );
};

export default App;
