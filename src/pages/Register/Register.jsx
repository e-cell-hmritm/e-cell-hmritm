
import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    interest: '',
  });
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1a2f] to-[#0a1a2f] flex flex-col items-center py-10 px-2">
      <h2 className="text-xl md:text-2xl font-semibold text-blue-400 mb-1 mt-2 text-center">Register now to be part of our entrepreneurial ecosystem</h2>
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center mt-6">
        {/* Registration Form */}
        <div className="flex-1 bg-[#0a1a2f] rounded-2xl shadow-lg p-8 min-w-[320px] max-w-xl">
          <h3 className="text-lg font-semibold text-blue-200 mb-6">Registration Form</h3>
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-blue-200 font-semibold mb-1 flex items-center gap-2">
                <span className="material-icons text-base align-middle">person</span> Full Name *
              </label>
              <input type="text" className="w-full p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#101c2c] text-white" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            {/* Email */}
            <div>
              <label className="block text-blue-200 font-semibold mb-1 flex items-center gap-2">
                <span className="material-icons text-base align-middle">email</span> Email *
              </label>
              <input type="email" className="w-full p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#101c2c] text-white" placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-blue-200 font-semibold mb-1 flex items-center gap-2">
                <span className="material-icons text-base align-middle">phone</span> Phone Number *
              </label>
              <input type="tel" className="w-full p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#101c2c] text-white" placeholder="+91 98765-43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            {/* College/University */}
            <div>
              <label className="block text-blue-200 font-semibold mb-1 flex items-center gap-2">
                <span className="material-icons text-base align-middle">school</span> College/University *
              </label>
              <input type="text" className="w-full p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#101c2c] text-white" placeholder="Your College Name" value={form.college} onChange={e => setForm({ ...form, college: e.target.value })} />
            </div>
            {/* Year of Study */}
            <div>
              <label className="block text-blue-200 font-semibold mb-1 flex items-center gap-2">
                <span className="material-icons text-base align-middle">calendar_today</span> Year of Study *
              </label>
              <select className="w-full p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#101c2c] text-white" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            {/* Areas of Interest */}
            <div>
              <label className="block text-blue-200 font-semibold mb-1">Areas of Interest</label>
              <textarea className="w-full p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#101c2c] text-white" rows={3} placeholder="Tell us about your interests in entrepreneurship..." value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} />
            </div>
            <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 text-white font-bold py-3 rounded-lg text-lg shadow-lg transition">Register Now</button>
          </form>
        </div>
        {/* Alternative Google Form */}
        <div className="flex-1 bg-[#0a1a2f] rounded-2xl shadow-lg p-8 min-w-[320px] max-w-xl flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-blue-200 mb-6">Alternative: Google Form</h3>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex flex-col items-center justify-center py-8 mb-2">
              <span className="material-icons text-5xl text-blue-400 mb-2">account_circle</span>
              <span className="text-blue-200 font-medium">Embedded Google Form for registration</span>
            </div>
            <a href="https://forms.gle/your-google-form-link" target="_blank" rel="noopener noreferrer" className="w-full">
              <button className="w-full border-2 border-blue-500 text-blue-300 font-bold py-3 rounded-lg text-lg transition hover:bg-blue-900">Open Google Form</button>
            </a>
          </div>
          <div className="bg-[#101c2c] rounded-xl p-5 mt-2">
            <h4 className="font-bold text-blue-200 mb-2 text-base">Why Register?</h4>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>✓ Access to exclusive events and workshops</li>
              <li>✓ Networking with entrepreneurs and investors</li>
              <li>✓ Mentorship opportunities</li>
              <li>✓ Resources for startup development</li>
              <li>✓ Priority ticket booking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
