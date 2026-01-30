// app/routes/home.jsx

import { Form, useLoaderData } from "react-router";

/* ============================
   LOADER = GET
   ============================ */
export async function loader({ request }) {
  console.log("Loader chạy!");

  let users = ["Nam", "An", "Bình"];

  return users;
}

/* ============================
   ACTION = POST
   ============================ */
export async function action({ request }) {
  console.log("Action chạy!");

  let formData = await request.formData();
  let name = formData.get("name");

  console.log("Tên user submit:", name);

  return { success: true };
}

/* ============================
   META
   ============================ */
export function meta() {
  return [
    { title: "Mini Page Builder" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

/* ============================
   UI COMPONENT
   ============================ */
export default function Home() {
  let data = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Danh sách Users
        </h1>

        {/* User List */}
        <ul className="space-y-2">
          {data.map(function (user) {
            return (
              <li
                key={user}
                className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-gray-700"
              >
                {user}
              </li>
            );
          })}
        </ul>

        {/* Form */}
        <Form method="post" className="space-y-3">
          <input
            name="name"
            placeholder="Nhập tên..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add User
          </button>
        </Form>
      </div>
    </div>
  );
}
