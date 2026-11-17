"use client";

import { useState } from "react";
import { Search, ExternalLink, MapPin, Shield, Calendar } from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  agency: string;
  type: "Internship" | "Scholarship" | "Fellowship" | "Entry-Level";
  location: string;
  clearance: string;
  deadline: string;
  description: string;
  applyUrl: string;
}

const PLACEHOLDER_OPPORTUNITIES: Opportunity[] = [
  {
    id: "cia-undergrad-internship",
    title: "Undergraduate Internship Program (Analysis & Operations)",
    agency: "CIA",
    type: "Internship",
    location: "Washington, D.C. Metro Area",
    clearance: "TS/SCI (Sponsored)",
    deadline: "Rolling / Annual Cycle",
    description:
      "Paid summer and semester internships for full-time undergraduate students interested in intelligence analysis, clandestine operations, STEM, and mission support.",
    applyUrl: "https://www.cia.gov/careers/student-programs/",
  },
  {
    id: "nsa-stokes-scholarship",
    title: "Stokes Educational Scholarship Program",
    agency: "NSA",
    type: "Scholarship",
    location: "Fort Meade, MD",
    clearance: "TS/SCI w/ Polygraph (Sponsored)",
    deadline: "Annual Fall Cycle",
    description:
      "Up to $30,000/year in tuition assistance plus year-round salary and guaranteed summer internships for computer science and engineering students.",
    applyUrl: "https://www.intelligencecareers.gov/nsa/students-and-internships",
  },
  {
    id: "fbi-honors-internship",
    title: "FBI Honors Internship Program",
    agency: "FBI",
    type: "Internship",
    location: "New York, NY / Washington, D.C.",
    clearance: "Top Secret (Sponsored)",
    deadline: "Annual Fall Cycle",
    description:
      "10-week paid summer internship placing undergraduate and graduate students alongside Special Agents, Intelligence Analysts, and cyber specialists.",
    applyUrl: "https://fbijobs.gov/students-and-graduates",
  },
  {
    id: "dhs-intelligence-internship",
    title: "Office of Intelligence & Analysis (I&A) Student Internship",
    agency: "DHS",
    type: "Internship",
    location: "Washington, D.C. / Hybrid",
    clearance: "Secret / Top Secret (Sponsored)",
    deadline: "Open via USAJOBS",
    description:
      "Support homeland security intelligence production, counterterrorism analysis, and state/local fusion center coordination.",
    applyUrl: "https://www.usajobs.gov/",
  },
  {
    id: "ic-scholars-program",
    title: "IC Centers for Academic Excellence (IC CAE) Scholars",
    agency: "ODNI",
    type: "Fellowship",
    location: "Nationwide / CUNY Eligible",
    clearance: "None Required to Apply",
    deadline: "Semester-Based",
    description:
      "Research stipends, national security colloquia, and direct agency recruiting access designed to diversify the U.S. Intelligence Community workforce.",
    applyUrl: "https://www.intelligencecareers.gov/",
  },
  {
    id: "dia-entry-analyst",
    title: "All-Source Intelligence Analyst (Entry-Level)",
    agency: "DIA",
    type: "Entry-Level",
    location: "Joint Base Anacostia-Bolling, D.C.",
    clearance: "TS/SCI (Sponsored)",
    deadline: "Rolling",
    description:
      "Produce strategic and operational defense intelligence assessments for senior policymakers and military commanders.",
    applyUrl: "https://www.dia.mil/Careers/",
  },
];

const CATEGORIES = ["All", "Internship", "Scholarship", "Fellowship", "Entry-Level"] as const;

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredOpportunities = PLACEHOLDER_OPPORTUNITIES.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.type === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.agency.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-blue-500">Opportunities</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Curated internships, scholarships, and entry-level pathways across the
            18 U.S. Intelligence Community agencies for CUNY students.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by agency, role, or location..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-gray-900 border border-gray-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-900 text-gray-300 border border-gray-800 hover:border-blue-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center text-gray-400">
            No matching opportunities found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-gray-900 border border-gray-800 hover:border-blue-500 rounded-xl p-6 shadow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {opp.agency}
                    </span>
                    <span className="text-xs font-medium text-gray-400 bg-gray-950 px-3 py-1 rounded-full border border-gray-800">
                      {opp.type}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2">
                    {opp.title}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">
                    {opp.description}
                  </p>
                </div>

                <div>
                  <div className="space-y-2 text-xs text-gray-400 border-t border-gray-800 pt-4 mb-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{opp.clearance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{opp.deadline}</span>
                    </div>
                  </div>

                  <a
                    href={opp.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition"
                  >
                    View Program Details
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}