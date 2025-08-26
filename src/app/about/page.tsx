// src/app/about/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-pink-50 text-gray-800 min-h-screen font-sans">
      <section className="py-16 px-6 text-center">
        <Link href="/">
          <h1 className="text-5xl font-bold text-blue-700 mb-4 cursor-pointer hover:underline">Dabble</h1>
        </Link>

        <div className="mt-4">
          <a
            href="#join-studio"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded"
          >
            Join as a Studio
          </a>
        </div>

        <p className="text-lg max-w-3xl mx-auto text-gray-700 mt-6">
          Dabble helps curious Londoners explore new hobbies and activities — from pottery to improv —
          through a simple, flexible membership.
        </p>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">What We Do</h2>
          <p className="text-gray-700 text-lg">
            We partner with creative, community-led studios across London to bring you inspiring,
            hands-on classes. Whether you're looking to try something completely new or pick up an
            old passion, Dabble makes it easy to say &quot;yes&quot; to new experiences while meeting
            like-minded people who share your interests.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Dabble exists to help people find joy through creativity, movement, and real-life
            connection. We believe in creating spaces where people can pursue their passions, meet
            others who share their curiosity, and build genuine communities offline.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">What’s In It For London’s Studios?</h2>
          <p className="text-gray-700 text-lg">
            Dabble helps studios fill empty spots in their classes by connecting them with a wider
            audience of curious Londoners looking for new experiences. We bring you highly motivated
            customers who are ready to book, lowering your marketing costs and helping you maximise
            attendance. With Dabble, studios stay in full control of their schedule and pricing while
            gaining exposure to a growing community of locals eager to learn and connect.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">People Behind Dabble</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border border-gray-300">
              {/* Replace '/founder_pic.png' with your actual photo path in `public/` */}
              <Image src="/founder_pic.png" alt="Founder photo" fill style={{ objectFit: "cover" }} />
            </div>
            <p className="text-gray-700 text-lg">
              Hi! I am Tereza, a young Londoner who&apos;s always loved trying new things — from fitness
              classes to food pop-ups. I&apos;ve been using ClassPass for years and kept thinking:
              why isn&apos;t there something like this for hobbies? Dabble was born out of that idea. I
              wanted a way for people to try creative classes, meet others in real life, and fill their
              free time with meaningful, joyful experiences. I hope Dabble helps you discover something
              new and connect with people who share your passions.
              <br />
              <a
                href="https://www.linkedin.com/in/tereza-rusov%C3%A1-838481b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                Connect with me on LinkedIn
              </a>
            </p>
          </div>
        </div>

        <div id="join-studio">
          <h2 className="text-3xl font-semibold text-pink-600 mb-4">Join as a Studio</h2>
          <p className="text-gray-700 text-lg mb-4">
            Are you a local studio, workshop or independent teacher? We'd love to feature your classes on
            Dabble. Fill out the form below and we’ll be in touch.
          </p>

          <form action="https://formspree.io/f/mzzgglav" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="business-name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tell us a bit about your classes</label>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
