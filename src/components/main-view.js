// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// import { fetchPosts } from '../actions/index';

// function mapStateToProps(reduxState) {
//   return {
//     allPosts: reduxState.posts.all,
//   };
// }

// class MainView extends Component {
//   componentDidMount() {
//     this.props.fetchPosts();
//   }

//   render() {
//     const posts = this.props.allPosts.map((post) => {
//       return (
//         <Link key={post.id} to={`posts/${post.id}`} className="post-card-container">
//           <Card>
//             <Card.Img variant="top" src={post.coverUrl} />
//             <Card.Body>
//               <Card.Title>{post.title}</Card.Title>
//               <Card.Text>{post.tags}</Card.Text>
//             </Card.Body>
//           </Card>
//         </Link>
//       );
//     });

//     return (
//       <div id="post-cards-container">
//         {posts}
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps, { fetchPosts })(MainView);
