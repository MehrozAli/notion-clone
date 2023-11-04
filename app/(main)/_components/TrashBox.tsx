"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Trash, Undo } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");

  const filteredDocuments = useMemo(
    () =>
      documents?.filter((doc) => {
        return doc.title.toLowerCase().includes(search.toLocaleLowerCase());
      }),
    [documents, search]
  );

  const onClick = useCallback(
    (documentId: string) => {
      return router.push(`/documents/${documentId}`);
    },
    [router]
  );

  const onRestore = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      documentId: Id<"documents">
    ) => {
      e.stopPropagation();

      const promise = restore({ id: documentId });

      toast.promise(promise, {
        loading: "Restoring note...",
        success: "Note restored",
        error: "Failed to restore note",
      });
    },
    [restore]
  );

  const onRemove = useCallback(
    (documentId: Id<"documents">) => {
      const promise = remove({ id: documentId });

      toast.promise(promise, {
        loading: "Deleting note...",
        success: "Note deleted",
        error: "Failed to delete note",
      });

      if (params.documentId === documentId) {
        router.push("/documents");
      }
    },
    [remove, params.documentId, router]
  );

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>

        {filteredDocuments?.map((doc) => (
          <div
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
          >
            <span className="truncate pl-2">{doc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, doc._id)}
                role="button"
                className="p-2 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>

              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
