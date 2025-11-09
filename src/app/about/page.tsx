"use client";

import Link from "next/link";
import Image from "next/image";
import { JSX } from "react";

export default function AboutPage(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-pink-50 text-gray-800 min-h-screen font-sans">
      <section className="py-16 px-6 text-center">
        <Link href="/">
          <h1 className="text-5xl font-bold text-blue-700 mb-4 cursor-pointer hover:underline">Dabblr</h1>
        </Link>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Dabblr helps curious Londoners explore new hobbies and activities — from pottery to improv.
        </p>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">What We Do</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We partner with creative, community-led studios across London to bring inspiring, hands-on classes to curious locals. Whether someone is trying something completely new or reconnecting with a hobby, Dabblr makes it easy to say yes to new experiences and meet like-minded people in real life.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dabblr exists to help people find joy through creativity, movement, and real-world connection. We aim to create spaces where people can pursue passions, meet others who share curiosity, and build genuine communities offline.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">What is In It For London Studios</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Dabblr helps studios fill empty spots by connecting them to a wider audience of motivated locals who are ready to book. We reduce marketing overhead, help increase attendance, and let you keep control of schedule and pricing while gaining exposure to a growing community.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">People Behind Dabblr</h2>

          {/* Founder block: image left, text right */}
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border border-gray-300 flex-shrink-0 shadow-sm">
              {/* use fill so the image covers the circle properly */}
              <Image
                src="/founder_pic.png"
                alt="Tereza, founder of Dabblr"
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="text-gray-700 text-lg leading-relaxed">
                Hi, I am Tereza. I love trying new things — from fitness classes to food pop-ups. I used ClassPass for years and kept thinking there should be something like it for hobbies. Dabblr came from that idea. I wanted a way for people to try creative classes, meet others in real life, and fill free time with meaningful, joyful experiences. I hope Dabblr helps you discover something new and connect with people who share your passions.
              </p>

              <a
                href="https://www.linkedin.com/in/tereza-rusova-838481b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-3 inline-block"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Keep the Join-as-a-studio text on the About page, but NOT the form */}
        <div id="join-studio-summary">
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">Join as a studio</h2>
          <p className="text-gray-700 text-lg mb-4">
            Are you a local studio, workshop or independent teacher? We would love to feature your classes on Dabblr. During our MVP there is no listing fee and we will help promote your classes. If you want to sign up now, use the dedicated page at{" "}
            <Link href="/join-studio" className="text-blue-600 underline">Join as a studio</Link>{" "}
            to complete the short application form.
          </p>
        </div>
      </section>
    </div>
  );
}