import { UserTable } from "@/app/components/admin-components/UserTable";
import { getUsers } from "@/lib/action";


export default async function ManageUsers() {
  const users = await getUsers();

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
  <div className="mx-auto max-w-[95rem]"> {/* ~1520px */}
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        User Management
      </h1>
      <div className="overflow-x-auto rounded-lg border">
        <UserTable users={users} />
      </div>
    </div>
  </div>
</div>
  );
}