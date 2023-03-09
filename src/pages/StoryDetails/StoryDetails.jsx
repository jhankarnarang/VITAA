import {React, useState, useEffect} from 'react'
import './StoryDetails.css'
import MDEditor from '@uiw/react-md-editor';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const StoryDetails = () => {
    const {storyId} = useParams();
    const [story, setStory] = useState({});
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let navigate = useNavigate();

    useEffect(() => {
        const fetchStory = async () => {
              try {
                  const response = await axios.get(`http://127.0.0.1:5000/stories?storyId=${storyId}`);
                  const data = await response.data;
                  console.log(data);
                  setStory(data);
              } catch (error) {
                  navigate('/pageNotFound')
                  console.log(error)
              }
        }
        fetchStory();
      }, []);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='story-details'>
            <div className="story-details-top">

            </div>
            <div className="story-details-bottom">
                <div className="story-detail-image-container">
                    <img className='story-detail-image' src={`${story.storyImage}`} alt="" />
                </div>
                <h2 className="story-title">{story.title}</h2>
                <p className="story-description">
                    <MDEditor.Markdown source={story.desc} />
                    {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro aliquam impedit consequatur sint praesentium cumque reprehenderit facere, minima obcaecati libero nihil recusandae sit sequi quaerat rerum a perspiciatis maxime in! Fuga, nostrum! Fugiat quis error quos labore eius recusandae laudantium explicabo voluptate libero architecto nam sequi, expedita harum asperiores totam. Numquam qui nihil odio sunt, fugit aspernatur assumenda ducimus quis, impedit repellendus, aperiam libero unde dolore? */}
                </p>
            </div>
        </div>
    )
}

export default StoryDetails
