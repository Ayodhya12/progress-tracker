import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { BsFillCheckCircleFill, BsTrophyFill } from "react-icons/bs";
import styles from "./progress-tracker-step.module.scss";
import { ILessonStatusDTO, EUserCourseStatus, ELessonStatus } from "./types";

interface IProgressTrackerProps {
  step: ILessonStatusDTO | null;
  userCourseStatus: EUserCourseStatus;
  rowStart: number;
  rowEnd: number;
  index: number;
  isReversed: boolean;
}

const ProgressTrackerStep: FC<IProgressTrackerProps> = (props) => {
  const getStyleClass = (status: ELessonStatus) => {
    switch (status) {
      case ELessonStatus.COMPLETED:
        return styles.iconComplete;
      case ELessonStatus.IN_PROGRESS:
        return styles.iconInProgress;
      default:
        return styles.iconNotStarted;
    }
  };

  const shouldShowConnector = (condition: any) => {
    return props.step?.lessonId === -1 ? condition !== null : true;
  };

  const showLeftConnector =
    !props.isReversed &&
    props.index !== props.rowStart &&
    shouldShowConnector(props.rowStart);
  const showRightConnector =
    !props.isReversed &&
    props.index !== props.rowEnd &&
    shouldShowConnector(props.rowEnd);
  const showLeftConnectorWithReverse =
    props.isReversed &&
    props.index !== props.rowStart &&
    shouldShowConnector(props.rowStart);
  const showRightConnectorWithReverse =
    props.isReversed &&
    props.index !== props.rowEnd &&
    shouldShowConnector(props.rowEnd);
  const showRowEndConnector = props.index === props.rowEnd;
  const showRowStartConnector = props.index === props.rowStart;

  if (props.step === null) {
    return <div />;
  }

  return (
    <Row>
      <Col>
        <Row>
          <Col
            className="d-flex justify-content-center"
            style={{ minHeight: "25px" }}
          >
            {showRowStartConnector && props.index !== 1 && (
              <div className={styles.progressTracker__verticalConnector} />
            )}
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col>
            {(showLeftConnector || showRightConnectorWithReverse) && (
              <div className={`${styles.progressTracker__connector}`} />
            )}
          </Col>
          <Col xs={"auto"} style={{ width: 16 }} className="p-0">
            <Row>
              <Col>
                {props?.step?.lessonName === "Certificate" ? (
                  <div
                    className={`${styles.progressTracker__icon} ${
                      props?.userCourseStatus === EUserCourseStatus.COMPLETED
                        ? styles.iconCertificate
                        : styles.iconNotStarted
                    }`}
                  >
                    <BsTrophyFill />
                  </div>
                ) : (
                  <div
                    className={`${
                      styles.progressTracker__styicon
                    } ${getStyleClass(props.step?.lessonStatus)}`}
                  >
                    <BsFillCheckCircleFill />
                  </div>
                )}
              </Col>
            </Row>
          </Col>
          <Col>
            {(showRightConnector || showLeftConnectorWithReverse) && (
              <div className={`${styles.progressTracker__connector}`} />
            )}
          </Col>
        </Row>
        <Row>
          <p
            className={`${styles.progressTracker__stepLabel} mb-0 d-flex justify-content-center`}
          >
            {props.step?.lessonName}
          </p>
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-center"
            style={{ minHeight: "25px" }}
          >
            {showRowEndConnector && props.step.lessonId !== -1 && (
              <div className={styles.progressTracker__verticalConnector} />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProgressTrackerStep;
