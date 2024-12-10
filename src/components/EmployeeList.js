// src/components/EmployeeList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, deleteEmployee } from '../redux/actions/actionsEmployee';
import { Table, Button, Form, Input, Modal } from 'antd'; // Import komponen dari Ant Design

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees); // Ambil data employee dari Redux store
  const dispatch = useDispatch();

  const [form] = Form.useForm(); // Ant Design form hook
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = (values) => {alert('Login berhasil!'+values);
    const newEmployee = {
      id: Date.now().toString(),
      ...values,
    };
    dispatch(addEmployee(newEmployee));
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleUpdateEmployee = (values) => {
    const updatedEmployee = {
      ...selectedEmployee,
      ...values,
    };
    dispatch(updateEmployee(updatedEmployee));
    form.resetFields();
    setSelectedEmployee(null);
    setIsModalVisible(false);
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    form.setFieldsValue({
      name: employee.name,
      position: employee.position,
      phone: employee.phone,
    });
    setIsModalVisible(true);
  };

  // Kolom untuk tabel
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, employee) => (
        <>
          <Button onClick={() => handleEditEmployee(employee)} type="link">
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteEmployee(employee.id)}
            type="link"
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Employee List</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Employee
      </Button>
      {/* Tabel Employee */}
     <Table
       columns={columns}
       dataSource={employees}
       rowKey="id"
       style={{ marginTop: 20 }}
     />

     {/* Modal Form untuk Add atau Update Employee */}
     <Modal
       title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}
       visible={isModalVisible}
       onCancel={() => {
         form.resetFields();
         setIsModalVisible(false);
         setSelectedEmployee(null);
       }}
       footer={null}
     >
       <Form
         form={form}
         onFinish={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
       >
         <Form.Item
           label="Name"
           name="name"
           rules={[{ required: true, message: 'Please input name!' }]}
         >
           <Input />
         </Form.Item>
         <Form.Item
           label="Position"
           name="position"
           rules={[{ required: true, message: 'Please input position!' }]}
         >
           <Input />
         </Form.Item>
         <Form.Item
           label="Phone"
           name="phone"
           rules={[{ required: true, message: 'Please input phone!' }]}
         >
           <Input />
         </Form.Item>
         <Form.Item>
           <Button type="primary" htmlType="submit">
             {selectedEmployee ? 'Update' : 'Add'}
           </Button>
         </Form.Item>
       </Form>
     </Modal>
    </div>
  );
};

export default EmployeeList;
