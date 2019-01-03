import React, {useState} from 'react';

export default function About() {
    return (<div><h1>Good you are here</h1>
        <p>
            *) Lupa is about finding and discussing cool resources on the web together where they are.
            Right now it's version 0.007 ;) Bugs, sometimes slow loading speeds etc.
            <br/>
            <br/>
        </p>
        <p>
            *) When you come across an article/content (url, really) that was
            reviewed by someone in that group
            you'll see that on the ICON at the bottom of your screen
            <br/>
            <br/>
            *) I made this to connect friends and people through
            their real (maybe intellectual) interests and to get the most diverse
            opinions
        </p>
        {/*<img style={styles.img} src={comment_howto2} alt={"screenshot of how to comment"}/>*/}
        <p>
            <br/>
            <br/>
            *) All your thoughts on a content show up exactly when someone comes across the
            place
            on the web (url). Unlike sharing on some platform your input won't be lost at
            the bottom of some chat feed the day after!
            <br/>
            <br/>
            *) Data only gets stored when you submit. There is no background data
            processing going on otherwise (except for querying the Database if there are
            reviews for the URL you're at)
        </p></div>)
}
