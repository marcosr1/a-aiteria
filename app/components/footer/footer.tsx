"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-purple-100 py-4 flex flex-col items-center justify-center text-purple-800 text-sm mt-auto">
        <p className="text-xs text-purple-700 mb-2">
            <span className="font-semibold">Nos siga no Instagram!</span>
        </p>

      <div className="flex space-x-6 mb-2">
        <a
          href="https://www.instagram.com/im_perioacai/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-600 transition-colors"
        >
          <FaInstagram size={24} />
        </a>

        <a
          href="https://wa.me/5599999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-600 transition-colors"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>

      <p className="text-xs text-purple-700">
        © {new Date().getFullYear()} Criado por{" "}
        <span className="font-semibold">Marcos Richelly</span>
      </p>
    </footer>
  );
}
