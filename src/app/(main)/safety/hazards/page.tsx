"use client";

import MainLayout from "../../layout";
import { useState } from "react";

// Sample hazard data
const initialHazards = [
  {
    id: 1,
    title: "车间配电箱门未关闭",
    level: "重大隐患",
    status: "待整改",
    category: "电气安全",
    location: "A栋2楼生产车间",
    reporter: "王安全",
    reportTime: "2024-01-15 14:30",
    deadline: "2024-01-22",
    description: "配电箱门未关闭，存在触电风险。",
  },
  {
    id: 2,
    title: "危化品仓库通风不良",
    level: "一般隐患",
    status: "整改中",
    category: "危化品安全",
    location: "B栋危化品仓库",
    reporter: "李安全",
    reportTime: "2024-01-15 10:20",
    deadline: "2024-01-25",
    description: "仓库通风系统效果不佳，需要改善。",
  },
  {
    id: 3,
    title: "消防通道被占用",
    level: "一般隐患",
    status: "待整改",
    category: "消防安全",
    location: "C栋消防通道",
    reporter: "张巡检",
    reportTime: "2024-01-14 16:45",
    deadline: "2024-01-17",
    description: "消防通道被杂物占用，影响应急疏散。",
  },
  {
    id: 4,
    title: "部分员工未佩戴防护用品",
    level: "轻微隐患",
    status: "已整改",
    category: "个人防护",
    location: "D栋包装车间",
    reporter: "刘班长",
    reportTime: "2024-01-14 09:15",
    deadline: "2024-01-14",
    description: "部分员工在作业时未佩戴安全帽和防护手套。",
  },
  {
    id: 5,
    title: "电梯年检即将过期",
    level: "一般隐患",
    status: "待整改",
    category: "特种设备",
    location: "A栋电梯",
    reporter: "设备部",
    reportTime: "2024-01-13 11:00",
    deadline: "2024-01-20",
    description: "电梯年检有效期至2024-01-31，需尽快安排年检。",
  },
];

const categories = ["全部", "电气安全", "危化品安全", "消防安全", "个人防护", "特种设备", "机械安全", "其他"];
const levels = ["全部", "重大隐患", "一般隐患", "轻微隐患"];
const statuses = ["全部", "待整改", "整改中", "已整改", "已验收"];

export default function HazardsPage() {
  const [hazards, setHazards] = useState(initialHazards);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedLevel, setSelectedLevel] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [showModal, setShowModal] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState<typeof initialHazards[0] | null>(null);

  const filteredHazards = hazards.filter((hazard) => {
    const matchesSearch =
      hazard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hazard.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hazard.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || hazard.category === selectedCategory;
    const matchesLevel = selectedLevel === "全部" || hazard.level === selectedLevel;
    const matchesStatus = selectedStatus === "全部" || hazard.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "重大隐患":
        return "bg-red-100 text-red-700 border-red-200";
      case "一般隐患":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "轻微隐患":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待整改":
        return "text-orange-600 bg-orange-50 border-orange-100";
      case "整改中":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "已整改":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "已验收":
        return "text-gray-600 bg-gray-50 border-gray-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const handleView = (hazard: typeof initialHazards[0]) => {
    setSelectedHazard(hazard);
    setShowModal(true);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setHazards(hazards.map(h => h.id === id ? { ...h, status: newStatus } : h));
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">隐患排查管理</h1>
            <p className="text-gray-500 mt-1">管理企业安全隐患的全生命周期</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>新增隐患</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索隐患标题、地点、报告人..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Level */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            {/* Status */}
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{hazards.length}</div>
            <div className="text-sm text-gray-500">隐患总数</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {hazards.filter(h => h.status === "待整改").length}
            </div>
            <div className="text-sm text-orange-600">待整改</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">
              {hazards.filter(h => h.status === "整改中").length}
            </div>
            <div className="text-sm text-blue-600">整改中</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">
              {hazards.filter(h => h.status === "已整改").length}
            </div>
            <div className="text-sm text-emerald-600">已整改</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">隐患描述</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">等级</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类别</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">位置</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">报告人</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHazards.map((hazard) => (
                  <tr key={hazard.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{hazard.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{hazard.reportTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(hazard.level)}`}>
                        {hazard.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={hazard.status}
                        onChange={(e) => handleStatusChange(hazard.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(hazard.status)} cursor-pointer`}
                      >
                        {statuses.filter(s => s !== "全部").map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{hazard.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{hazard.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{hazard.reporter}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{hazard.deadline}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleView(hazard)}
                        className="text-emerald-600 hover:text-emerald-800 mr-3"
                      >
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

          {filteredHazards.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-500">没有找到匹配的隐患记录</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            显示 <span className="font-medium">{filteredHazards.length}</span> 条结果
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              上一页
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">3</button>
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
                  {selectedHazard ? "隐患详情" : "新增隐患"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedHazard(null);
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
              {selectedHazard ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">隐患标题</label>
                      <p className="text-gray-900">{selectedHazard.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">隐患等级</label>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(selectedHazard.level)}`}>
                        {selectedHazard.level}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">隐患类别</label>
                      <p className="text-gray-900">{selectedHazard.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">当前状态</label>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(selectedHazard.status)}`}>
                        {selectedHazard.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">隐患位置</label>
                    <p className="text-gray-900">{selectedHazard.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">隐患描述</label>
                    <p className="text-gray-900">{selectedHazard.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">报告人</label>
                      <p className="text-gray-900">{selectedHazard.reporter}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">报告时间</label>
                      <p className="text-gray-900">{selectedHazard.reportTime}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">整改期限</label>
                    <p className="text-gray-900">{selectedHazard.deadline}</p>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">隐患标题 *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入隐患标题"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">隐患等级 *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="">请选择</option>
                        <option value="major">重大隐患</option>
                        <option value="general">一般隐患</option>
                        <option value="minor">轻微隐患</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">隐患类别 *</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <option value="">请选择</option>
                        <option value="electrical">电气安全</option>
                        <option value="chemical">危化品安全</option>
                        <option value="fire">消防安全</option>
                        <option value="ppe">个人防护</option>
                        <option value="equipment">特种设备</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">隐患位置 *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入隐患位置"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">隐患描述 *</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请详细描述隐患情况"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">整改期限</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">上传附件</label>
                      <input
                        type="file"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedHazard(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                {selectedHazard ? "确认" : "提交"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
