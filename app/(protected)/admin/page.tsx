'use client';
// import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  // const { user} = useUser();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        Welcome back, 
        {/* {user?.firstName}! */}
      </h2>
      <p className="text-gray-600">
        You are now in the protected admin dashboard.
      </p>
    </div>
  );
}
