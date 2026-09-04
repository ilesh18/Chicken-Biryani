"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { GraduationCap, Briefcase, Shield } from "lucide-react";

export default function SelectRolePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <Logo className="h-14 w-14" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Select Your Profile
          </h1>
          <p className="mt-2 text-base text-foreground-muted">
            Choose how you would like to sign in to Campus Hub
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 py-6">
          {/* Student Circle */}
          <Link
            href="/login?role=student"
            className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-accent/20 bg-surface shadow-lg transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-2xl group-hover:ring-8 group-hover:ring-accent/15">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <GraduationCap className="h-12 w-12" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Student
              </span>
              <p className="text-xs text-foreground-muted mt-1">Student Portal & Courses</p>
            </div>
          </Link>

          {/* Faculty Circle */}
          <Link
            href="/login?role=faculty"
            className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-accent/20 bg-surface shadow-lg transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-2xl group-hover:ring-8 group-hover:ring-accent/15">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Briefcase className="h-12 w-12" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Faculty
              </span>
              <p className="text-xs text-foreground-muted mt-1">Faculty Portal & Approvals</p>
            </div>
          </Link>

          {/* Admin Circle */}
          <Link
            href="/login?role=admin"
            className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-accent/20 bg-surface shadow-lg transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-2xl group-hover:ring-8 group-hover:ring-accent/15">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Admin
              </span>
              <p className="text-xs text-foreground-muted mt-1">Admin Dashboard & Controls</p>
            </div>
          </Link>
        </div>

        <p className="text-xs text-foreground-muted">
          Need help? Return to{" "}
          <Link href="/" className="text-accent hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
