export interface Opportunity {
	id: string;
	title: string;
	agency: string;
	type: "Internship" | "Scholarship" | "Entry-Level" | "Career Hub";
	location: string;
	clearance: string;
	deadline: string
	description: string;
	applyUrl: string;
}

export const STATIC_OPPORTUNITIES: Opportunity[] = [
  // Active Specific Programs & Scholarships
  {
    id: "cia-student-internship-883860200",
    title: "CIA Student Internship Program",
    agency: "CIA",
    type: "Internship",
    location: "Washington, D.C.",
    clearance: "TS/SCI w/ Polygraph (Sponsored)",
    deadline: "January 31, 2027",
    description:
      "Paid 12-week full-time internships across Analysis, STEM, Data Science, and Finance for full-time students (3.0+ GPA, travel reimbursed).",
    applyUrl: "https://www.usajobs.gov/job/883860200",
  },
  {
    id: "cia-stokes-scholarship",
    title: "CIA Stokes Educational Scholarship Program",
    agency: "CIA",
    type: "Scholarship",
    location: "Washington, D.C. Metro Area",
    clearance: "U.S. Citizen · Clearance Eligible",
    deadline: "Annual Cycle",
    description:
      "Tuition assistance, year-round salary, and paid summer internships for undergraduate students with financial need in exchange for post-graduation service.",
    applyUrl: "https://www.cia.gov/careers/student-programs/",
  },
  {
    id: "ic-careers-portal",
    title: "Intelligence Community Job Board (IC-Wide)",
    agency: "ODNI / IC-Wide",
    type: "Career Hub",
    location: "Washington, D.C. / Nationwide",
    clearance: "Varies (Clearance Eligible)",
    deadline: "Rolling / Portal",
    description:
      "Shared Intelligence Community hiring portal covering active student, entry-level, and full-time openings across ODNI, NSA, DIA, NGA, NRO, Army, Marine Corps, and partner agencies.",
    applyUrl: "https://apply.intelligencecareers.gov/job-listings",
  },
  {
    id: "cia-student-programs-hub",
    title: "CIA Student Programs & Internships",
    agency: "CIA",
    type: "Career Hub",
    location: "Washington, D.C. Metro Area",
    clearance: "TS/SCI w/ Polygraph (Sponsored)",
    deadline: "Rolling / Annual Cycles",
    description:
      "Central hub for paid CIA undergraduate and graduate internships, co-op tours, and scholarship programs across analysis, operations, STEM, and mission support.",
    applyUrl: "https://www.cia.gov/careers/student-programs/",
  },
  {
    id: "fbi-students-and-graduates",
    title: "FBI Students & Graduates Careers",
    agency: "FBI",
    type: "Career Hub",
    location: "New York, NY / Washington, D.C. / Nationwide",
    clearance: "Top Secret (Sponsored)",
    deadline: "Rolling / Annual Cycles",
    description:
      "Official FBI portal for the paid Honors Internship Program, Collegiate Hiring Initiative, and entry-level roles alongside Special Agents, Intelligence Analysts, and cyber specialists.",
    applyUrl: "https://www.fbijobs.gov/students-and-graduates",
  },
  {
    id: "nsa-student-programs",
    title: "NSA Student Programs & Internships",
    agency: "NSA",
    type: "Career Hub",
    location: "Fort Meade, MD / Field Sites",
    clearance: "TS/SCI w/ Polygraph (Sponsored)",
    deadline: "Annual Fall / Spring Cycles",
    description:
      "Paid summer internships, co-op programs, and fellowships for undergrad and grad students in cybersecurity, computer science, engineering, math, intelligence analysis, and mission support.",
    applyUrl: "https://www.nsa.gov/Careers/Student-Programs/",
  },
  {
    id: "dia-internships",
    title: "DIA Student Programs & Internships",
    agency: "DIA",
    type: "Career Hub",
    location: "Washington, D.C. / Worldwide",
    clearance: "TS/SCI (Sponsored)",
    deadline: "Rolling / Hiring Events",
    description:
      "Explore Defense Intelligence Agency internships, STEM practicums, and entry-level military intelligence pathways supporting defense policymakers and warfighters.",
    applyUrl: "https://www.dia.mil/Careers/Internships/",
  },
  {
    id: "nga-student-opportunities",
    title: "NGA Student Opportunities & Internships",
    agency: "NGA",
    type: "Career Hub",
    location: "Springfield, VA / St. Louis, MO",
    clearance: "TS/SCI (Sponsored)",
    deadline: "Annual Fall Cycle",
    description:
      "Paid geospatial intelligence (GEOINT) internships and scholarship programs for undergraduate and graduate students with potential conversion to full-time employment.",
    applyUrl: "https://www.nga.mil/careers/Student_Opportunities.html",
  },
  {
    id: "nro-student-programs",
    title: "NRO Student Programs & Internships",
    agency: "NRO",
    type: "Career Hub",
    location: "Chantilly, VA / Ground Stations",
    clearance: "TS/SCI w/ Polygraph (Sponsored)",
    deadline: "Annual Cycle",
    description:
      "Paid 10-week undergraduate and graduate internships and SMART scholarship pathways supporting national overhead reconnaissance systems and space intelligence.",
    applyUrl: "https://www.nro.gov/careers/student-programs/",
  },
  {
    id: "dhs-ia-internship",
    title: "DHS Office of Intelligence & Analysis (I&A) Internships",
    agency: "DHS / I&A",
    type: "Career Hub",
    location: "Washington, D.C.",
    clearance: "TS/SCI (Sponsored)",
    deadline: "Annual Cycle (via USAJOBS)",
    description:
      "Paid federal student internships across counterterrorism, cyber threats, open-source collection, data science, and homeland security intelligence analysis.",
    applyUrl: "https://www.dhs.gov/homeland-security-careers/office-intelligence-and-analysis-internship-program",
  },
  {
    id: "state-inr-student-internship",
    title: "U.S. Department of State Student Internship Program (INR)",
    agency: "State Dept. / INR",
    type: "Career Hub",
    location: "Washington, D.C. / Worldwide",
    clearance: "Secret to TS/SCI (Varies by Bureau)",
    deadline: "Annual Cycles",
    description:
      "Department-wide paid student internship portal—select the Bureau of Intelligence and Research (INR) as your host bureau to support foreign policy intelligence analysis.",
    applyUrl: "https://careers.state.gov/interns-fellows/student-internship-program/",
  },
  {
    id: "treasury-tfi-careers",
    title: "Treasury Office of Intelligence & Analysis (OIA / TFI) Careers",
    agency: "Treasury / OIA",
    type: "Career Hub",
    location: "Washington, D.C.",
    clearance: "Varies (Clearance Eligible)",
    deadline: "Rolling / Portal",
    description:
      "National security and financial intelligence careers within Treasury's Office of Terrorism and Financial Intelligence (OIA, OFAC, TFFC, and FinCEN).",
    applyUrl: "https://home.treasury.gov/about/offices/terrorism-and-financial-intelligence/careers-at-tfi",
  },
  {
    id: "doe-in-student-opportunities",
    title: "DOE Office of Intelligence & Counterintelligence (IN) Students",
    agency: "Energy / DOE-IN",
    type: "Career Hub",
    location: "Washington, D.C. / National Labs",
    clearance: "Varies (Clearance Eligible)",
    deadline: "Rolling / Annual Cycles",
    description:
      "Student fellowships and the DOE-IN Scholars Program covering energy security, nuclear nonproliferation, science, engineering, technology, and intelligence policy.",
    applyUrl: "https://www.energy.gov/intelligence/student-opportunities-office-intelligence-and-counterintelligence",
  },
  {
    id: "dea-student-entry-careers",
    title: "DEA Student & Entry-Level Careers (ONSI)",
    agency: "DEA",
    type: "Career Hub",
    location: "Nationwide / Washington, D.C.",
    clearance: "Varies (Clearance Eligible)",
    deadline: "Rolling / Portal",
    description:
      "Pathways internships, Recent Graduates openings, and Student Volunteer Service supporting DEA intelligence research and counter-narcotics missions.",
    applyUrl: "https://www.dea.gov/careers/entry-level-careers",
  },
  {
    id: "oni-intern-programs",
    title: "Office of Naval Intelligence (ONI) Intern Programs",
    agency: "U.S. Navy / ONI",
    type: "Career Hub",
    location: "Suitland, MD (D.C. Metro Area)",
    clearance: "TS/SCI (Sponsored)",
    deadline: "Annual Spring Cycle",
    description:
      "Summer maritime intelligence internships for students in political science, engineering, science, and IT at the National Maritime Intelligence Center.",
    applyUrl: "https://www.oni.navy.mil/careers/intern-programs/",
  },
  {
    id: "afcs-intel-students",
    title: "Air Force Civilian Service — Intelligence Internships (PCIP)",
    agency: "U.S. Air Force / ISR",
    type: "Career Hub",
    location: "Nationwide",
    clearance: "Varies (Clearance Eligible)",
    deadline: "Annual Fall Cycle",
    description:
      "Paid Premier College Intern Program (PCIP) and PALACE ACQUIRE pathways for undergraduate and graduate students training as civilian Intelligence Analysts.",
    applyUrl: "https://afciviliancareers.com/students-and-graduates/",
  },
  {
    id: "ussf-intel-students",
    title: "U.S. Space Force Intelligence — Students & Internships",
    agency: "U.S. Space Force",
    type: "Career Hub",
    location: "Nationwide",
    clearance: "Varies (Clearance Eligible)",
    deadline: "Rolling / Portal",
    description:
      "Civilian intelligence, aerospace, and technical student pathways supporting Space Force strategic and operational space-domain intelligence.",
    applyUrl: "https://www.intelligencecareers.gov/ussf/students-and-internships",
  },
];

export function isActiveOpportunity(opp: Opportunity): boolean {
	const parsed = Date.parse(opp.deadline);
	if (Number.isNaN(parsed)) return true; // Keep opportunities with non-date deadlines
	return parsed + 86_400_000 >= Date.now();
}