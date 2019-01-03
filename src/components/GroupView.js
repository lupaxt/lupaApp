import React, { useState } from "react";
import {GET_GROUP, GET_GROUP_BY_NAME, getGroupByName} from "../apis/query";
import Header from './styled/Header'
import Tag from "./styled/Tag";
import {ReviewList} from "./Reviews";
import Querier from '../apis/Querier'


// import './styles.css'

const mockGroups = [
    {
        description: "we are the synthetic biology group. Go suck a dx*AW",

    }
]

export default function Group({ match, user, preview=false }) {
  return (
    <Querier query={() => getGroupByName(match.params.name)} prop={'groupByName'}>
      {({ loading, error, data }) => {
        if (loading) return "Loading... (apparently GraphQL is slower than REST APIs...)";
        if (error) return `Error! ${error.message}`;
        console.log(data, "group");
        const group = data;
        return <section>
            <Header primary>{group.name}</Header>
            <GroupDetails details={group} />
            <br />
            <br />
            {!preview && <> <Header>Activity :: </Header>
            <ReviewList reviews={group.reviews} showmore={true} user={user} />
            </>}
          </section>;
      }}
    </Querier>
  );
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
        {details.followers.map(f => <Tag onClick={() => window.location.replace('/user/'+f.name)}>@{f.name}</Tag>)}
      </div>
    </div>
  );
}
