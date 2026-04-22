"use client";

import MainLayout from "../layout";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";

// Stats data
const statsData = [
  {
    title: "待处理隐患",
    value: 12,
    change: "+3",
    changeType: "negative",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    bgColor: "bg-orange-500",
  },
  {
    title: "本月巡检",
    value: 156,
    change: "+12%",
    changeType: "positive",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    bgColor: "bg-emerald-500",
  },
  {
    title: "危废转移量",
    value: "2.8吨",
    change: "-15%",
    changeType: "positive",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    bgColor: "bg-purple-500",
  },
  {
    title: "职业病发病",
    value: 0,
    change: "0%",
    changeType: "neutral",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    bgColor: "bg-blue-500",
  },
];

// Recent hazards data
const recentHazards = [
  { id: 1, title: "车间配电箱门未关闭", level: "重大隐患", status: "待整改", time: "2024-01-15 14:30", location: "A栋2楼生产车间" },
  { id: 2, title: "危化品仓库通风不良", level: "一般隐患", status: "整改中", time: "2024-01-15 10:20", location: "B栋危化品仓库" },
  { id: 3, title: "消防通道被占用", level: "一般隐患", status: "待整改", time: "2024-01-14 16:45", location: "C栋消防通道" },
  { id: 4, title: "部分员工未佩戴防护用品", level: "轻微隐患", status: "已整改", time: "2024-01-14 09:15", location: "D栋包装车间" },
];

// Upcoming inspections
const upcomingInspections = [
  { id: 1, title: "特种设备月度检查", date: "2024-01-20", type: "设备检查" },
  { id: 2, title: "消防设施季度检查", date: "2024-01-25", type: "消防检查" },
  { id: 3, title: "环境监测月度采样", date: "2024-01-28", type: "环境监测" },
  { id: 4, title: "职业健康年度体检", date: "2024-02-01", type: "健康检查" },
];

// Monthly trend data (simplified chart)
const monthlyTrend = [
  { month: "8月", hazards: 18, inspections: 120 },
  { month: "9月", hazards: 15, inspections: 135 },
  { month: "10月", hazards: 12, inspections: 142 },
  { month: "11月", hazards: 14, inspections: 148 },
  { month: "12月", hazards: 16, inspections: 155 },
  { month: "1月", hazards: 12, inspections: 156 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "重大隐患":
        return "bg-red-100 text-red-700";
      case "一般隐患":
        return "bg-yellow-100 text-yellow-700";
      case "轻微隐患":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待整改":
        return "text-orange-600 bg-orange-50";
      case "整改中":
        return "text-blue-600 bg-blue-50";
      case "已整改":
        return "text-emerald-600 bg-emerald-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">欢迎回来，{user?.name}</h1>
          <p className="text-gray-500 mt-1">以下是您所在部门的 EHS 概览数据</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-emerald-600"
                          : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">较上月</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Hazards - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">最近隐患</h2>
                <a href="/safety/hazards" className="text-sm text-emerald-600 hover:text-emerald-700">
                  查看全部
                </a>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3 font-medium">隐患描述</th>
                      <th className="pb-3 font-medium">等级</th>
                      <th className="pb-3 font-medium">状态</th>
                      <th className="pb-3 font-medium">时间</th>
                      <th className="pb-3 font-medium">位置</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentHazards.map((hazard) => (
                      <tr key={hazard.id} className="text-sm">
                        <td className="py-3 text-gray-900">{hazard.title}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(hazard.level)}`}>
                            {hazard.level}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hazard.status)}`}>
                            {hazard.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500">{hazard.time}</td>
                        <td className="py-3 text-gray-500">{hazard.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upcoming Inspections - Takes 1 column */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">待办事项</h2>
                <span className="text-sm text-gray-400">共 {upcomingInspections.length} 项</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {upcomingInspections.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                  <span className="flex-shrink-0 px-2 py-1 text-xs font-medium bg-white text-gray-600 rounded border border-gray-200">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <a
              href="/safety/hazards/new"
              className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">隐患上报</span>
            </a>
            <a
              href="/safety/inspection/new"
              className="flex flex-col items-center p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">巡检记录</span>
            </a>
            <a
              href="/environment/waste/new"
              className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">危废登记</span>
            </a>
            <a
              href="/health/examination/new"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">体检登记</span>
            </a>
            <a
              href="/approval/new"
              className="flex flex-col items-center p-4 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-colors"
            >
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">发起审批</span>
            </a>
            <a
              href="/statistics"
              className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">数据报表</span>
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
