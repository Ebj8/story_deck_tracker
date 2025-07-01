import CreateSetForm from "@/pages/admin/set/create/form";
import { Card, CardContent } from "@/components/ui/card";

const SetPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-2xl h-full box-border m-4 p-4">
        <CardContent>
          <CreateSetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SetPage;
