import ScaleLoader from "react-spinners/ScaleLoader";

const SubmitSpinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center">
      <ScaleLoader 
        color="#ffff" // Set the spinner color
        loading={loading} // Show or hide the spinner
        height={20} // Height of the spinner bars
        width={2} // Width of the spinner bars
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default SubmitSpinner;
