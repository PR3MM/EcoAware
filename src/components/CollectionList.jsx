const CollectionList = ({ requests, onDelete }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="text-xl font-bold text-gray-900 mb-1">No requests yet</div>
        <p className="text-sm text-gray-600">Use the form to schedule an e-waste pickup. Submitted requests will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Submitted Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{r.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onDelete(r.id)}
                      aria-label={`Delete request from ${r.name}`}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">{r.type} • {r.weight} kg</div>
                <div className="font-semibold text-gray-900">{r.name}</div>
                <div className="text-sm text-gray-700 truncate max-w-xs">{r.address}</div>
                <div className="text-xs text-gray-500">{r.email}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-2">{r.date}</div>
                <button
                  onClick={() => onDelete(r.id)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                  aria-label={`Delete request from ${r.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionList;
