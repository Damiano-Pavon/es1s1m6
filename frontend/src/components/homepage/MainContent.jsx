 import React from "react";
 import axios from "axios";
 import Card from "react-bootstrap/Card";
 import { useState } from "react";
 import { useEffect } from "react";
 

 function MainContent() {
   const [blogPosts, setBlogPosts] = useState([]);
   const token = JSON.parse(localStorage.getItem("auth"));
   console.log(token);
   console.log(blogPosts);

   const getBlogPost = async () => {
     try {
       const resp = await axios.get(
         `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts`,
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: token,
           },
         }
       );

       setBlogPosts(resp.data);
       return resp;
     } catch (e) {
       console.error("Error fetching blog posts", e);
     }
   };

   useEffect(() => {
     getBlogPost();
   }, []);

   return (
<div className="container">
  <div className="row">
    {blogPosts.map((post) => (
      <div key={post._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <Card>
          <Card.Img variant="top" src={post.cover} alt={post.title} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <p><strong>Category:</strong> {post.category}</p>
            <p><strong>Author:</strong> {post.author.name}</p>
            
            <p><strong>Read Time:</strong> {post.readTime.value} {post.readTime.unit}</p>
            
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Published on {new Date(post.createdAt).toLocaleDateString()}</small>
          </Card.Footer>
        </Card>
      </div>
    ))}
  </div>
</div>

   );
 }

 export default MainContent;

