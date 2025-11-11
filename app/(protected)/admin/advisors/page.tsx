import { Button } from "@/components/ui/button";
import AdvisorTable from "./advisorsTable";
import { advisors } from "@/lib/advisors";

export default function AdvisorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B1856]">Advisors</h1>
          <p className="text-gray-500 text-sm">
            Manage the advisors displayed on the Celerey site.
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-[#1B1856] text-white hover:bg-[#1B1856]/90">
            Add Advisor
          </Button>
        </div>
      </div>

      {/* Table */}
      <AdvisorTable advisors={advisors} />
    </div>
  );
}
