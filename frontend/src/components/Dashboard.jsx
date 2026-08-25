import { formatCurrency, getDashboardStats } from '../utils/dashboardStats';

function StatCard({ label, value, icon, color = 'indigo' }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1.5 text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
      {icon && (
        <div className={`w-11 h-11 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center shrink-0`}>
          {icon}
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ employees }) {
  const { total, departments, avgSalary, recent } = getDashboardStats(employees);

  return (
    <div className="space-y-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total Employees"
          value={total}
          color="indigo"
          icon={(
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )}
        />
        <StatCard
          label="Departments"
          value={departments.length}
          color="cyan"
          icon={(
            <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )}
        />
        <StatCard
          label="Avg Salary"
          value={formatCurrency(avgSalary)}
          color="emerald"
          icon={(
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Department Distribution</h3>
            <p className="text-xs text-slate-500 font-medium">Headcount breakdown per department</p>
          </div>

          {departments.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400 font-medium">No department data available</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {departments.map(({ name, count }) => (
                <li key={name} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-0.5 text-xs font-bold">
                    {count} {count === 1 ? 'employee' : 'employees'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recently Added Employees Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recently Added</h3>
            <p className="text-xs text-slate-500 font-medium">Latest team additions</p>
          </div>

          {recent.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400 font-medium">No recent additions</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recent.map((emp) => (
                <li key={emp.id} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {emp.first_name?.charAt(0)}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-900 truncate">{emp.first_name} {emp.last_name}</p>
                      <p className="text-xs text-slate-500 truncate">{emp.position || emp.department || '—'}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono hidden xs:inline sm:inline truncate max-w-[140px]">
                    {emp.email}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
