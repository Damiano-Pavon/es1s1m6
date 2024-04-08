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
        <div>
          {blogPosts.map((post) => (
            <div key={post._id} className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
