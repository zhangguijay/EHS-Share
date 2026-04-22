"use client";

import MainLayout from "../../layout";
import { useState } from "react";

// Sample approval data
const initialApprovals = [
  {
    id: 1,
    title: "危废转移申请",
    type: "危废转移",
    applicant: "张环保",
    department: "安全环保部",
    applyDate: "2024-01-15",
    status: "审批中",
    currentStep: 2,
    totalSteps: 3,
  },
  {
    id: 2,
    title: "特种设备年检申请",
    type: "设备年检",
    applicant: "李设备",
    department: "设备部",
    applyDate: "2024-01-14",
    status: "已通过",
    currentStep: 3,
    totalSteps: 3,
  },
  {
    id: 3,
    title: "安全培训计划申请",
    type: "培训计划",
    applicant: "王安全",
    department: "安全环保部",
    applyDate: "2024-01-13",
    status: "审批中",
    currentStep: 1,
    totalSteps: 2,
  },
  {
    id: 4,
    title: "职业健康体检申请",
    type: "体检申请",
    applicant: "刘健康",
    department: "人力资源部",
    applyDate: "2024-01-12",
    status: "已驳回",
    currentStep: 1,
    totalSteps: 2,
  },
];

const approvalTypes = [
  { code: "all", name: "全部类型" },
  { code: "waste", name: "危废转移" },
  { code: "equipment", name: "设备年检" },
  { code: "training", name: "培训计划" },
  { code: "health", name: "体检申请" },
];

const statuses = ["全部", "审批中", "已通过", "已驳回"];

export default function ApprovalPage() {
  const [approvals] = useState(initialApprovals);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [showModal, setShowModal] = useState(false);

  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.applicant.includes(searchTerm);
    const matchesType = selectedType === "all" || approval.type === approvalTypes.find(t => t.code === selectedType)?.name;
    const matchesStatus = selectedStatus === "全部" || approval.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "审批中":
        return "text-blue-600 bg-blue-50";
      case "已通过":
        return "text-emerald-600 bg-emerald-50";
      case "已驳回":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "危废转移":
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        );
      case "设备年检":
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      case "培训计划":
        return (
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
    }
  };

  const pendingCount = approvals.filter(a => a.status === "审批中").length;
  const approvedCount = approvals.filter(a => a.status === "已通过").length;
  const rejectedCount = approvals.filter(a => a.status === "已驳回").length;

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">审批流程</h1>
            <p className="text-gray-500 mt-1">EHS 相关审批事项管理</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>发起审批</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{approvals.length}</div>
            <div className="text-sm text-gray-500">审批总数</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
            <div className="text-sm text-blue-600">审批中</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-600">{approvedCount}</div>
            <div className="text-sm text-emerald-600">已通过</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <div className="text-sm text-red-600">已驳回</div>
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
                  placeholder="搜索审批标题、申请人..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {approvalTypes.map((type) => (
                <option key={type.code} value={type.code}>{type.name}</option>
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

        {/* Approval List */}
        <div className="space-y-4">
          {filteredApprovals.map((approval) => (
            <div
              key={approval.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getTypeIcon(approval.type)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{approval.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {approval.applicant}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {approval.department}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {approval.applyDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(approval.status)}`}>
                    {approval.status}
                  </span>
                  <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
                    查看详情
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">审批进度</span>
                  <span className="text-sm text-gray-700">
                    第 {approval.currentStep} 步 / 共 {approval.totalSteps} 步
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: approval.totalSteps }).map((_, index) => (
                    <div key={index} className="flex-1 flex items-center">
                      <div
                        className={`h-2 flex-1 rounded ${
                          index < approval.currentStep
                            ? approval.status === "已驳回"
                              ? "bg-red-500"
                              : "bg-emerald-500"
                            : index === approval.currentStep && approval.status === "审批中"
                            ? "bg-blue-500"
                            : "bg-gray-200"
                        }`}
                      />
                      {index < approval.totalSteps - 1 && (
                        <div className="w-2" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>提交申请</span>
                  <span>部门审批</span>
                  <span>领导审批</span>
                  <span>完成</span>
                </div>
              </div>
            </div>
          ))}

          {filteredApprovals.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mt-4 text-gray-500">没有找到匹配的审批记录</p>
            </div>
          )}
        </div>
      </div>

      {/* New Approval Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">发起审批</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">审批类型 *</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option value="">请选择审批类型</option>
                    <option value="waste">危废转移申请</option>
                    <option value="equipment">特种设备年检</option>
                    <option value="training">安全培训计划</option>
                    <option value="health">职业健康体检</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">审批标题 *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="请输入审批标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">申请说明 *</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="请详细描述申请内容"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">上传附件</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                提交申请
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
