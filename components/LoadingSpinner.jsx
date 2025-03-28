const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(42,167,69)]"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;