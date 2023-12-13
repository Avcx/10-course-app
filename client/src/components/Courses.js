import { useEffect, useState } from "react";
import { api } from "../utils/apihelper";
import { Link, useNavigate } from "react-router-dom";

/**
 * Courses - displays a list of all the courses in the database.
 *
 * @returns (JSX Component) - List of Coourses.
 */

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const nav = useNavigate();

  // useEffect fetches all courses from the api

  useEffect(() => {
    // Fetches all courses and stores them into state
    api("/courses")
      .then((response) => response.json())
      .then((json) => {
        setCourses(json);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data!", error);
        nav("/error");
      });
  }, [nav]);

  return (
    <main>
      <div className="wrap main--grid">
        {courses.length
          ? courses.map((course) => (
              <Link
                className="course--module course--link"
                key={course.id}
                to={`/courses/${course.id}`}
              >
                <h2 className="course--label">course</h2>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            ))
          : null}

        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
      ;
    </main>
  );
};

export default Courses;
