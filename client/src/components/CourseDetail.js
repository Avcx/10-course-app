import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/apihelper";
import ReactMarkdown from "react-markdown";
import UserContext from "../context/UserContext";

/**
 * CourseDetails - shows the details of the selected courseID.
 * @returns (JSX Component) - Form of course details.
 */

const CourseDetail = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { authUser } = useContext(UserContext);
  const nav = useNavigate();

  // useEffect loads course details from api and stores them in component state

  useEffect(() => {
    setLoading(true);
    api(`/courses/${id}`)
      .then((response) => response.json())
      .then((course) => {
        if (course) {
          setCourseDetails(course);
          if (authUser) {
            setIsOwner(authUser.id === course.owner.id);
          }
          setLoading(false);
          return course;
        } else {
          nav("/notfound");
        }
      })
      .catch((error) => {
        console.error(error);
        nav("/error");
      });
  }, [id, authUser, nav]);

  // handleDelete submits a DELETE request to the server for the selected course.

  const handleDelete = async (e) => {
    e.preventDefault();

    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    };

    try {
      const response = await api(`/courses/${id}`, "DELETE", null, credentials);
      if (response.status === 204) {
        // Success
        nav("/");
      } else if (response.status === 403) {
        // Forbidden
        console.warn("Forbidden: User doesn't own this course. (403)");
        nav("/forbidden");
      } else if (response.status === 400) {
        nav("/notfound");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      nav("/error");
    }
  };

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {isOwner ? (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <button className="button" onClick={handleDelete}>
                Delete Course
              </button>{" "}
            </>
          ) : null}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{courseDetails.title}</h4>
                {courseDetails.owner ? (
                  <p>{`By ${courseDetails.owner.firstName} ${courseDetails.owner.lastName}`}</p>
                ) : null}
                <ReactMarkdown>{courseDetails.description}</ReactMarkdown>
              </div>
              <div>
                {courseDetails.estimatedTime ? (
                  <>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{courseDetails.estimatedTime}</p>
                  </>
                ) : null}

                {courseDetails.materialsNeeded ? (
                  <>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                      <ReactMarkdown>
                        {courseDetails.materialsNeeded}
                      </ReactMarkdown>
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default CourseDetail;

/*
         <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">Build a Basic Bookcase</h4>
                            <p>By Joe Smith</p>

                            <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>
                            
                            <p>Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.</p>
                            
                            <p>Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.</p>
                            
                            <p>We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.</p>
                            
                            <p>As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.</p>
                            
                            <p>The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>14 hours</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul>
                        </div>
                    </div>
                </form>
         </div>
*/
