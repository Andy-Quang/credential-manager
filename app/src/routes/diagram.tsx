import { createFileRoute } from "@tanstack/react-router";
import Diagram from "../components/Diagram";
import { useState } from "react";
import Charts from "@/components/Charts";

export const Route = createFileRoute("/diagram")({
  component: DiagramPage,
});

function DiagramPage() {
  const [action, setAction] = useState(0);

  const renderActionItem = () => {
    switch (action) {
      case 0:
        return null;
      case 1:
        return <Diagram />;
      case 2:
        return <Charts />;
      default:
        break;
    }
  };

  const onUpdateAction = (action: number) => {
    setAction(action);
  };

  return (
    <div className="py-8">
      <div className="flex gap-6 mb-4">
        <button
          onClick={() => onUpdateAction(0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Empty{" "}
        </button>
        <button
          onClick={() => onUpdateAction(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Diagram{" "}
        </button>
        <button
          onClick={() => onUpdateAction(2)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Charts{" "}
        </button>
      </div>
      {renderActionItem()}
    </div>
  );
}
