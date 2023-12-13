import { useRef, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import ErrorDisplay from "./ErrorDisplay";
import { api } from "../utils/apihelper";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [errors, setErrors] = useState([]);
  const { authUser } = useContext(UserContext);
  const nav = useNavigate();

  // Creating Refs to hold form values

  const title = useRef(null);
  const description = useRef(null);
  const materialsNeeded = useRef(null);
  const estimatedTime = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating Request Options

    const credentials = {
      username: authUser.emailAddress,
      password: authUser.password,
    };
    const body = {
      title: title.current.value,
      description: description.current.value,
    };

    // Detecting if optional values exist and appending them to the request body if so

    if (
      materialsNeeded.current.value !== "" &&
      materialsNeeded.current.value !== null
    ) {
      body.materialsNeeded = materialsNeeded.current.value;
    }
    if (
      estimatedTime.current.value !== "" &&
      estimatedTime.current.value !== null
    ) {
      body.estimatedTime = estimatedTime.current.value;
    }

    // Attemping a POST request to '/courses'

    try {
      const response = await api("/courses", "POST", body, credentials);
      if (response.status === 201) {
        nav("/");
      } else if (response.status === 400) {
        const responseBody = await response.json();
        setErrors(responseBody["Validation Errors"]);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    nav("/");
  };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <ErrorDisplay errors={errors} />
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={title}
              />

              <p>{`By ${authUser.firstName} ${authUser.lastName} (You)`}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={description}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeeded}
              />
            </div>
          </div>
          <button className="button" type="submit" onClick={handleSubmit}>
            Create Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
