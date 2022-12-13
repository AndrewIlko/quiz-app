const ErrorFlash = ({ message, close }) => {
  return (
    <>
      <div className="flash-error__wrapper">
        <div className="flash-error">{message}</div>
        <button onClick={() => close(null)}>
          <svg
            ariaHidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            dataViewComponent="true"
          >
            <path
              fillRule="evenodd"
              d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default ErrorFlash;
