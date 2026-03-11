'use client';

import { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';
import { useAuth } from '@/hooks/useAuth';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

const PROTECTED_HELLO_QUERY = gql`
  query ProtectedHello {
    protectedHello
  }
`;

const LOGIN_REQUIRED_MUTATION = gql`
  mutation LoginRequiredMutation($data: String!) {
    loginRequiredMutation(data: $data)
  }
`;

export default function GraphQLDemo() {
  const { user } = useAuth();
  const [helloResult, setHelloResult] = useState<string | null>(null);
  const [protectedHelloResult, setProtectedHelloResult] = useState<string | null>(null);
  const [mutationResult, setMutationResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchHello = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await request(apiUrl + '/graphql', HELLO_QUERY);
      setHelloResult(data.hello);
    } catch (err) {
      setError('Error fetching hello: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProtectedHello = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await request(
        apiUrl + '/graphql',
        PROTECTED_HELLO_QUERY,
        {},
        {
          Authorization: `Bearer ${localStorage.getItem('sb-access-token')}`,
        }
      );
      setProtectedHelloResult(data.protectedHello);
    } catch (err) {
      setError('Error fetching protected hello: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const executeMutation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await request(
        apiUrl + '/graphql',
        LOGIN_REQUIRED_MUTATION,
        { data: 'Test data' },
        {
          Authorization: `Bearer ${localStorage.getItem('sb-access-token')}`,
        }
      );
      setMutationResult(data.loginRequiredMutation);
    } catch (err) {
      setError('Error executing mutation: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">GraphQL API Demo</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Public Query</h3>
          <button
            onClick={fetchHello}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Fetch Hello
          </button>
          {helloResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded">
              Result: {helloResult}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Protected Query</h3>
          <button
            onClick={fetchProtectedHello}
            disabled={loading || !user}
            className={`w-full py-2 px-4 rounded-md ${
              user
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } disabled:opacity-50`}
          >
            Fetch Protected Hello
          </button>
          {!user && (
            <p className="mt-2 text-sm text-gray-500">
              You need to be logged in to use this feature
            </p>
          )}
          {protectedHelloResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded">
              Result: {protectedHelloResult}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Protected Mutation</h3>
          <button
            onClick={executeMutation}
            disabled={loading || !user}
            className={`w-full py-2 px-4 rounded-md ${
              user
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } disabled:opacity-50`}
          >
            Execute Mutation
          </button>
          {!user && (
            <p className="mt-2 text-sm text-gray-500">
              You need to be logged in to use this feature
            </p>
          )}
          {mutationResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded">
              Result: {mutationResult}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}
    </div>
  );
}