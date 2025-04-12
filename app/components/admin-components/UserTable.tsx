"use client";

import { AdminUserActions } from "@/app/components/admin-components/adminUserAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/type";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="w-full max-w-6xl border rounded-lg shadow-sm">
      <Table className="min-w-[800px]">
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Path</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <TableCell className="font-medium">#{user.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{user.firstName} {user.lastName}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={user.id === 'active' ? 'default' : 'secondary'}
                  className={user.id === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                >
                  {user.id|| 'inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {user.id || '/'}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {user.email}
              </TableCell>
              <TableCell className="text-right">
                <AdminUserActions status={user.id} id={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No users found
        </div>
      )}
    </div>
  );
}