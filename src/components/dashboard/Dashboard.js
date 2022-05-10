import React, { Component } from 'react';
import ProjectSummary from '../projects/ProjectSummary'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom"
import { updateVote} from '../../store/actions/projectActions';
import Footer from "../layout/Footer"
import one from "../images/one.png"
import two from "../images/two.png"
import three from "../images/three.png"
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "top",
      search: "",
      categories: ["exhaust", "engine parts and accessories", "fuel and air", "lights and electrical", "brakes", "body", "tires and wheels", "custom"]
    };
  }
  
  render() {
    let { projects, auth, notifications, users } = this.props;    
    
    const handleClick = (e) => {
        this.state.categories.map((tag) => {
            if (e.target.id === tag) {
              this.setState({
                category: "top"
              });
            } else {
              this.setState({
                category: e.target.id
              });
            }
          })
          if (e.target.id === "all") {
            this.setState({
              category: "top"
            });
          }
          console.log(notifications)

        }

      const handleChange = (e) => {

        this.props.projects.map((project) => {
          if (project.name === this.state.search) {
            this.setState({
              category: this.state.search
            });
          }
          this.setState({
            [e.target.id]: e.target.value
          });
        })

      }
    
    if (!auth.uid) return <Redirect to='/signin' />

    if (projects) {
    return (
      <div>
      <div className="dashboard container">
        <br className="line-break"/>
        <br className="line-break"/>
        <br className="line-break"/>
        <br className="line-break"/>
        <div className="search-container">
          <input className="searchBar"  onChange={handleChange} type="search" id="search" name="search" placeholder="Search Tags"/>
        </div>
        <br/> 
        <div className="row">
          <div className="scrollmenu">
          
          {(() => {
            return (

                <div >
                  <a><button className="btn btn-three " id="all" onClick={handleClick}>top products</button></a>
                  <a><button className="btn btn-three " id="exhaust" onClick={handleClick}>exhaust</button></a>
                  <a><button className="btn btn-three " id="engine parts and accessories" onClick={handleClick}>engine parts and accessories</button></a>
                  <a><button className="btn btn-three " id="fuel and air" onClick={handleClick}>fuel and air</button></a>
                  <a><button className="btn btn-three " id="lights and electrical" onClick={handleClick}>lights and electrical</button></a>
                  <a><button className="btn btn-three " id="brakes" onClick={handleClick}>brakes</button></a>
                  <a><button className="btn btn-three " id="body" onClick={handleClick}>body</button></a>
                  <a><button className="btn btn-three " id="tires and wheels" onClick={handleClick}>tires and wheels</button></a>
                  <a><button className="btn btn-three" id="custom" onClick={handleClick}>custom</button></a>
                </div>

            )
          })()}
          </div>

          <div className="category-tag container center">
            <h5 className="category-text flow-text">{this.state.category} products</h5>
          </div>

          <div className="project-container">
            <div data-aos="fade-right" data-aos-duration="1500" className="col s12 m6">
                  { projects && projects.map(project => {
                      if (project.category === this.state.category || this.state.category === "top") {
                        return (
                          <div 
                          className="project-filler">
                          <div className="project-element"
                          >
                            {(() => {
                                  if (!project.votedOn.includes(auth.uid)) {
                                    return (       
                                     <div className="animated"
                                    >
                                      <button className="vote-section btn btn-primary" id="vote" onClick={() => {
                                        this.props.updateVote(auth.uid, project.id);
                                      }}>  Vote </button>  
                                    </div>
                                    )
                                  }
                            })()}
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                            </Link>
                          </div>
                      </div>
                        );
                      } 
                  })}           
              </div>
          </div>
          <br/>
            <div className="block-divider">
              <h3 data-aos="fade-left" data-aos-duration="1500" className="block-header">Stay Up To Date</h3>
              <div data-aos="fade-right" data-aos-duration="1500" className="block-email contact-input" >
                  <input  type="email" placeholder="example@gmail.com" className="mailing-list-email"/>
                  <Link to="/"><a href="/">Continue</a></Link>
              </div>
              <br/>
            </div>
            

          <div className="category-tag container center">
            <h5 className="category-text flow-text">Exhaust</h5>
          </div>


            <div className="project-container">
              <div data-aos="fade-left" data-aos-duration="1500" className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "exhaust") {
                      return (
                        <div className="project-filler">
                          <div className="project-element">
                            
                            {(() => {
                                  if (!project.votedOn.includes(auth.uid)) {
                                    return (       
                                     <div className="animated"
                                    >
                                      <button className="vote-section btn btn-primary" id="vote" onClick={() => {
                                        this.props.updateVote(auth.uid, project.id);
                                      }}>  Vote </button>  
                                    </div>
                                    )
                                  }
                            })()}
                                                              
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                              
                            </Link>
                          </div>
                        </div>  
                      );
                    }
                })}   
              </div>  
            </div> 
            <div className="block-divider">
                <h3 data-aos="fade-right" data-aos-duration="1500" className="block-header">Follow Our Journey</h3>
                <button data-aos="fade-left" data-aos-duration="1500" className="btn block-button">About Us</button>
            </div>
            <div className="category-tag container center">
              <h5 className="category-text flow-text">Brakes</h5>
            </div>
            <div className="project-container">
              <div data-aos="fade-right" data-aos-duration="1500" className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "brakes") {
                      return (
                        <div className="project-filler">
                          <div className="project-element">
                            {(() => {
                                  if (!project.votedOn.includes(auth.uid)) {
                                    return (       
                                     <div className="animated"
                                    >
                                      <button className="vote-section btn btn-primary" id="vote" onClick={() => {
                                        this.props.updateVote(auth.uid, project.id);
                                      }}>  Vote </button>  
                                    </div>
                                    )
                                  }
                            })()}
                                                              
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                              
                            </Link>
                          </div>
                        </div>  
                      );
                    }
                })}   
              </div>  
            </div> 
            <br/>
            <div className="category-tag container center">
              <h5 className="category-text flow-text">Body</h5>
            </div>
            <div className="project-container">
              <div data-aos="fade-right" data-aos-duration="1500" className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "brakes") {
                      return (
                        <div className="project-filler">
                          <div className="project-element">
                            {(() => {
                                  if (!project.votedOn.includes(auth.uid)) {
                                    return (       
                                     <div className="animated"
                                    >
                                      <button className="vote-section btn btn-primary" id="vote" onClick={() => {
                                        this.props.updateVote(auth.uid, project.id);
                                      }}>  Vote </button>  
                                    </div>
                                    )
                                  }
                            })()}
                                                              
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                              
                            </Link>
                          </div>
                        </div>  
                      );
                    }
                })}   
              </div>  
            </div> 
        </div>
        <br/>
        <br/>
        <Link to="/create" >
        <div className="action-block-divider">
          <div className="action-block-container">
            <img data-aos="fade-right" data-aos-duration="1500" src={one} className="action-block-img-one" alt="image" />

          </div>
          <div className="action-block-paragraph">
            <h5 className="">list your motorcycle or motorcycle part online. You pick the price including shipping and offer it to all of our users</h5>
          </div>
        </div>
        </Link>
        <br/>
        <Link to="/create" >
        <div className="action-block-divider">
          <div className="action-block-container">
            <img data-aos="fade-right" data-aos-duration="1500" src={two} className="action-block-img-one" alt="image" />
          </div>
          <div className="action-block-paragraph">
            <h5 className="">wait to see who makes an offer and let the users rate your product by upvoting it</h5>
          </div>
        </div>
        </Link>
        <br/>
        <Link to="/create" >
        <div className="action-block-divider">
          <div className="action-block-container">
            <img data-aos="fade-right" data-aos-duration="1500" src={three} className="action-block-img-one" alt="image" />
          </div>
          <div className="action-block-paragraph">
            <h5 className="">collect your payment within 5-7 business days, message your buyer and feel safe with our payment security guarantee</h5>
          </div>

        </div>      
        </Link>
        <br/>
          <div className="category-tag container center">
            <h5 className="category-text flow-text">tires and wheels</h5>
          </div>
            <div className="project-container">
              <div data-aos="fade-left" data-aos-duration="1500" className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "tires and wheels") {
                      return (
                        <div className="project-filler">
                          <div className="project-element">
                            {(() => {
                                  if (!project.votedOn.includes(auth.uid)) {
                                    return (       
                                     <div className="animated"
                                    >
                                      <button className="vote-section btn btn-primary" id="vote" onClick={() => {
                                        this.props.updateVote(auth.uid, project.id);
                                      }}>  Vote </button>  
                                    </div>
                                    )
                                  }
                            })()}
                                                              
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                              
                            </Link>
                          </div>
                        </div>  
                      );
                    }
                })}   
              </div>  
            </div> 
          <br/>
            <div className="category-tag container center">
              <h5 className="category-text flow-text">lights and electrical</h5>
            </div>
            <div className="project-container">
              <div data-aos="fade-left" data-aos-duration="1500" className="col s12 m6">
                { projects && projects.map(project => {
                    if (project.category === "lights and electrical") {
                      return (
                        <div className="project-filler">
                          <div className="project-element">
                            {(() => {
                                  if (!project.votedOn.includes(auth.uid)) {
                                    return (       
                                     <div className="animated"
                                    >
                                      <button className="vote-section btn btn-primary" id="vote" onClick={() => {
                                        this.props.updateVote(auth.uid, project.id);
                                      }}>  Vote </button>  
                                    </div>
                                    )
                                  }
                            })()}
                                                              
                            <Link to={'/project/' + project.id}>
                              <ProjectSummary project={project} key={project.id} />
                              
                            </Link>
                          </div>
                        </div>  
                      );
                    }
                })}   
              </div>  
            </div> 
          <br/>
          <div className="block-divider">
                <h3 data-aos="fade-right" data-aos-duration="1500" className="block-header">Sell Your Parts</h3>
                <Link data-aos="fade-left" data-aos-duration="1500" to='/create' className="btn block-button">Create Products
                </Link>
            </div>
      </div>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
    );
  } else {
    return <div className="center">loading</div>
  }
  }
}

const mapStateToProps = (state) => {

    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        users: state.firestore.ordered.users
    }
    
}

const mapDispatchToProps = dispatch => {
    
  return {
    updateVote: (voter, project) => dispatch(updateVote(voter, project))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc']},
      { collection: 'notifications'},
      { collection: 'users'}
    ])
)(Dashboard);