import CreateCatalogForm from "@/pages/admin/catalog/create/form";
import { Card, CardContent } from "@/components/ui/card";

const CreateCatalogPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-2xl h-full box-border m-4 p-4">
        <CardContent>
          <CreateCatalogForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCatalogPage;
