'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import GraphQLDemo from '@/components/GraphQLDemo';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Signing out...' : 'Sign out'}
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Welcome, {user?.email}!</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      You have successfully logged in to your account.
                    </p>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account Status</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Your account is active and verified.
                    </p>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Next Steps</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Explore our features and customize your experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GraphQL Demo Section */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">GraphQL API Demo</h2>
            <GraphQLDemo />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}