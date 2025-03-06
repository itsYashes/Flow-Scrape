import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

interface PageProps {
  params: Promise<{ workflowId: string }>;
}

async function WorkflowEditorPage({ params }: PageProps) {
  try {
    const { workflowId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return <div>Unauthenticated</div>;
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId,
      },
    });

    if (!workflow) {
      return <div>Workflow not found</div>;
    }

    return <Editor workflow={workflow} />;
  } catch (error) {
    console.error("Error in WorkflowEditorPage:", error);
    return <div>Error loading workflow</div>;
  }
}

export default WorkflowEditorPage;
