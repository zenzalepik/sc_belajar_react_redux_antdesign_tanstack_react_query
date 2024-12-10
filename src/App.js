import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Form, Input, Button, Alert } from "antd";
import EmployeeList from "./components/EmployeeList.js";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
} from "./redux/actions/actionsAuth";

// Inisialisasi QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeList />
      <Login />
      <UserInfo />
    </QueryClientProvider>
  );
}

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const queryClient = useQueryClient(); // Initialize queryClient

  // Konfigurasi useMutation untuk handle POST ke API login
  const mutation = useMutation({
    mutationFn: async (user) => {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      return response.json(); // Mengembalikan data respons
    },
    onMutate: () => {
      dispatch(loginRequest());
    },
    onSuccess: (data) => {
      const userProfile = {
        status: data.status,
        message: data.message,
        token: data.token,
        user: {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          createdAt: data.user.createdAt,
          updatedAt: data.user.updatedAt,
        },
      };
      // dispatch(loginSuccess(data));
      dispatch(loginSuccess(userProfile));
      // Simpan respons login ke cache
      queryClient.setQueryData(["user"], data);
      alert("Login berhasil!");
    },
    onError: (error) => {
      dispatch(loginFail(error.message));
      alert("Login gagal: " + error.message);
    },
  });

  // Fungsi untuk meng-handle perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk submit form
  const handleSubmit = (values) => {
    mutation.mutate(values); // Mengirimkan data form ke API
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Login</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            {mutation.isLoading ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
      {mutation.isError && (
        <Alert message={`Error: ${mutation.error.message}`} type="error" />
      )}
    </div>
  );
}

function UserInfo() {
  // Ambil data user info dari Redux store
  const userInfo = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    // Hapus data dari Redux
    dispatch(logout());

    // Hapus data dari Tanstack Query
    queryClient.removeQueries(["user"]);

    alert("Logout berhasil!");
  };

  if (!userInfo) {
    return <p>
          {/* <Button type="primary" danger onClick={handleLogout}> */}
            {/* Logout */}
          {/* </Button> */}
          Silakan login untuk melihat informasi.</p>;
  }
  
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Informasi User</h2>
   
        <div>
          <p>
            <strong>Username:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Token:</strong> {userInfo.token}
          </p>
          <p>
            <strong>Id User:</strong> {userInfo.id}
          </p>
          <p>
            <strong>CreatedAt:</strong> {userInfo.createdAt}
          </p>
          <p>
            <strong>UpdatedAt:</strong> {userInfo.updatedAt}
          </p>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
    </div>
  );
}
