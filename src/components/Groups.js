import React from 'react';
import Button from './styled/Button'
import Header from './styled/Header'

import Card from './Card'
import {GET_GROUPS, getGroups} from "../apis/query";
import {followGroup, unfollowGroup} from "../apis/mutations";
import {countNested} from "../utils";
import {btn_green, btn_pink, infoStyle, subtle_button} from "./styled/styles";
import {history} from "../index";
import Querier from "../apis/Querier";

// const gs = [{id: "abc"}, {id: "def"}]
// const userRoles = [{group: {id: "abc"}, role: "creator"}, {group: {id: "def"}, role: "admin"}, {
//     group: {id: "jack"},
//     role: "follower"
// }]
const sortGroupListingByRole_mutate = function (groups, userRoles) {
    if (!userRoles) return groups
    groups.forEach(g => {
        const match = userRoles.find(role => role.group ? role.group.id === g.id : false);
        let role = ""
        if (match) {
            role = match.role;
        }
        g.membership = role;
    })

    return groups;
}

//TODO => search functionality ... well firefox...
export default function Groups({user}) {
    if (!user) {user = {roles: []}}
    return (
        <>
            <Header>Lupa Groups </Header>

            <Button onClick={() => history.push('/createGroup') }>
                Create Group
            </Button>
            <Querier query={getGroups}>
                {({loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return <section style={{display: 'flex', flexWrap: 'wrap'}}>
                        {sortGroupListingByRole_mutate(data.groups, user.roles)
                            .sort(g => g.membership ? -1 : 1)
                            .map(g => <Card>
                            <span style={subtle_button} onClick={() => history.push(`/group/${g.name}`)}>{g.name}</span>
                            <figcaption style={infoStyle}>{g.description}</figcaption>
                            <section>Members: {g.followers.length}</section>
                            <section>Activity: {g.reviews.reduce((acc, val) => acc + countNested(val, "comments"), 0) + g.reviews.length}</section>
                            <div style={btn_pink}>{g.membership}</div>
                                {g.membership
                                    ? <button onClick={() => unfollowGroup(g.id)} style={btn_green}>Leave</button>
                                    : <button onClick={() => followGroup(g.id)} style={btn_green}>Join</button>}
                        </Card>)}
                    </section>
                }}
            </Querier>
        </>)
}