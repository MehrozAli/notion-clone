"use client";

import { useQuery } from "convex/react";
import { Toolbar } from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: Props) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />

        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
  }

  if (document === null) {
    return <p>Not found</p>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
