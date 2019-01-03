import React, {useState} from "react";

export default function AccountDetails({user}) {

    const {id, name, follows, description, email, reviews} = user;

    return <>
        <div>
            {name}
        </div>
        <div>{email} </div>
        <div>
            About : {description}
        </div>
        <div>
            Review Count: {reviews.length}
        </div>
    </>

}