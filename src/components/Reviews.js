import React, {useState, useEffect} from 'react'
import Card from './Card'
import ReviewThread from "./ReviewThread";

const mockReviews = {
    author: {name: "goseph"},
    createdAt: Date.now() - 50000,
    description: "he sucks balls",
    emoji: "0x0412",
    groups: [{name: "shmallow"}],
    target: "someid",
    targetType: "webpage"
}

const ReviewList = ({reviews, user, showmore}) => reviews.map(review => <ReviewThread review={review} user={user} fullPreview={showmore}/>)

export {ReviewList}
export default function Reviews({reviews = []}) {
    return <section style={{display: 'flex', flexWrap: 'wrap'}}>
        {reviews.map(r => <Card>
            <div>{r.title}</div>
            <br/>
            <figcaption>Info: {r.description}</figcaption>
            <section>Author: {r.author.name}</section>
            <div> Groups: {r.groups.map(g => <figcaption>{g.name}</figcaption>)} </div>
        </Card>)}
    </section>;
}


