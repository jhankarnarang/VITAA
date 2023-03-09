import { React, useState, useEffect, useContext } from 'react'
import Story from '../../components/Story/Story'
// import { stories } from '../../dummyData'
import './Stories.css'
// import Categories from '../../components/Categories/Categories'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';

const Stories = () => {
    const [loading, setLoading] = useState(false);
    const [stories, setStories] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useContext(AuthContext)

    useEffect(() => {

        fetchStroies();
    }, []);

    const fetchStroies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stories/all');
            const data = await response.data;
            // const response = await axios.get('http://127.0.0.1:5000/events/all');
            // const  data = await response.data;
            console.log(data);
            setStories(data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='stories'>
            <div className="post-story">
                <Link to="/addStory">
                    <button className='btn btn-primary add-event-btn'>+ Add Story</button>
                </Link>
            </div>
            {/* <div className="story-categories-container">
                <Categories />
            </div> */}
            <div className="stories-container">
                {stories.map(story => (
                    <Story
                        key={story._id}
                        id={story._id}
                        title={story.title}
                        desc={story.desc}
                        storyImage={story.storyImage}
                        createdAt={story.createdAt}
                        userId={story.userId} />
                ))}
            </div>
        </div>
    )
}

export default Stories
