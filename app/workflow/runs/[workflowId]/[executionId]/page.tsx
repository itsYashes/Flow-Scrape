import { getWorkflowExecutionWithPhases } from "@/actions/workflows";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

interface Props {
  params: {
    workflowId: string;
    executionId: string;
  };
}

export default async function ExecutionViewerPage({ params }: Props) {
  const { workflowId, executionId } = await params;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={workflowId}
        title="Workflow run details"
        subtitle={`Execution Id: ${executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Loader2Icon className="animate-spin" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>No Found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
}
