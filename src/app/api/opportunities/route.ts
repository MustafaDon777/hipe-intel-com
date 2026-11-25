// src/app/api/opportunities/route.ts
import { NextResponse } from "next/server";
import { isActiveOpportunity, type Opportunity } from "@/app/opportunities/data";

const IC_AGENCY_REGEX =
	/\b(intelligence|cia|nsa|fbi|dia|nga|nro|odni|homeland security|customs and border|secret service|cisa|state|treasury|energy|drug enforcement|defense|army|navy|air force|space force|marine corps|coast guard)\b/i;

const EXCLUDED_TITLE_REGEX =
	/\b(supervisory|senior|lead|chief|director|manager|executive)\b/i;

const EXCLUDED_TEXT_REGEX =
	/\b(previous military experience|prior military|active duty)\b/i;

function formatDeadline(isoDate?: string): string {
	if (!isoDate) return "See Posting";
	const parsed = new Date(isoDate);
	if (Number.isNaN(parsed.getTime())) return "See Posting";
	return parsed.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

function inferType(title: string, hiringPaths: string[] = []): Opportunity["type"] {
	const lower = title.toLowerCase();
	if (lower.includes("scholarship")) return "Scholarship";
	if (
		lower.includes("intern") ||
		lower.includes("student trainee") ||
		hiringPaths.includes("student")
	) {
		return "Internship";
	}
	return "Entry-Level";
}

export async function GET() {
	const apiKey = process.env.USAJOBS_API_KEY;
	const userAgent = process.env.USAJOBS_USER_AGENT;

	if (!apiKey || !userAgent) {
		console.warn("⚠️ USAJOBS_API_KEY or USAJOBS_USER_AGENT missing in .env.local");
		return NextResponse.json({ opportunities: [] });
	}

	try {
		const params = new URLSearchParams({
			JobCategoryCode: "0132;0134;0080;1541;1811",
			HiringPath: "student;graduates",
			PayGradeLow: "04",
			PayGradeHigh: "07",
			ResultsPerPage: "25",
			Fields: "Full",
		});

		const res = await fetch(
			`https://data.usajobs.gov/api/search?${params.toString()}`,
			{
				headers: {
					Host: "data.usajobs.gov",
					"User-Agent": userAgent,
					"Authorization-Key": apiKey,
				},
				next: { revalidate: 3600 }, // Cache for 1 hour
			}
		);

		if (!res.ok) {
			throw new Error(`USAJOBS returned ${res.status}`);
		}

		const data = await res.json();
		const items = data?.SearchResult?.SearchResultItems ?? [];

		const entryLevelItems = items.filter((item: any) => {
			const desc = item.MatchedObjectDescriptor ?? {};
			const details = desc.UserArea?.Details ?? {};
			const title = desc.PositionTitle || "";
			const orgText = `${desc.OrganizationName || ""} ${desc.DepartmentName || ""}`;
			const fullText = `${details.JobSummary || ""} ${desc.QualificationSummary || ""}`;

			const lowGrade = Number(details.LowGrade);
			const highGrade = Number(details.HighGrade);

			if (!IC_AGENCY_REGEX.test(orgText)) return false;
			if (EXCLUDED_TITLE_REGEX.test(title)) return false;
			if (EXCLUDED_TEXT_REGEX.test(fullText)) return false;
			if (!Number.isNaN(lowGrade) && lowGrade > 7) return false;
			if (!Number.isNaN(highGrade) && highGrade > 11) return false; 

			return true;
		});

		const mapped: Opportunity[] = entryLevelItems.map((item: any) => {
			const desc = item.MatchedObjectDescriptor ?? {};
			const details = desc.UserArea?.Details ?? {};
			const summary =
				details.JobSummary ||
				desc.PositionFormattedDescription?.[0]?.Content ||
				"View the official USAJOBS announcement for full qualifications and duties.";

			return {
				id: `usajobs-${item.MatchedObjectId}`,
				title: desc.PositionTitle || "Federal Intelligence Opportunity",
				agency: desc.OrganizationName || desc.DepartmentName || "U.S. Federal Agency",
				type: inferType(desc.PositionTitle || "", details.HiringPath),
				location: desc.PositionLocationDisplay || "Multiple Locations",
				clearance: details.SecurityClearance || "See Posting",
				deadline: formatDeadline(desc.ApplicationCloseDate),
				description: summary,
				applyUrl: (desc.PositionURI || "https://www.usajobs.gov/").replace(":443", ""),
			};
		});

		const active = mapped.filter(isActiveOpportunity);

		return NextResponse.json({
			opportunities: active,
			total: active.length,
		});
	} catch (err) {
		console.error("❌ USAJOBS fetch failed:", err);
		return NextResponse.json({ opportunities: [] }, { status: 200 });
	}
}