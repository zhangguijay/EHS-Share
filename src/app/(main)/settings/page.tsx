"use client";

import MainLayout from "../layout";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "个人设置", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { id: "system", name: "系统设置", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    { id: "notification", name: "通知设置", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { id: "security", name: "安全设置", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-500 mt-1">管理您的个人信息和系统偏好</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className={`mr-3 h-5 w-5 ${
                        activeTab === tab.id ? "text-emerald-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">个人设置</h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-700">管</span>
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        更换头像
                      </button>
                      <p className="text-xs text-gray-500 mt-2">支持 JPG、PNG 格式，文件小于 2MB</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                      <input
                        type="text"
                        defaultValue="admin"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                      <input
                        type="text"
                        defaultValue="系统管理员"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                      <input
                        type="email"
                        defaultValue="admin@ehs-system.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                      <input
                        type="tel"
                        defaultValue="138****8888"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">部门</label>
                      <input
                        type="text"
                        defaultValue="安全环保部"
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">职位</label>
                      <input
                        type="text"
                        defaultValue="EHS主管"
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      保存修改
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">系统设置</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">深色模式</h3>
                      <p className="text-sm text-gray-500">切换系统外观主题</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">语言设置</h3>
                      <p className="text-sm text-gray-500">选择系统显示语言</p>
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                      <option>简体中文</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">日期格式</h3>
                      <p className="text-sm text-gray-500">选择日期显示格式</p>
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                      <option>YYYY-MM-DD</option>
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">数据备份</h3>
                      <p className="text-sm text-gray-500">手动备份系统数据</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      立即备份
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notification" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">通知设置</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">隐患提醒</h3>
                      <p className="text-sm text-gray-500">新隐患上报时发送通知</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">审批通知</h3>
                      <p className="text-sm text-gray-500">审批流程状态变更时发送通知</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">巡检提醒</h3>
                      <p className="text-sm text-gray-500">定时任务到期前发送提醒</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">邮件通知</h3>
                      <p className="text-sm text-gray-500">通过邮件发送重要通知</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">安全设置</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="py-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">修改密码</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">当前密码</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">新密码</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">确认新密码</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                        更新密码
                      </button>
                    </div>
                  </div>
                  <div className="py-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">登录日志</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between py-2 bg-gray-50 rounded px-3">
                        <span>2024-01-15 09:30:12 - Windows / Chrome</span>
                        <span className="text-emerald-600">当前登录</span>
                      </div>
                      <div className="flex justify-between py-2 px-3">
                        <span>2024-01-14 18:22:05 - Windows / Chrome</span>
                        <span className="text-gray-400">已退出</span>
                      </div>
                      <div className="flex justify-between py-2 px-3">
                        <span>2024-01-14 08:45:33 - Windows / Chrome</span>
                        <span className="text-gray-400">已退出</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
