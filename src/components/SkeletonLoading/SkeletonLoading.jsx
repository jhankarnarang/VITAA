import React from 'react';
import './SkeletonLoading.css';

const SkeletonLoading = () => {
    return (
        <div className="skeleton">
            <div className="skeleton-top">
                <h2 className="profile-pic-skeleton"></h2>
                <div className="username-skeleton"></div>
            </div>
            <div className="skeleton-bottom">
                <div className="event-image-skeleton">

                </div>
                <div className="event-text-skeleton">
                    <span className='text-skeleton'></span>
                    <span className='text-skeleton'></span>
                    <span className='text-skeleton'></span>
                    <span className='text-skeleton'></span>
                    <span className='text-skeleton s-1'></span>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoading;
