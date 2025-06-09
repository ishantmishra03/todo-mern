import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <a href="" className="flex justify-center mb-6">
            <span className="text-3xl font-bold text-orange-600">Todo</span>
          </a>

          <ul className="flex flex-col md:flex-row gap-6 justify-center items-center text-slate-700 text-md md:text-base border-b border-slate-200 pb-8 mb-8">
            <li>
              <a href="" className="hover:text-orange-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="" className="hover:text-orange-500 transition">
                Features
              </a>
            </li>
            <li>
              <a href="" className="hover:text-orange-500 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="" className="hover:text-orange-500 transition">
                About
              </a>
            </li>
            <li>
              <a href="" className="hover:text-orange-500 transition">
                Contact
              </a>
            </li>
          </ul>

          <p className="text-md text-slate-500 mt-8">
            &copy; {new Date().getFullYear()} Todo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
