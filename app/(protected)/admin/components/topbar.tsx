import { Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Dashboard</span>
        <span>/</span>
        <span className="font-semibold text-gray-700">All</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-[#1B1856]/20"
          />
        </div>
      </div>
    </header>
  );
}
