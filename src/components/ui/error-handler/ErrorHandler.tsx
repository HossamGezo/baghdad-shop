const ErrorHandler = ({error}: {error: string}) => {
  return (
    <div className="product-not-found w-full flex items-center justify-center">
      <h1 className="bg-red-100 text-red-500 p-5 h-100 rounded-2xl text-2xl md:text-3xl lg:text-5xl flex items-center justify-center font-jetbrains font-bold w-full text-center">
        {error}
      </h1>
    </div>
  );
};

export default ErrorHandler;
