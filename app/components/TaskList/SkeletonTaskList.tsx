import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const SkeletonTaskList = () => {
  return (
    <div className="!h-[calc(100vh-12rem)] flex items-center justify-center">
      <LoadingSpinner size="lg" color="#2E2F31" />
    </div>
  );
};
