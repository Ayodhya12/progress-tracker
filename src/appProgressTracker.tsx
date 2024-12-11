import React, { useEffect, useMemo, useRef, useState } from "react";
import { ELessonStatus, EUserCourseStatus, ILessonStatusDTO } from "./types";
import ProgressTrackerStep from "./progressTrackerStep";
import styles from "./app-progress-tracker.module.scss";

interface IProgressTrackerProps {
  lessons: ILessonStatusDTO[];
  userProgressStatus: EUserCourseStatus;
}

const AppProgressTracker = (props: IProgressTrackerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState(1);

  const staticLesson: ILessonStatusDTO = {
    lessonId: -1,
    lessonName: "Certificate",
    lessonDescription: "",
    lessonStatus: ELessonStatus.COMPLETED,
  };

  const lessonsWithStatic =
    props.lessons?.length > 0 ? [...props.lessons, staticLesson] : [];
  const itemsArray = Array.from(
    { length: lessonsWithStatic.length },
    (_, index) => index + 1
  );

  const getSnakePatternItems = (items: any, columns: any) => {
    const result = [];

    for (
      let columnIndex = 0;
      columnIndex < items.length;
      columnIndex += columns
    ) {
      const rowItems = items.slice(columnIndex, columnIndex + columns);
      const isReversed = Math.floor(columnIndex / columns) % 2 !== 0;
      while (rowItems.length < columns) {
        rowItems.push(null);
      }

      const start = rowItems[0];
      const end = rowItems[rowItems.length - 1];

      if (isReversed) {
        rowItems.reverse();
      }
      result.push(
        ...rowItems.map((item: any) => ({
          value: item,
          isReversed,
          start,
          end,
        }))
      );
    }
    return { result };
  };

  const updateColumnCount = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newColumnCount = Math.floor(containerWidth / 250) || 1;
      setColumnCount(newColumnCount);
    }
  };

  useEffect(() => {
    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => {
      window.removeEventListener("resize", updateColumnCount);
    };
  }, []);

  const { snakePatternItems } = useMemo(() => {
    const { result } = getSnakePatternItems(itemsArray, columnCount);
    return { snakePatternItems: result };
  }, [columnCount, itemsArray]);

  return (
    <div className={`${styles.container}`} ref={containerRef}>
      {snakePatternItems.map((item, index) => (
        <div key={index} className={`${styles.item}`}>
          <ProgressTrackerStep
            step={item.value ? lessonsWithStatic[item.value - 1] : null}
            userCourseStatus={props.userProgressStatus}
            rowStart={item.start}
            rowEnd={item.end}
            index={item.value}
            isReversed={item.isReversed}
          />
        </div>
      ))}
    </div>
  );
};

export default AppProgressTracker;
