"use client";

import MainLayout from "../../layout";
import { useState } from "react";

// Sample waste data
const initialWasteRecords = [
  {
    id: 1,
    code: "WF-2024-001",
    name: "废机油",
    category: "HW08",
    quantity: "0.5",
    unit: "吨",
    source: "设备维修",
    storageLocation: "危废仓库A区",
    generateDate: "2024-01-10",
    transferDate: "2024-01-15",
    status: "已转移",
    processor: "绿盾环保公司",
  },
  {
    id: 2,
    code: "WF-2024-002",
    name: "含油抹布",
    category: "HW49",
    quantity: "0.1",
    unit: "吨",
    source: "生产车间清洁",
    storageLocation: "危废仓库B区",
    generateDate: "2024-01-12",
    transferDate: null,
    status: "贮存中",
    processor: null,
  },
  {
    id: 3,
    code: "WF-2024-003",
    name: "废油漆桶",
    category: "HW12",
    quantity: "0.2",
    unit: "吨",
    source: "设备涂装",
    storageLocation: "危废仓库A区",
    generateDate: "2024-01-14",
    transferDate: null,
    status: "待转移",
    processor: null,
  },
  {
    id: 4,
    code: "WF-2024-004",
    name: "废溶剂",
    category: "HW06",
    quantity: "0.3",
    unit: "吨",
    source: "清洗作业",
    storageLocation: "危废仓库C区",
    generateDate: "2024-01-08",
    transferDate: "2024-01-12",
    status: "已转移",
    processor: "中环环保公司",
  },
];

const wasteCategories = [
  { code: "HW01", name: "医疗废物" },
  { code: "HW02", name: "医药废物" },
  { code: "HW03", name: "废药物、药品" },
  { code: "HW04", name: "农药废物" },
  { code: "HW05", name: "木材防腐剂废物" },
  { code: "HW06", name: "有机溶剂废物" },
  { code: "HW07", name: "热处理含氰废物" },
  { code: "HW08", name: "废矿物油" },
  { code: "HW09", name: "废乳化液" },
  { code: "HW10", name: "含多氯联苯废物" },
  { code: "HW11", name: "精馏残渣" },
  { code: "HW12", name: "涂料废物" },
  { code: "HW13", name: "有机树脂废物" },
  { code: "HW14", name: "新化学物质废物" },
  { code: "HW49", name: "其他废物" },
];

export default function WasteManagementPage() {
  const [records, setRecords] = useState(initialWasteRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<typeof initialWasteRecords[0] | null>(null);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || record.category === selectedCategory;
    const matchesStatus = selectedStatus === "全部" || record.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已转移":
        return "text-emerald-600 bg-emerald-50";
      case "贮存中":
        return "text-blue-600 bg-blue-50";
      case "待转移":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const totalQuantity = records.reduce((acc, r) => acc + parseFloat(r.quantity), 0);
  const pendingTransfer = records.filter(r => r.status === "待转移" || r.status === "贮存中").length;
  const transferred = records.filter(r => r.status === "已转移").length;

  const handleView = (record: typeof initialWasteRecords[0]) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">危废管理</h1>
            <p className="text-gray-500 mt-1">危险废物全过程跟踪管理</p>
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
            <span>新增危废记录</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{records.length}</div>
            <div className="text-sm text-gray-500">记录总数</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">{totalQuantity.toFixed(1)} 吨</div>
            <div className="text-sm text-purple-600">本月产生量</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{pendingTransfer}</div>
            <div className="text-sm text-orange-600">待转移/贮存中</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">{transferred}</div>
            <div className="text-sm text-emerald-600">已安全转移</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索危废编号、名称、来源..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="全部">全部类别</option>
              {wasteCategories.map((cat) => (
                <option key={cat.code} value={cat.code}>{cat.code} - {cat.name}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="全部">全部状态</option>
              <option value="贮存中">贮存中</option>
              <option value="待转移">待转移</option>
              <option value="已转移">已转移</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">危废编号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">危废名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类别</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产生量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产生来源</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">贮存位置</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产生日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-emerald-600">{record.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{record.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.quantity} {record.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.storageLocation}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.generateDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button onClick={() => handleView(record)} className="text-emerald-600 hover:text-emerald-800 mr-3">
                        查看
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mt-4 text-gray-500">没有找到匹配的危废记录</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            显示 <span className="font-medium">{filteredRecords.length}</span> 条结果
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              上一页
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              下一页
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedRecord ? "危废详情" : "新增危废记录"}
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
                      <label className="block text-sm font-medium text-gray-500 mb-1">危废编号</label>
                      <p className="text-gray-900 font-medium">{selectedRecord.code}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">危废类别</label>
                      <p className="text-gray-900">{selectedRecord.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">危废名称</label>
                      <p className="text-gray-900">{selectedRecord.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">产生数量</label>
                      <p className="text-gray-900">{selectedRecord.quantity} {selectedRecord.unit}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">产生来源</label>
                      <p className="text-gray-900">{selectedRecord.source}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">贮存位置</label>
                      <p className="text-gray-900">{selectedRecord.storageLocation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">产生日期</label>
                      <p className="text-gray-900">{selectedRecord.generateDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">转移日期</label>
                      <p className="text-gray-900">{selectedRecord.transferDate || "-"}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">处置单位</label>
                    <p className="text-gray-900">{selectedRecord.processor || "-"}</p>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">危废编号 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="系统自动生成"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">危废类别 *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                        <option value="">请选择</option>
                        {wasteCategories.map((cat) => (
                          <option key={cat.code} value={cat.code}>{cat.code} - {cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">危废名称 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="请输入危废名称"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">产生数量 *</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          step="0.01"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          placeholder="0.00"
                        />
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                          <option>吨</option>
                          <option>kg</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">产生来源 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="如：生产车间、实验室"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">贮存位置 *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        placeholder="如：危废仓库A区"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">产生日期 *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">备注说明</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="请输入备注信息"
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
