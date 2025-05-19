import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { asyncAddThread, asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from "../states/threads/action";
import ForumInput from "../components/ForumInput";
import ForumList from "../components/ForumList";

function HomePage() {
    const {
        threads = [],
        users = [],
        authUser,
    } = useSelector((states)=>states);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(asyncPopulateUsersAndThreads());
    },[dispatch]);

    const onAddThread = ({title, body, category}) =>{
        dispatch(asyncAddThread({title, body, category}));
    };

    const onUpVote = (threadId) => {
        dispatch(asyncUpVoteThread(threadId));
    };

    const onDownVote = (threadId) => {
        dispatch(asyncDownVoteThread(threadId));
    };

    const onNeutralVote = (threadId) => {
        dispatch(asyncNeutralVoteThread(threadId));
    };

    const threadList = threads.map((thread)=>({
        ...thread,
        user: users.find((user)=> user.id=== thread.ownerId),
        authUser:authUser.id,
    }));

    return (
        <section className="home-page">
            <ForumInput addThread={onAddThread} />
            <ForumList threads={threadList} upVote={onUpVote} downVote={onDownVote} neutralVote={onNeutralVote}/>
        </section>
    );
}

export default HomePage;