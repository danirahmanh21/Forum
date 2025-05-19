/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import ForumItem, { forumItemShape } from "./ForumItem";

function ForumList ({threads,vote}) {
    return (
        <div className="forum-list">
            {
                threads.map((thread)=>(
                    <ForumItem key={thread.id} {...thread} vote={vote} />
                ))
            }
        </div>
    );
}

ForumList.propTypes = {
    threads: PropTypes.arrayOf(PropTypes.shape(forumItemShape)).isRequired,
    vote: PropTypes.func.isRequired,
}
export default ForumList;