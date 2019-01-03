import React, { useState } from "react";
import {timeDifferenceForDate} from '../utils'
const styling = {
  red: {
    background: "HotPink",
    color: "white",
    fontSize: 11,
    opacity: 0.7,
    marginLeft: 0.5 + "em"
  },
  cyan: {
    background: "DarkTurquoise",
    color: "white",
    fontWeight: "bold",
    opacity: 0.7
  },
  orange: {
    background: "Coral",
    color: "white",
    fontSize: 10,
    opacity: 0.7,
    marginLeft: 0.5 + "em"
  },
  emojiBox: {
    width: 2.5 + "rem",
    height: 2.5 + "rem"
  },
  textField: {
    // layout
    marginLeft: 1 + "em",
    display: "flex",
    fontSize: 11,
    background: "#fff",
    boxShadow: 0.5 + "rem rgba(0, 0, 0, .3)"
  }
};

export default function Activity({ reviews }) {
  return <React.Fragment>
      {reviews.length < 1 ? <div>Loading Reviews ...</div> : reviews
          // .sort((a,b) => b.timestamp - a.timestamp)
          .map(review => (
            <section style={{ display: "flex", flexDirection: "column" }}>
              <div key={review.id}>
                <button style={styling.cyan}>
                  {review.author.name + " "}
                </button>
                {" checked "}
                {review.title ? (
                  <button style={styling.red}> {review.title}</button>
                ) : null}{" "}
                at{" "}
                <button
                  onClick={() => window.open(review.target, "_blank")}
                  style={styling.orange}
                >
                  <i>{review.target}</i>
                </button>
              </div>
              <div style={styling.textField}>
                <button style={styling.emojiBox}>
                  {review.emoji ? String.fromCodePoint(review.emoji) : null}
                </button>
                <figcaption style={{ paddingLeft: 1 + "em" }}>
                  {review.description}
                </figcaption>
                <figcaption>
                  {timeDifferenceForDate(review.updatedAt)}
                </figcaption>
              </div>
            </section>
          ))}
    </React.Fragment>;
}
