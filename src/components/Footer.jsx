import React from "react";

export default function Footer() {
  return (
    <footer className="text-slate-500 py-4 text-xs px-2 sm:px-4">
      <div className="flex">
        <div className="flex-1 sm:not-sr-only sr-only"></div>
        <div className="flex-1 flex sm:justify-center justify-start">
          Developed by
          <a href="mailto:vivekrp4503@gmail.com" target="_blank" className="pl-1">
            <u>Vivek Patil</u>
          </a>
        </div>
        <div className="flex-1 flex justify-end">
          <a href="https://github.com/vivekPatil45/" target="_blank" className="hover:underline px-4">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vivek-patil-76a563260/" target="_blank" className="hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
