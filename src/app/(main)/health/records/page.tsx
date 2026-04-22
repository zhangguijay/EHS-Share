"use client";

import MainLayout from "../../layout";
import { useState } from "react";

// Sample health examination data
const initialRecords = [
  {
    id: 1,
    employeeName: "张三",
    department: "生产车间A",
    position: "操作工",
    idNumber: "320***********1234",
    age: 35,
    examinationDate: "2024-01-10",
    examinationType: "年度体检",
    hospital: "市第一人民医院",
    status: "已完成",
    result: "未见异常",
    nextDate: "2025-01-10",
  },
  {
    id: 2,
    employeeName: "李四",
    department: "喷涂车间",
    position: "喷漆工",
    idNumber: "320***********5678",
    age: 42,
    examinationDate: "2024-01-08",
    examinationType: "在岗体检",
    hospital: "市职业病防治院",
    status: "已完成",
    result: "建议复查",
    nextDate: "2024-04-08",
  },
  {
    id: 3,
    employeeName: "王五",
    department: "生产车间B",
    position: "班组长",
    idNumber: "320***********9012",
    age: 38,
    examinationDate: "2024-01-15",
    examinationType: "年度体检",
    hospital: "市第一人民医院",
    status: "待体检",
    result: "-",
    nextDate: "-",
  },
  {
    id: 4,
    employeeName: "赵六",
    department: "焊接车间",
    position: "焊工",
    idNumber: "320***********3456",
    age: 45,
    examinationDate: "2023-12-20",
    examinationType: "特种作业体检",
    hospital: "市职业病防治院",
    status: "已完成",
    result: "未见异常",
    nextDate: "2024-12-20",
  },
];

// Upcoming examinations
const upcomingExaminations = [
  { id: 1, name: "王五", department: "生产车间B", type: "年度体检", scheduledDate: "2024-01-15", status: "待体检" },
  { id: 2, name: "孙七", department: "电镀车间", type: "职业病体检", scheduledDate: "2024-01-18", status: "待通知" },
  { id: 3, name: "周八", department: "质检部门", type: "入职体检", scheduledDate: "2024-01-20", status: "待通知" },
];

export default function HealthRecordsPage() {
  const [records] = useState(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<typeof initialRecords[0] | null>(null);

  const departments = ["全部", "生产车间A", "生产车间B", "喷涂车间", "焊接车间", "电镀车间", "质检部门"];
  const statuses = ["全部", "已完成", "待体检", "复查中"];

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.employeeName.includes(searchTerm) ||
      record.department.includes(searchTerm) ||
      record.idNumber.includes(searchTerm);
    const matchesDepartment = selectedDepartment === "全部" || record.department === selectedDepartment;
    const matchesStatus = selectedStatus === "全部" || record.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "text-emerald-600 bg-emerald-50";
      case "待体检":
        return "text-orange-600 bg-orange-50";
      case "复查中":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getResultColor = (result: string) => {
    if (result === "未见异常") return "text-emerald-600";
    if (result === "建议复查") return "text-orange-600";
    return "text-gray-400";
  };

  const handleView = (record: typeof initialRecords[0]) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const completedCount = records.filter(r => r.status === "已完成").length;
  const pendingCount = records.filter(r => r.status !== "已完成").length;

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">职业健康档案</h1>
            <p className="text-gray-500 mt-1">员工职业健康检查记录管理</p>
          </div>
          <button
            onClick={() => {
              setSelectedRecord(null);
              setShowModal(true);
            }}
            className="mt-4 md:mt-0 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>新增体检记录</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{records.length}</div>
            <div className="text-sm text-gray-500">体检总人数</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">{completedCount}</div>
            <div className="text-sm text-emerald-600">已完成</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <div className="text-sm text-orange-600">待体检</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-blue-600">职业病疑似</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Filters */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="搜索员工姓名..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">即将体检</h3>
            <div className="space-y-2">
              {upcomingExaminations.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                    <div className="text-xs text-gray-500">{exam.department}</div>
                  </div>
                  <div className="text-xs text-gray-500">{exam.scheduledDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">员工姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门/岗位</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年龄</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">体检类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">体检日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">体检机构</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">体检结果</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                      <div className="text-xs text-gray-500">{record.idNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{record.department}</div>
                      <div className="text-xs text-gray-500">{record.position}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.age}岁</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.examinationType}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.examinationDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.hospital}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getResultColor(record.result)}`}>
                        {record.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => handleView(record)} className="text-emerald-600 hover:text-emerald-800 mr-3">
                        详情
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        编辑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="mt-4 text-gray-500">没有找到匹配的体检记录</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedRecord ? "体检详情" : "新增体检记录"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedRecord(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {selectedRecord ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">员工姓名</label>
                      <p className="text-gray-900 font-medium">{selectedRecord.employeeName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">身份证号</label>
                      <p className="text-gray-900">{selectedRecord.idNumber}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">部门/岗位</label>
                      <p className="text-gray-900">{selectedRecord.department} / {selectedRecord.position}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">年龄</label>
                      <p className="text-gray-900">{selectedRecord.age}岁</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">体检类型</label>
                      <p className="text-gray-900">{selectedRecord.examinationType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">体检机构</label>
                      <p className="text-gray-900">{selectedRecord.hospital}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">体检日期</label>
                      <p className="text-gray-900">{selectedRecord.examinationDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">下次体检日期</label>
                      <p className="text-gray-900">{selectedRecord.nextDate}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">体检结果</label>
                    <p className={`text-lg font-medium ${getResultColor(selectedRecord.result)}`}>
                      {selectedRecord.result}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">当前状态</label>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(selectedRecord.status)}`}>
                      {selectedRecord.status}
                    </span>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">员工姓名 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="请输入员工姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">身份证号 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="请输入身份证号"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">部门 *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                        <option value="">请选择部门</option>
                        {departments.filter(d => d !== "全部").map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">岗位 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="请输入岗位"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">体检类型 *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                        <option value="">请选择</option>
                        <option value="annual">年度体检</option>
                        <option value="occupational">职业病体检</option>
                        <option value="pre-job">入职体检</option>
                        <option value="special">特种作业体检</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">体检机构 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="请输入体检机构"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">体检日期 *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </form>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRecord(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                {selectedRecord ? "关闭" : "提交"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
