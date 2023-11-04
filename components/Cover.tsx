"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface Props {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: Props) => {
  const coverImage = useCoverImage();
  const params = useParams();
  const removeCover = useMutation(api.documents.removeCover);
  const { edgestore } = useEdgeStore();

  const onCoverRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }

    removeCover({ id: params.documentId as Id<"documents"> });
  };

  return (
    <div
      className={cn("relative w-full h-[35vh] group", {
        "h-[12vh]": !url,
        "bg-muted": url,
      })}
    >
      {!!url ? (
        <Image src={url} alt="Cover" className="object-cover" fill />
      ) : null}

      {url && !preview ? (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size={"sm"}
            onClick={() => coverImage.onReplace(url)}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>

          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size={"sm"}
            onClick={onCoverRemove}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      ) : null}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
