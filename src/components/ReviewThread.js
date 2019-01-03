import React, {useState} from 'react'
import './reviews.css'
import {countNested, links, timeDifferenceForDate, urlpretty} from "../utils";
import {createReview, deleteReview} from "../apis/mutations";
import {subtle_button} from "./styled/styles";

const defaultGroup = "alpha_testers"

export default function ReviewThread({review, user, showmore = true}) {
    const [expanded, setExpanded] = useState(false)
    const [isPreview, setIsPreview] = useState(!showmore)
    const totalcomments = countNested(review, 'comments');
    return <>
        <div key={review.id} className="textbubbles">
            <button className="nametag" onClick={() => setIsPreview(!isPreview)}>{review.author.name}</button>
            <span>{review.emoji ? String.fromCodePoint(review.emoji) : ""}</span>
            {!isPreview && <>
                <span className="reviewtitle">{review.title || "/"}</span>
                <span className="targettext"><a href={review.target} target="_blank" rel="noopener">{urlpretty(review.target) || "/"}</a></span>
                <span style={{color: "grey", fontSize: "0.7rem"}}>{timeDifferenceForDate(review.updatedAt)}</span>
                <br/>
                <div style={{marginLeft: "2rem"}}>
                <span className="reviewtext">
                    <span style={{
                        background: "purple",
                        color: "white",
                        borderRadius: "100px",
                        padding: "0.1rem",
                        margin: "0.2rem"
                    }}>{totalcomments}
                    </span>
                    {review.description}
                    </span>
                    <span style={subtle_button}> {review.groups.map(g => <div>{"@" + g.name + " "}</div>)}</span>
                    <Commenter targetId={review.id}/>
                    <span style={subtle_button}
                          onClick={() => setExpanded(!expanded)}>
                    {expanded ? "  Hide" : `  Show Opinions (${totalcomments})`}
                    </span>
                </div>
            </>}
        </div>
        {expanded && review.comments.map(comment => <>
                <div className="comment" key={comment.id}>
                    <Comment review={comment} user={user}/>
                    <Commenter targetId={comment.id} text={'Reply'}/>

                </div>
                {comment.comments.map(reply => <div className="reply" key={reply.id}>
                        <Comment review={reply} user={user}/>
                    </div>
                )}
                <br/>
            </>
        )}
    </>

}


export function Commenter({targetId, text = "Comment"}) {
    const [typing, setTyping] = useState(null)
    const [comment, setComment] = useState("")
    return <>
        <div
            style={subtle_button}
            onClick={() => setTyping(true)}
        >{text}</div>
        {typing && <><textarea onChange={(ev) => setComment(ev.target.value)}
                               value={comment}
                               placeholder={comment || `${String.fromCodePoint(0x1F449)} leave a comment ? `}
                               cols="20" rows="3"
        />
            <span style={subtle_button}
                  onClick={() => {
                      setTyping(false)
                      createReview(targetId, "review", null, comment)
                  }}> OK
            </span>
            <span style={subtle_button}
                  onClick={() => setTyping(false)}> | Cancel
            </span>
        </>
        }
    </>
}

const Comment = ({review, user}) => (<>
        <a href={links.author(review.author.name)} className="nametag">{review.author.name} {"   "}</a>
        <span style={{background: "#e2dede", borderRadius: "10px", padding: "0.2rem"}}> {review.description} </span>
        {user.id === review.author.id
        && <span onClick={() => deleteReview(review.id)}
                 style={{cursor: "pointer", color: "red", fontSize: "0.6rem", fontWeight: "bolder"}}>
            {"   X   "}
            </span>}
    </>
)

