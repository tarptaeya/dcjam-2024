import React, { useState } from "react";
import { playClickSound } from "../sound";

const StoryComponent = ({ paragraphs, onComplete }) => {
  const n = paragraphs.length;
  const [index, setIndex] = useState(0);

  return (
    <div id="story-container-wrapper">
      <div id="story-container">
        <div className="p-wrapper">
          {paragraphs.map((p, i) => {
            if (i > index) return <></>;
            return <div className="story-p">{p}</div>;
          })}
        </div>

        <div className="b-wrapper">
          {index < n - 1 && (
            <button
              className="btn story-btn-next"
              onClick={() => {
                playClickSound();
                setIndex(index + 1);
              }}
            >
              Next
            </button>
          )}
          {index === n - 1 && (
            <button
              className="btn story-btn-continue"
              onClick={() => {
                playClickSound();
                onComplete();
              }}
            >
              Continue
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default StoryComponent;
