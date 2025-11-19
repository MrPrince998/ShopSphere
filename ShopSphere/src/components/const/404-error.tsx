import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-light text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900">
            Page not found
          </h2>
          <p className="text-gray-500 max-w-sm">
            The page you are looking is in Works in Progress. Please check back
            later.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate("/dashboard")}>Homepage</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
