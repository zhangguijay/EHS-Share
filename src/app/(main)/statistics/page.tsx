"use client";

import MainLayout from "../../layout";
import { useState } from "react";

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedModule, setSelectedModule] = useState("all");

  // Sample monthly trend data
  const monthlyTrend = [
    { month: "8月", hazards: 18, inspections: 120, waste: 2.5, health: 45 },
    { month: "9月", hazards: 15, inspections: 135, waste: 2.8, health: 48 },
    { month: "10月", hazards: 12, inspections: 142, waste: 3.0, health: 50 },
    { month: "11月", hazards: 14, inspections: 148, waste: 2.6, health: 52 },
    { month: "12月", hazards: 16, inspections: 155, waste: 2.9, health: 48 },
    { month: "1月", hazards: 12, inspections: 156, waste: 2.8, health: 55 },
  ];

  // Category breakdown
  const categoryBreakdown = [
    { category: "电气安全", count: 25, percentage: 28 },
    { category: "消防安全", count: 22, percentage: 24 },
    { category: "危化品安全", count: 18, percentage: 20 },
    { category: "特种设备", count: 12, percentage: 13 },
    { category: "个人防护", count: 8, percentage: 9 },
    { category: "其他", count: 5, percentage: 6 },
  ];

  // Department ranking
  const departmentRanking = [
    { department: "生产车间A", hazards: 28, inspections: 45, score: 95 },
    { department: "生产车间B", hazards: 22, inspections: 42, score: 92 },
    { department: "喷涂车间", hazards: 18, inspections: 38, score: 88 },
    { department: "焊接车间", hazards: 15, inspections: 35, score: 85 },
    { department: "电镀车间", hazards: 12, inspections: 32, score: 82 },
    { department: "仓库", hazards: 8, inspections: 28, score: 78 },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">统计分析</h1>
            <p className="text-gray-500 mt-1">EHS 数据可视化分析报表</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
              <option value="year">本年</option>
            </select>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">全部模块</option>
              <option value="safety">安全管理</option>
              <option value="environment">环境管理</option>
              <option value="health">职业健康</option>
            </select>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>导出报表</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">本月隐患数</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                <p className="text-sm text-emerald-600 mt-1">较上月 -25%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">本月巡检</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
                <p className="text-sm text-emerald-600 mt-1">较上月 +0.6%</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">危废产生量</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">2.8吨</p>
                <p className="text-sm text-emerald-600 mt-1">较上月 -3.4%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">体检完成率</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">92%</p>
                <p className="text-sm text-emerald-600 mt-1">较上月 +5%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">月度趋势</h3>
            <div className="space-y-4">
              {/* Simple bar chart visualization */}
              <div className="flex items-end justify-between h-48 space-x-4">
                {monthlyTrend.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col-reverse items-center space-y-1">
                      <div
                        className="w-full bg-emerald-500 rounded-t"
                        style={{ height: `${data.inspections / 2}px` }}
                        title={`巡检: ${data.inspections}`}
                      />
                      <div
                        className="w-full bg-orange-400 rounded-t"
                        style={{ height: `${data.hazards * 3}px` }}
                        title={`隐患: ${data.hazards}`}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-gray-600">巡检次数</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-400 rounded"></div>
                  <span className="text-sm text-gray-600">隐患数</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">隐患类别分布</h3>
            <div className="space-y-4">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="text-gray-500">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Ranking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">部门 EHS 排名</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">隐患数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">巡检次数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EHS 评分</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">趋势</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departmentRanking.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index === 0 ? 'bg-emerald-100 text-emerald-700' :
                        index === 1 ? 'bg-gray-100 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{dept.hazards}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{dept.inspections}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{dept.score}</span>
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              dept.score >= 90 ? 'bg-emerald-500' :
                              dept.score >= 80 ? 'bg-blue-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${dept.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span className="text-sm text-emerald-600">+2</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Waste Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">危废产生趋势</h3>
            <div className="flex items-end justify-between h-32 space-x-2">
              {monthlyTrend.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-purple-400 rounded-t" style={{ height: `${data.waste * 30}px` }} />
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health Examination Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">体检完成趋势</h3>
            <div className="flex items-end justify-between h-32 space-x-2">
              {monthlyTrend.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-400 rounded-t" style={{ height: `${data.health * 1.5}px` }} />
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
