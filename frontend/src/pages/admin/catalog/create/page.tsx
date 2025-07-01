import CreateCatalogForm from "@/pages/admin/catalog/create/form";
import { Card, CardContent } from "@/components/ui/card";

const CreateCatalogPage = () => {
  return (
    <div className="flex justify-center w-full h-screen items-start">
      <Card className="w-full max-w-2xl box-border m-4 p-4 mt-10">
        <CardContent>
          <CreateCatalogForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCatalogPage;
