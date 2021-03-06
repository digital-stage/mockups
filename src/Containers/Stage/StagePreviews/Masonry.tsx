import React from "react";
import { MdClear } from "react-icons/md";

interface Props {
  participants: Array<Object>,
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void,
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void,
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void,
  dragoverElement: number | null | undefined,
  enableHideScreens: boolean,
  hideScreen: () => void,
  effectOnSingleImage: number | null,
  participant: any,
  dragStarted: number | null,
  i: number
}

class Masonry extends React.Component<Props> {
  calculateHeight = () => {
    if (this.props.participants.length === 3) {
      if (this.props.participant === this.props.participants[0]) {
        return "calc((100vh - 100px)";
      } else {
        return "calc((100vh - 100px)/2)";
      }
    }
    if (this.props.participants.length >= 4) {
      if (this.props.participant === this.props.participants[0]) {
        return "calc((100vh - 100px)";
      } else if (this.props.participant === this.props.participants[1]) {
        return "calc((100vh - 100px)/2)";
      } else {
        return `calc((100vh - 100px)/4)`;
      }
    } else {
      return "calc(100vh - 100px)";
    }
  };

  calculateWidth = () => {
    if (this.props.participants.length === 1) {
      return "100%";
    } else if (this.props.participants.length <= 4) {
      if (this.props.participant === this.props.participants[0]) {
        return "40%";
      } else {
        return "60%";
      }
    } else if (this.props.participants.length === 5) {
      if (this.props.participant === this.props.participants[0]) {
        return "40%";
      } else if (
        this.props.participant === this.props.participants[1] ||
        this.props.participant === this.props.participants[2]
      ) {
        return "60%";
      } else {
        return "30%";
      }
    } else if (this.props.participants.length > 5) {
      if (this.props.participant === this.props.participants[0]) {
        return "40%";
      } else if (this.props.participant === this.props.participants[1]) {
        return "60%";
      } else {
        return "30%";
      }
    }
  };

  render() {
    const {
      participant,
      participants,
      i,
      onDragStart,
      onDragOver,
      onDrop,
      dragoverElement,
      enableHideScreens,
      hideScreen,
      dragStarted,
      effectOnSingleImage
    } = this.props;
    const masonryWidth = this.calculateWidth();
    const masonryHeight = this.calculateHeight();
    return (
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="item_test1"
        style={{
          position: "relative",
          width: masonryWidth,
          height: masonryHeight,
          float: "left",
          display: "inline-block",
        }}
      >
        {enableHideScreens && participants.length > 1 && (
          <div className="hide-screen" onClick={hideScreen}>
            <MdClear title="Hide screen" size="1em" />
          </div>
        )}
        <img
          className={
            effectOnSingleImage === i
              ? "stage-container-animation"
              : ""
          }
          src={participant.image}
          style={{
            width: "100%",
            height: "100%",
            opacity: dragStarted === i ? "0.1" : dragoverElement === i ? "0.2" : "1",
          }}
          key={i}
          alt={"masonry" + i}
        />
      </div>
    );
  }
}

export default Masonry;
