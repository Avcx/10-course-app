const ErrorDisplay = ({ errors }) => {
  return (
    <>
      {errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};
export default ErrorDisplay;
