import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold">Spare Parts Management System</h1>
      </header>

      <main className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Create Part</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Part Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Part Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create Part
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Create Shelf</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Shelf Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Shelf Location
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create Shelf
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sale History</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Type here to search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part Number
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Part A</td>
                <td className="px-6 py-4 whitespace-nowrap">12345</td>
                <td className="px-6 py-4 whitespace-nowrap">10</td>
                <td className="px-6 py-4 whitespace-nowrap">2023-10-01</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Part B</td>
                <td className="px-6 py-4 whitespace-nowrap">67890</td>
                <td className="px-6 py-4 whitespace-nowrap">5</td>
                <td className="px-6 py-4 whitespace-nowrap">2023-10-02</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
