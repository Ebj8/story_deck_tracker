import CreateSetForm from "@/pages/admin/set/create/form";
import { Card, CardContent } from "@/components/ui/card";

const SetPage = () => {
  return (
    <div className="flex justify-center w-full h-screen items-start">
      <Card className="w-full max-w-2xl box-border m-4 p-4 mt-10">
        <CardContent>
          <CreateSetForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SetPage;
