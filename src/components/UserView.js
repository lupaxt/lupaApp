import React, { useState } from "react";
import {GET_USER_BY_NAME, getUserByName} from "../apis/query";
import Header from './styled/Header'
import Tag from "./styled/Tag";
import {ReviewList} from "./Reviews";
import Querier from "../apis/Querier";


// import './styles.css'

export default function UserView({ match, user }) {
  return (
    <Querier query={getUserByName} variables={{ name: match.params.name }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data, "group");
        const user = data.userByName;
        return <>
            <Header primary>{user.name}</Header>

            <Header>Activity :: </Header>
            <ReviewList reviews={user.reviews} user={user} />
            <br />
            <br />
            <Header>Groups :: </Header>
            {user.follows && user.follows.map(g => <Tag>{g.name}</Tag>)}
          </>;
      }}
    </Querier>
  );
}

// /[^a-zA-Z0-9\-\/]/.test( TCode )

{
  /*<Paper style={{maxHeight: 200, overflow: 'auto'}}>
    <List>
        ...
    </List>
</Paper>*/
}

function ReviewScroll({ reviews }) {
  return <div />;
}

//TODO also use for creating and updating group (just exchange button and validate form)
function GroupDetails({ details }) {
  //is inEditMdoe
  const [editMode, toggleEditMode] = useState(false);

  return (
    <div>
      <Header>Subscribers ({details.followers.length}): </Header>
      <div>
        {/* TODO: show details on click as popOver */}
        {details.followers.map(f => <Tag>@{f.name}</Tag>)}
      </div>
    </div>
  );
}
