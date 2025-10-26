export default function BudgetHeader() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">₹</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Budget Planner</h1>
            <p className="text-slate-600 text-sm">Plan your finances and track your spending</p>
          </div>
        </div>
      </div>
    </header>
  )
}
