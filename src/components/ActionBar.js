/*
import React, {useState} from 'react'
import {Mutation} from "react-apollo";
import {CREATE_REVIEW_MUTATION} from "../apis/mutations";

const dummyReview = {
    author: {name: "markus"}
}

//TODO nesting --> totall rip off facebook's css
export function Review({review, preview = false}) {

    return <>
        <div>@Markus :</div>
        <div>
            I thought this piece is shiat !!!
        </div>
    </>
}

export function Comment({reviewId}) {
    return <Mutation mutation={CREATE_REVIEW_MUTATION}>
        {(createReview) => (
            <>
                <EmojiBar/>
                <textarea></textarea>
            <button
                onClick={() => createReview({variables: {targetType: "review", target: reviewId}})}>Comment
            </button>
            </>)}
    </Mutation>
}

export function Reply({reviewId}) {
    return <Mutation mutation={CREATE_REVIEW_MUTATION}>
        {(createReview) => (

            <button
                onClick={() => createReview({variables: {targetType: "comment", target: reviewId}})}>Reply
            </button>)}
    </Mutation>
}

export default function EmojiBar({pick = null, small = true}) {
    //TODO wrap emojis in Apollo Mutation!!?? although das extension have client access?
    //TODO maybe just use normal graphql request
    return <div className={'emoji_bar'}>
        <div className={pick ? "highlight"}>EMo 1</div>
        <div>EMo 2</div>
    </div>
}*/
