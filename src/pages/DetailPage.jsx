/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ForumItem from "../components/ForumItem";
import ForumDetail from "../components/ForumDetail";
import ForumReplyInput from "../components/ForumReplyInput";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddComment, asyncDownVoteThreadDetail, asyncNeutralVoteThreadDetail, asyncReceiveThreadDetail, asyncUpVoteThreadDetail } from "../states/forumDetail/action";
import { useParams } from "react-router-dom";

function DetailPage(){
    const {id} = useParams();
    const { 
        forumDetail = null,
        authUser,
    } = useSelector((states)=>states);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(asyncReceiveThreadDetail(id));
    },[id, dispatch]);

    const onComment = (content)=>{
        dispatch(asyncAddComment({threadId: id, content}));
    }

    const onUpVote = () =>{
        dispatch(asyncUpVoteThreadDetail(id));
    }

    const onDownVote = () =>{
        dispatch(asyncDownVoteThreadDetail(id));
    }
    const onNeutralVote = () =>{
        dispatch(asyncNeutralVoteThreadDetail(id));
    }

    if ( !forumDetail){
        return null;
    }
    return (
        <section className="detail-page">
            {
                forumDetail.parent && (
                    <div className="detail-page__parent">
                        <h3>Replying To</h3>
                        <ForumItem {...forumDetail.parent} authUser={authUser.id}/>
                    </div>
                )
            }
            <ForumDetail {...forumDetail} 
            authUser={authUser.id} 
            upVote={onUpVote} 
            downVote={onDownVote}
            neutralVote={onNeutralVote}
            />
            <ForumReplyInput replyForum={onComment}/>
        </section>
    );
}
export default DetailPage;