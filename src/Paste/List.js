import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getFirestore, collection, query, onSnapshot, deleteDoc, doc, orderBy } from "firebase/firestore";
import { app } from '../DataBase/FireBase';
import { getAuth } from "firebase/auth";
import './List.css';
import { Link } from "react-router-dom";

function AllPastes({ userOn }) {
  const db = getFirestore(app);
  const postCollectionRef = collection(db, 'posts');
  const auth = getAuth(app);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const sortedPostsQuery = query(postCollectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(sortedPostsQuery, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt?.toDate(),
          authorEmail: data.userEmail,
        });
      });
      setAllPosts(posts);
    });

    return () => {
      unsubscribe();
    };
  }, [postCollectionRef]);

  const handleDelete = async (authorEmail, postId) => {
    try {
      const postDocRef = doc(db, "posts", postId);
      if (authorEmail === auth.currentUser.email) {
        await deleteDoc(postDocRef);
      } else {
        console.log("User is not authorized to delete this post");
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  
  if (userOn) {
    return (
      <div className='all-posts'>
        <Container>
          <Row className="d-flex flex-wrap justify-content-center flex-column">
            {allPosts.map((post) => (
              <Col md={4} key={post.id}>
                <Card className="post-card my-3 shadow">
                  <Card.Body>
                    <Card.Title className="post-title">Title: {post.title}</Card.Title>
                    <Card.Text className="post-content">{post.content}</Card.Text>
                    <Card.Footer className="post-footer post-footer-custom">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="post-details text-right">
                        <p className="post-author">Posted by {post.authorEmail}</p>
                          <p className="post-date">{post.createdAt?.toLocaleDateString()} {post.createdAt?.toLocaleTimeString()}</p>
                        </div>
                        <div className="post-button-container post-button-container-custom">
                          <Button variant="danger" onClick={() => {
                            handleDelete(post.authorEmail, post.id);
                          }}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>To access the posts, you need to log in <Link to="/login">here</Link>.</h3>
      </div>
    );
  }
}

export default AllPastes;