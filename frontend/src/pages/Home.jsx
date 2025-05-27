import React, { useState } from 'react';
import { Search, Star, Calendar, MessageSquare, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';
import SignupPage from './Signup';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [email, setEmail] = useState('');

  // Calendar data for March 2023
  const calendarDays = [
    // Week 1
    { day: '', isCurrentMonth: false }, { day: '', isCurrentMonth: false }, { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true },
    // Week 2
    { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true, event: { title: "Meeting with Marty", color: "bg-cyan-200" } }, { day: 12, isCurrentMonth: true },
    // Week 3
    { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true }, { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true, event: { title: "Joe's Birthday", color: "bg-green-200" } }, { day: 19, isCurrentMonth: true },
    // Week 4
    { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true }, { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true, event: { title: "Doctor's appointment", color: "bg-red-200" } },
    // Week 5
    { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const logos = [
    { name: 'Brother', width: 'w-20' },
    { name: 'Microsoft', width: 'w-24' },
    { name: 'Samsung', width: 'w-20' },
    { name: "L'Oréal", width: 'w-20' },
    { name: 'Disney', width: 'w-20' },
    { name: 'Toyota', width: 'w-20' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 relative z-10">
        <div className="text-2xl font-bold">TASKMAN</div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-purple-200 transition-colors">Features</a>
          <a href="#" className="hover:text-purple-200 transition-colors">Teams</a>
          <a href="#" className="hover:text-purple-200 transition-colors">About</a>
          <a href="#" className="hover:text-purple-200 transition-colors">Pricing</a>
          <a href='/login' className="hover:text-purple-200 transition-colors">Login</a>
          <Link to="/signup">
            <button className="bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
            Get Started
            </button>
          </Link>
          
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-between px-8 py-12 relative">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-6xl font-bold leading-tight mb-8">
            More than just<br />
            <span className="text-white">a to-do list.</span>
          </h1>
          
          <p className="text-xl text-purple-100 mb-12 leading-relaxed max-w-lg">
            Save time and get more done with hundreds of powerful tools that can be customized for any work need, all in one place.
          </p>

          {/* Email Signup */}
          <div className="flex items-center space-x-4 mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900/50 border border-gray-600 rounded-lg px-6 py-4 text-white placeholder-gray-400 w-80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Content - App Interface */}
        <div className="flex-1 relative max-w-3xl">
          {/* Sidebar */}
          <div className="absolute left-0 top-0 w-16 h-96 bg-gray-900 rounded-l-2xl shadow-2xl z-20">
            <div className="flex flex-col items-center py-6 space-y-6">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Calendar className="w-4 h-4 text-gray-300" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <MessageSquare className="w-4 h-4 text-gray-300" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Settings className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>

          {/* Main Calendar Interface */}
          <div className="ml-16 bg-white rounded-2xl shadow-2xl p-8 text-gray-800 relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search"
                  className="bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full -ml-2"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full -ml-2"></div>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 mb-6">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Month
              </button>
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Week
              </button>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">March 2025</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map((day, index) => (
                <div key={index} className="p-3 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div key={index} className="h-20 p-2 hover:bg-gray-50 transition-colors relative">
                  {day.day && (
                    <>
                      <div className={`text-sm ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}>
                        {day.day}
                      </div>
                      {day.event && (
                        <div className={`${day.event.color} rounded-md p-1 mt-1 text-xs font-medium text-gray-700 truncate`}>
                          {day.event.title}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="px-8 py-16 text-center">
        <h3 className="text-lg text-purple-200 mb-12">Trusted by</h3>
        <div className="flex items-center justify-center space-x-16 opacity-60">
          {logos.map((logo, index) => (
            <div key={index} className={`${logo.width} h-8 bg-gray-400 rounded opacity-50 hover:opacity-70 transition-opacity`}>
              {/* Logo placeholders */}
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default HomePage;