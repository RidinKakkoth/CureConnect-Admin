
const Error500 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <p className="mt-4 text-xl text-gray-700">Internal Server Error</p>
        <p className="mt-2">We're sorry, something went wrong. Please try again later.</p>
        <a href="/" className="mt-4 text-blue-500 hover:underline">Go to Home</a>
      </div>
    </div>
  );
};

export default Error500;
