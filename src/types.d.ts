export interface ILessonStatusDTO {
  lessonId: number;
  lessonName: string;
  lessonDescription: string;
  lessonStatus: ELessonStatus;
}

export enum ELessonStatus {
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
}

export enum EUserCourseStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface IProgressTrackerProps {
  step: ILessonStatusDTO | null;
  userCourseStatus: EUserCourseStatus;
  rowStart: number;
  rowEnd: number;
  index: number;
  isReversed: boolean;
}
