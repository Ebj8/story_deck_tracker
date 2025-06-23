import { useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import {
  useGetCollection,
  useUpdateCollectionRow,
} from "@/requests/gen/react-query/collection";
import { CollectionRead } from "@/requests/gen/react-query/fastAPI.schemas";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useUser } from "@/auth/UserContext";
import { Input } from "@/components/ui/input";

const CollectionTable = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetCollection(user?.uid || "");

  const updateMutation = useUpdateCollectionRow();

  const handleUpdateQty = (collectionRow: CollectionRead, newQty: number) => {
    const previousData = queryClient.getQueryData<CollectionRead[]>([
      "collection",
      user?.uid,
    ]);

    queryClient.setQueryData(
      ["collection", user?.uid],
      (oldData?: CollectionRead[]) => {
        return oldData?.map((item) =>
          item.card_id === collectionRow.card_id &&
          item.is_foil === collectionRow.is_foil
            ? { ...item, qty: newQty }
            : item
        );
      }
    );

    updateMutation.mutate(
      {
        data: {
          user_id: collectionRow.user_id,
          card_id: collectionRow.card_id,
          is_foil: collectionRow.is_foil,
          qty: newQty,
          condition: collectionRow.condition,
        },
      },
      {
        onError: () => {
          queryClient.setQueryData(["collection", user?.uid], previousData);
        },
        onSettled: () => {
          // @ts-ignore
          queryClient.invalidateQueries(["collection", user?.uid]);
        },
      }
    );
  };

  const columns: ColumnDef<CollectionRead>[] = [
    {
      accessorKey: "catalog.set.set_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Set
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "catalog.collector_number",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Collector Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "condition",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Condition
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "qty",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      header: "Foil",
      accessorKey: "is_foil",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const collectionRow = row.original;

        return (
          <Input
            type="number"
            value={collectionRow.qty}
            onChange={(e) =>
              handleUpdateQty(collectionRow, parseInt(e.target.value) || 0)
            }
          />
        );
      },
    },
  ];

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <DataTable columns={columns} data={data || []} />}
    </div>
  );
};

export default CollectionTable;
