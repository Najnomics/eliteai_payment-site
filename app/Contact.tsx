"use client";
import { CircleHelp } from "lucide-react";
import type { SVGProps } from "react";
import React, { useState } from "react";

function Contact() {
  const [showButtons, setShowButtons] = useState(false);
  return (
    <div className="fixed bottom-10 right-10 z-20 flex flex-col gap-y-4">
      {showButtons && (
        <div className="flex gap-x-4">
          <a href="https://wa.me/2349058522159">
            <button className="flex items-center justify-center font-semibold bg-white rounded-full h-[2.7rem] w-[2.7rem]">
              <LogosWhatsappIcon />
            </button>
          </a>
          <a href="mailto:team@elitegloblinternships.com">
            <button className="flex items-center justify-center font-semibold bg-white rounded-full h-[3rem] w-[3rem]">
              <LogosGoogleGmail />
            </button>
          </a>
        </div>
      )}
      <button
        onClick={() => setShowButtons(!showButtons)}
        className="flex text-xs md:text-base items-center gap-x-2 font-semibold bg-white rounded-full p-2 md:p-4"
      >
        <CircleHelp /> Contact our support team.
      </button>
    </div>
  );
}

function LogosGoogleGmail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 256 193"
      {...props}
    >
      <path
        fill="#4285f4"
        d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
      ></path>
      <path
        fill="#34a853"
        d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
      ></path>
      <path
        fill="#ea4335"
        d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
      ></path>
      <path
        fill="#fbbc04"
        d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"
      ></path>
      <path
        fill="#c5221f"
        d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"
      ></path>
    </svg>
  );
}

function LogosWhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2.5rem"
      height="2.5rem"
      viewBox="0 0 256 258"
      {...props}
    >
      <defs>
        <linearGradient
          id="logosWhatsappIcon0"
          x1="50%"
          x2="50%"
          y1="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#1faf38"></stop>
          <stop offset="100%" stopColor="#60d669"></stop>
        </linearGradient>
        <linearGradient
          id="logosWhatsappIcon1"
          x1="50%"
          x2="50%"
          y1="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#f9f9f9"></stop>
          <stop offset="100%" stopColor="#fff"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#logosWhatsappIcon0)"
        d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
      ></path>
      <path
        fill="url(#logosWhatsappIcon1)"
        d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
      ></path>
      <path
        fill="#fff"
        d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
      ></path>
    </svg>
  );
}

export default Contact;
