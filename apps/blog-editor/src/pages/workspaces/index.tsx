const EmptyWorkspace = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl font-bold mb-4">No workspace selected</h2>
      <p className="text-gray-500 text-center">
        Select a workspace from the sidebar to get started.
      </p>
    </div>
  );
};

export default EmptyWorkspace;
