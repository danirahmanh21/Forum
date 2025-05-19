/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes, { exact } from "prop-types";
import { useNavigate } from 'react-router-dom';
import { postedAt } from "../utils";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";


function ForumItem({
    id, title, body, createdAt, upVotesBy, downVotesBy, owner, authUser, upVote, downVote,
}) {
    const navigate = useNavigate();

    const isUpVoted = upVotesBy.includes(authUser);
    const isDownVoted = downVotesBy.includes(authUser);

    const onForumClick = () => {
        navigate(`/threads/${id}`);
    };

    const onKeyPress = (event) =>{
        if(event.key === 'Enter' || event.key === ' '){
            navigate(`/threads/${id}`);
        }
    };

    const onUpVoteClick = (e) => {
        e.stopPropagation();
        upVote(id);
    };

    const onDownVoteClick = (e) =>{
        e.stopPropagation();
        downVote(id);
    }

    return (
        <div role="button" tabIndex={0} className="forum-item" onClick={onForumClick} onKeyDown={onKeyPress}>
            <div className="forum-item__user-photo">
                <img src={owner.photo} alt={owner.name}/>
            </div>
            <div className="forum-item__detail">
                <header>
                    <div className="forum-item__user-info">
                        <p className="forum-item__user-name">{owner.name}</p>
                        <p className="forum-item__user-id">@{owner.id}</p>
                    </div>
                    <p className="forum-item__created-at">{postedAt(createdAt)}</p>
                </header>
                <article>
                    <h3 className="forum-item__title">{title}</h3>
                    <p className="forum-item__body">{body}</p>
                </article>
                <footer className="forum-item__votes">
                    <button type="button" onClick={onUpVoteClick} aria-label="Upvote">
                        {isUpVoted ? <FaArrowAltCircleUp style={{color: "blue"}} /> : <FaRegArrowAltCircleUp /> }
                    </button>
                    <button type="button" onClick={onDownVoteClick} aria-label="Downvote">
                        {isDownVoted ? <FaArrowAltCircleDown style={{color: "red"}} /> : <FaRegArrowAltCircleDown /> }
                    </button>
                </footer>
            </div>
        </div>
    );
}

const ownerShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
}

const forumItemShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape(ownerShape).isRequired,
    authUser: PropTypes.string.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
};

ForumItem.propTypes = {
    ...forumItemShape,
}

// eslint-disable-next-line react-refresh/only-export-components
export { forumItemShape }
export default ForumItem;