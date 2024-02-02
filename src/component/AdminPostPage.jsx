import deleteSvg from '../images/delete.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import timesago from 'timesago'
const AdminPostPage = () => {

    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await axios.get('https://mstapplication-backend.onrender.com/feed/getfeed');
                // setPosts(response.data)
                // console.log(response);
                // Sort the posts based on the timestamp in descending order
                const sortedPosts = response.data.sort((a, b) => {
                    const timeA = new Date(a.updatedAt).getTime();
                    const timeB = new Date(b.updatedAt).getTime();
                    return timeB - timeA;
                });
                setPosts(sortedPosts);
                console.log(response);
            } catch (error) {
                console.log('error fetching data', error)
            }
        }
        FetchData()
    }, [])

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`https://mstapplication-backend.onrender.com/feed/getfeed/${_id}`);
            const updatedPosts = posts.filter(post => post._id !== _id);
            setPosts(updatedPosts);
        } catch (error) {
            console.log('Error deleting post:', error);
        }
    }


    return (
        <div className="landing-page ">
            <Header />
            <div className='recent-post-parent'>
                <div className='recent-post-child'>
                    <div className='back-button-parent' >
                        <div className='back-button' onClick={() => { navigate('/landing') }} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12.5" viewBox="0 0 17 15" fill="none">
                                    <path d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <h3 style={{ color: '#1E1E1E', fontWeight: 400, fontSize: '16px', marginLeft: "12px" }}>Back</h3>
                        </div>
                        <p style={{ color: '#333333', fontWeight: 500, fontSize: '16px' }}>Recent Activities</p>
                    </div>
                    {
                        posts.length > 0 ? <>
                            <div className='post-activites-parent'>
                                {posts.map((post) => (
                                    <div className='post-activites-child' style={{ textAlign: 'start' }}>
                                        <div className='post-activities-header'>
                                            <h3 style={{ fontSize: "16px", fontWeight: 500, color: '#333333' }}>{post.postTitle}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <p style={{ color: '#9F9F9F', fontSize: '12px', fontWeight: 400, marginRight: '33px' }}>Posted By : <span style={{ marginLeft: '5px' }}> {timesago(post.updatedAt)}</span></p>
                                                <img src={deleteSvg} style={{ cursor: 'pointer' }} alt="" onClick={() => handleDelete(post._id)} />
                                            </div>
                                        </div>
                                        <p style={{ fontSize: "14px", fontWeight: 400, color: '#888' }}>{post.postDescription}</p>
                                        <img height='200px' width='200px' src={`data:postImage/jpeg;base64,${post.postImage}`} alt="" />
                                    </div>
                                ))}

                            </div>
                        </> : <>
                            <div className="spinner-border text-primary" role="status" style={{ marginTop: '290px' }}>
                            </div>
                        </>
                    }


                </div>
            </div>
        </div>
    );
}

export default AdminPostPage;