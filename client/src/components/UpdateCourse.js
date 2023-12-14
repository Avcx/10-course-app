import { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/apihelper";
import UserContext from "../context/UserContext";
import ErrorDisplay from "./ErrorDisplay";

/**
 * Displays a dynamic form to update the selected course
 *
 * @returns (JSX Componenet) - Update course form
 */

const UpdateCourse = () => {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const nav = useNavigate();

  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  useEffect(() => {
    setLoading(true);

    // Api call for the information of the selected course
    // Stores info in state if successfully found

    api(`/courses/${id}`)
      .then((response) => response.json())
      .then((course) => {
        if (course) {
          // Detects if user might have typed in '/update' in address bar. Before loading page.
          authUser.id !== course.owner.id
            ? nav("/forbidden")
            : setCourseDetails(course);
        } else {
          nav("/notfound");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        nav("/error");
      });
  }, [id, nav, authUser]);

  const handleSumbit = async (e) => {
    e.preventDefault();

    // Takes supplied credentials and body information and attempts a PUT request to the api.

    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    };
    const body = {
      id,
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    // Sends request and handles the response accordingly

    try {
      const response = await api(`/courses/${id}`, "PUT", body, credentials);
      if (response.status === 204) {
        nav(`/courses/${id}`);
      } else if (response.status === 403) {
        // Forbidden
        console.warn("Forbidden: User doesn't own this course. (403)");
        nav("/forbidden");
      } else if (response.status === 401) {
        // Unauthorized
        console.warn("Unauthorized: No user detected. (401)");
        nav("/signin");
      } else if (response.status === 400) {
        // Bad Request

        const validationErrors = await response.json();

        // Checks whether the reason for the '400' response was a "Validation Error" or the course doesn't exist anymore (A very unlikey outcome).
        validationErrors["Validation Errors"]
          ? setErrors(validationErrors["Validation Errors"])
          : nav("/notfound");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      nav("/error");
    }
  };

  // Navigates back to the selected course the update was launched from

  const handleCancel = (e) => {
    e.preventDefault();
    nav(`/courses/${id}`);
  };

  // 'Display' variable used to contain JSX while loading course information

  const Display = (
    <form>
      <div className="main--flex">
        <div>
          <label htmlFor="courseTitle">Course Title</label>
          <input
            id="courseTitle"
            name="courseTitle"
            type="text"
            defaultValue={courseDetails.title}
            ref={title}
          />

          {courseDetails.owner ? (
            <p>{`By ${courseDetails.owner.firstName} ${courseDetails.owner.lastName}`}</p>
          ) : null}

          <label htmlFor="courseDescription">Course Description</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            defaultValue={courseDetails.description}
            ref={description}
          />
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input
            id="estimatedTime"
            name="estimatedTime"
            type="text"
            defaultValue={courseDetails.estimatedTime}
            ref={estimatedTime}
          />

          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea
            id="materialsNeeded"
            name="materialsNeeded"
            defaultValue={courseDetails.materialsNeeded}
            ref={materialsNeeded}
          />
        </div>
      </div>
      <button className="button" type="submit" onClick={handleSumbit}>
        Update Course
      </button>
      <button className="button button-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <ErrorDisplay errors={errors} />
        {loading ? null : Display}
      </div>
    </main>
  );
};

export default UpdateCourse;
