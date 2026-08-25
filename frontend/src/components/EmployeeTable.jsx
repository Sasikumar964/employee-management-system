function formatSalary(salary) {
  if (salary == null || salary === '') return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(salary);
}

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="text-lg font-medium text-slate-700">No employees yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Click &quot;Add Employee&quot; to create your first record.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Responsive Cards View (visible on small screens < md) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {employee.first_name} {employee.last_name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold">{employee.position || 'No Position'}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-medium text-slate-600">
                {employee.department || 'General'}
              </span>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Email:</span> {employee.email}
              </p>
              <p className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Salary:</span> {formatSalary(employee.salary)}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-1">
              <button
                type="button"
                onClick={() => onEdit(employee)}
                className="flex-1 py-1.5 text-center text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(employee)}
                className="flex-1 py-1.5 text-center text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Responsive Table View (visible on medium screens and up >= md) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {['Name', 'Email', 'Department', 'Position', 'Salary', 'Actions'].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-slate-900">
                    {employee.first_name} {employee.last_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
                    {employee.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
                    {employee.department || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
                    {employee.position || '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-slate-700">
                    {formatSalary(employee.salary)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(employee)}
                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(employee)}
                        className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
