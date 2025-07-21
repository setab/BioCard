import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated || context.auth.user?.role !== "admin") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const token = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY)
        ? JSON.parse(
            localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_KEY)!
          ).token
        : null;

      return await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/alluser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Users");
        return res.json();
      });
    },
  });

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary text-center flex-1">
          Admin Dashboard
        </h1>
        <Link to="/login">
          <Button onClick={auth?.logout}>
            <LogOut />
            Logout
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {isFetching && (
          <div className="flex justify-center items-center py-8">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></span>
            <span className="text-gray-600">Loading users...</span>
          </div>
        )}
        {isError && (
          <div className="text-red-600 text-center py-4">
            {(error as Error).message}
          </div>
        )}
        {data && (
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left text-gray-700 font-semibold">
                  Name
                </TableHead>
                <TableHead className="text-left text-gray-700 font-semibold">
                  Email
                </TableHead>
                <TableHead className="text-left text-gray-700 font-semibold">
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((user: any) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-3">{user.name}</TableCell>
                    <TableCell className="py-3">{user.email}</TableCell>
                    <TableCell className="py-3 capitalize">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
