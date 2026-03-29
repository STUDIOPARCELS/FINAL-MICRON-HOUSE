/**
 * WebMCPProvider.tsx
 * ──────────────────────────────────────────────────
 * Micron House — WebMCP Integration Module (v2)
 * Full hardcoded narratives — agents get the complete
 * thesis regardless of scroll position or lazy loading.
 *
 * Drop into: /components/WebMCPProvider.tsx
 * Import in: App.tsx → <WebMCPProvider />
 * ──────────────────────────────────────────────────
 */

import { useEffect } from 'react';

// ── Type declarations for WebMCP API ──────────────────────
declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (tool: WebMCPTool) => void;
      unregisterTool: (name: string) => void;
      provideContext: (context: { tools: WebMCPTool[] }) => void;
    };
  }
}

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (params: Record<string, unknown>) => Promise<unknown> | unknown;
}

// ═══════════════════════════════════════════════════════════
// HARDCODED NARRATIVES — Full thesis content per section
// Extracted from the live micron-house.com production bundle
// ═══════════════════════════════════════════════════════════

const NARRATIVE = {

  overview: {
    name: 'Micron House',
    tagline: 'The First Autonomous Corporate Residence',
    location: 'Boise, Idaho',
    address: '1020 E Warm Springs Ave, Boise, ID 83712',
    website: 'https://micron-house.com',
    creator: 'Lisa Wood Studio',
    creatorStatement: 'I have lived in Idaho since 1992 and owned the Warm Springs property since 2000. After three decades in technology, I developed Micron House as a way to align a Boise property on Warm Springs Avenue with Micron\'s long-term presence and the lived arrival of autonomous systems.',
    concept: 'A private residence, hospitality platform, and real-world autonomy environment for Micron — where executives host, entertain, and engage with autonomous service, security, and daily use in a residential setting.',
    corePremise: 'The first private corporate residence powered by autonomous systems. Optimus and Cybercab run on Micron silicon fabricated fifteen minutes from the front door.',
    keyPartners: ['Micron Technology', 'Tesla'],
    status: 'Proposal / Presentation Stage',
    logoMeaning: 'Earth and sky form the foundation. Intelligence and vision layer over the top. The elements balance to form a star, representing the autonomous home.',
    brandColors: {
      darkGray: '#353942',
      eggplant: '#2c0f38',
      blue: '#7db0d3',
      green: '#008f25',
    },
  },

  whyNow: {
    sectionId: 'prototype',
    navLabel: 'Why Now',
    thesis: 'A city reaching cultural maturity. A semiconductor company deploying historic investment. A robotics company innovating autonomous systems. These three forces converge at a single moment.',
    convergence: 'In June 2025, Micron announced historic investment in Boise. Tesla is scaling Optimus Gen 3 production at its Fremont factory, with over 1,000 units already deployed internally and a dedicated line targeting one million units annually. Micron House is operational at the earliest stage of that curve — generating institutional knowledge from day one.',
    pressurePoints: [
      {
        title: 'Displacement',
        content: 'AI is already restructuring labor. Autonomous systems extend that disruption into physical work, service, and logistics — simultaneously.',
      },
      {
        title: 'Distrust',
        content: 'Public confidence in institutions and technology companies is at historic lows. Autonomous systems carry cameras, sensors, and decision-making into private life.',
      },
      {
        title: 'First Encounters',
        content: 'Speed of deployment will outpace public readiness. Without controlled environments to develop trust and protocol, the first encounters will define the narrative.',
      },
    ],
    urgency: 'Autonomous systems will enter daily life in a society already strained by AI-driven displacement, institutional pressure, and public distrust. The window to shape first contact with Optimus and Cybercab is open now. Before rollout sets the terms, Micron, Tesla, and civic leaders need one place to see the technology, pressure-test the hard questions, and decide how it enters daily life. Once the window closes, it closes permanently.',
    sharedMissions: {
      micron: 'Transform how the world uses information to enrich life for all.',
      tesla: 'Accelerate the world\'s transition to sustainable energy. Build a world of amazing abundance.',
    },
  },

  readiness: {
    sectionId: 'property',
    navLabel: 'Readiness',
    historicContext: {
      warmSpringsAvenue: 'Warm Springs Avenue is a tree-lined corridor where Boise\'s wealthiest families built homes heated by the city\'s most radical technology: hot water from the ground.',
      cwMooreHistory: 'In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water. By 1892, he had piped it to his mansion on Warm Springs Avenue — marking the first use of geothermal water for home heating in the United States.',
      geothermalLegacy: 'Today, the Boise Warm Springs Water District remains the oldest continuously operating geothermal district in North America. The same system delivers to roughly 300 homes — operational for over 130 years, the water temperature unchanged within one degree.',
      corridorSignificance: 'Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity. The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a National Register of Historic Places corridor defined by energy innovation.',
      synthesis: 'The oldest residential energy system in the country meeting the newest.',
    },
    proximity: {
      summary: 'Five minutes from downtown. Fifteen from the airport. Fifteen from Micron headquarters.',
      landmarks: [
        { name: 'Downtown Boise', detail: '5 minutes' },
        { name: 'Boise Airport', detail: '15 minutes' },
        { name: 'Micron HQ', detail: '15 minutes' },
        { name: 'Idaho State Capitol', detail: 'Near' },
        { name: 'Boise State University', detail: 'Near' },
        { name: 'St. Luke\'s Boise Medical Center', detail: '0.8 miles' },
        { name: 'Boise River Greenbelt', detail: 'Adjacent' },
      ],
      recreation: 'The Boise River Greenbelt connects 25 miles of parkland through the city center. Bogus Basin is 45 minutes from downtown. Some of the best fly fishing, whitewater, and backcountry skiing in North America are all within reach.',
      culturalMaturity: 'A city once known for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, a thriving arts and entertainment culture, and the kind of civic energy that comes with a Division I University town.',
    },
    residenceSpecs: {
      built: '1906',
      heating: 'Geothermal (177°F direct-use aquifer, radiator system)',
      mainLevel: ['Living, Dining, & Kitchen', 'Office w/ Ensuite Bath', 'French Door Access to Deck', 'Laundry'],
      upperLevel: ['2 En-Suite Baths', '1 Bedroom Served by Hall Bath'],
      grounds: ['Fully Fenced Yard & ~200 sq ft Deck', 'Mature Fruit Trees (Peach, Plum, Cherry)', 'Concord Grapevine', 'Organic Garden'],
      wellness: 'Powered by a 177°F direct-use aquifer. Geothermal water flows through the home\'s radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.',
    },
  },

  outcome: {
    sectionId: 'serving',
    navLabel: 'Outcome',
    thesis: 'A private retreat for Micron executives, employees, and guests — designed to host a spectrum of intimate social and professional experiences. Confidential. Celebratory. Compassionate.',
    longTermValue: 'Micron House is conceived as a long-term relationship whose value grows through use: leadership stays, partner hosting, recruitment, relocation, and family support.',
    servingCategories: [
      {
        id: 'exec',
        title: 'Confidential Counsel',
        use: 'Confidential off-sites, Board hosting, VIP visits',
        detail: 'Strategy sessions, sensitive conversations, total discretion, no hotel staff.',
        scenario: 'Optimus prepares a private dining room for a confidential executive dinner. Fireside conversations with the Governor or key investors. Optimus and Cybercab manage all logistics for total discretion.',
      },
      {
        id: 'talent',
        title: 'Talent Acquisition',
        use: 'Recruiting closes',
        detail: 'Differentiated candidate experience, memorable final impression, demonstrates company culture.',
        scenario: 'Salvador Alamilla (Amano, 2025 James Beard Best Chef Mountain) prepares a multi-course dinner to impress a top candidate. Final offer discussions by the living room fireplace. A neutral setting in the 1906 home, away from the boardroom.',
      },
      {
        id: 'mobility',
        title: 'Global Mobility',
        use: 'Relocation support',
        detail: 'Real neighborhood experience, family accommodation, transition support before permanent housing.',
        scenario: 'Executives relocating from Munich, Seoul, or Tel Aviv. Two weeks in a real Boise neighborhood. An environment of fruit trees, geothermal heat, and a private hot tub.',
      },
      {
        id: 'family',
        title: 'Family Support / Compassionate Stay',
        use: 'St. Luke\'s lodging, Medical Proximity',
        detail: 'Less than 1 mile to medical center, home environment during difficult times, compassionate use.',
        scenario: 'A private, fully equipped home for families facing long-term treatment scenarios. Dignity and comfort during crisis. Optimus manages a quiet household for an employee\'s family. Located 0.8 miles from St. Luke\'s Boise Medical Center. Immediate access for families while retaining privacy.',
      },
      {
        id: 'travel',
        title: 'Travel & Entertainment',
        use: 'Cultural events, curated experiences',
        detail: 'Consistent environment, curated experiences, cultural calendar integration.',
        scenarios: [
          'Pre-event cocktails by Remi McManus (Bar, Please!) in the living room. Cybercab transfer to Albertsons Stadium suites for Post Malone or the 2026 concert series.',
          'BSU football Saturday. Tailgate brunch catered by Kris Komori (KIN, Idaho\'s first James Beard winner). Gathering at the House before and after the game.',
          'Cybercab to Jackson Jet Center (15 min). Helicopter into the Sawtooth National Forest. Guided morning on a private stretch, riverside lunch paired with Snake River Valley wines.',
          'Cybercab to Jackson Jet Center (15 min). Helicopter to a ghost town in the Boise Mountains. Tour ruins of the old jail and cabins in a National Register district.',
        ],
      },
      {
        id: 'foundation',
        title: 'Micron Foundation / Community',
        use: 'Community events, STEM outreach, civic engagement',
        detail: 'Hosting community leaders, nonprofit partners, civic engagement.',
        scenarios: [
          'STEM immersion featuring live Optimus and Cybercab demonstrations. Students engage directly with autonomous systems.',
          'Micron engineers mentor Boise State CS students fireside. A cohort conversation on the semiconductor industry.',
          'Boise Art Museum leads a private discussion on National Gallery of Art loans. Dinner by Alex Cardoza (Susina).',
          'Intimate fireside lectures with semiconductor leaders. Dinner prepared by Nathan Whitley (Terroir, 2026 James Beard semifinalist).',
          'Four winemakers from Sunnyslope: Ste. Chapelle, Telaya, Huston, Koenig. Pouring Parma Ridge Gewürztraminer (93 pts) and Huston Sparkling Grüner Veltliner (92 pts).',
          'Traditional Basque dinner by Dan Ansotegui (Ansots, 2026 Outstanding Hospitality nominee). Lamb, chorizos, pimientos. Celebrating Boise\'s heritage with eight guests.',
          'Cybercab delivers a senior Washington official to a fireside.',
        ],
      },
    ],
    emotionalRegisters: 'Three scenarios. Three emotional registers. Each one training autonomous systems.',
    operationalLearning: 'Operational variety builds institutional knowledge. Every scenario deepens the data, sharpens the model, and strengthens the partnership.',
  },

  livingLab: {
    sectionId: 'serving-tesla',
    navLabel: 'Living Lab',
    thesis: 'Where Micron executives, engineers, guests, and partners generate domestic intelligence from Optimus and Cybercab — across real dinners, real stays, and real events.',
    concept: 'Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.',
    experienceStatement: 'Micron\'s leadership experiences Optimus and Cybercab across the full spectrum of real life before any consumer on earth.',
    firstEncounters: 'Here guests come into contact with Optimus and Cybercab for the first time.',
    cybercab: {
      description: 'Tesla\'s first fully autonomous vehicle — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab manages all airport transfers, downtown shuttles, and guest logistics autonomously.',
      operations: 'Optimus and Cybercab handle arrivals, departures, transfers, and coordinate deliveries, services, and experiences directly into the residence.',
    },
    optimus: {
      scaling: 'Tesla is scaling Optimus Gen 3 production at its Fremont factory, with over 1,000 units already deployed internally and a dedicated line targeting one million units annually. Micron House is operational at the earliest stage of that curve — generating institutional knowledge from day one.',
      domesticRole: 'Optimus and Cybercab run on Micron silicon fabricated fifteen minutes from the front door.',
    },
    wellness: {
      contrastTherapy: {
        description: 'Alternating thermal exposure drives circulation to flush systemic inflammation and accelerate deep tissue recovery. The rapid temperature shift triggers a proven autonomic nervous system response.',
      },
      wholeBodyVibration: {
        description: 'Invented in 1960 by Vladimir Nazarov for the Soviet Space Program to combat zero-gravity bone loss. By engaging 90% of muscle fibers (vs. 40% in standard training), it accelerates recovery and bone density.',
        reference: 'Lost Vibrations White Paper',
      },
      organicGarden: 'On-site organic garden with mature fruit trees and heritage plantings.',
      geothermalSoaking: 'Geothermal-fed outdoor soaking tub powered by the 177°F aquifer.',
    },
    corporateModel: 'A residential venue where Micron executives host, entertain, and recruit alongside Optimus and Cybercab in full operation. Board members and partners experience autonomous systems as part of daily life.',
  },

  roadmap: {
    sectionId: 'timeline',
    navLabel: 'Roadmap',
    overarchingArc: 'The prototype begins as a lived readiness proving ground for autonomy in practice. It then introduces the corporate autonomous residence and entertainment hub — a corporate residential model enabled by Optimus and Cybercab\'s service, security, and mobility layer.',
    phases: [
      { title: 'Site Visit', action: 'Confirm fit, scope, and operating priorities on site.' },
      { title: 'Partnership', action: 'Define privacy, hosting, security, service, and mobility requirements.' },
      { title: 'Proof of Concept', action: 'Run the living-lab phase across arrivals, stays, dinners, events, and daily household use.' },
      { title: 'Operational Launch', action: 'Activate Micron House in full operation.' },
    ],
    convening: 'Micron and Tesla engineers sit with lawmakers, educators, healthcare leaders, and community voices to build trust, shape understanding, and define the human experience of autonomy — while the window to lead that conversation is still open.',
  },

  briefings: {
    sectionId: 'policy',
    navLabel: 'Briefings',
    context: 'Two legislative packages prepared for the Idaho Legislature and Boise City Council. Autonomous driving systems at the state level. Robot-enabled operations for commercial and residential buildings at the municipal level.',
    venueContext: 'Micron House is the immediate venue to test Cybercab and Optimus in a 1906 home, convene leaders around firsthand experience — and shape public rollout from a historic neighborhood near the Capitol, downtown, Micron, and the airport.',
    legislativeBriefs: [
      {
        id: 'brief-a',
        level: 'State Legislature',
        title: 'Idaho Automated Driving Systems and Driverless Passenger Service Act',
        citation: 'New Chapter 38, Title 49, Idaho Code · March 2026',
        model: 'Utah HB 101 (House 70–0, Senate 23–0)',
        scope: 'Defines automated driving systems using SAE J3016, creates a statewide driverless passenger-service category, and assigns fleet operator accountability — with no new regulatory bodies or fiscal burden.',
      },
      {
        id: 'brief-b',
        level: 'City Council',
        title: 'Boise Robot-Enabled Operations Pilot Ordinance',
        citation: 'State PDD Amendments + City Pilot · March 2026',
        model: 'Extension of Boise AI governance framework (Regulation 4.30q)',
        scope: 'Extends Boise\'s AI governance framework to physical robotic systems operating in occupied buildings. Voluntary three-year pilot administered through existing city permitting and fire department infrastructure.',
      },
    ],
    principles: [
      'Barrier removal over new regulation',
      'Private property authorization leads',
      'Heritage Foundation alignment',
      'Zero new state agencies or fiscal burden',
      'Voluntary pilot through existing infrastructure',
    ],
    referenceQuestions: [
      'What are the three risk tiers in the Boise pilot ordinance?',
      'How does Idaho\'s proposed operator definition compare to Texas §545.451?',
      'What FTE impact does the Idaho ADS Act have on ITD?',
      'What states were benchmarked and what criteria were used?',
      'How does private property authorization work under the Act?',
      'What insurance requirements exist in Utah HB 101 versus what Idaho proposes?',
      'What does the staff analysis say about Boise\'s existing permitting infrastructure?',
      'What safety data supports autonomous vehicle deployment?',
      'What are the key talking points for presenting the ADS Act to legislators?',
      'What was included in the transmittal memo?',
    ],
  },
};

const SECTIONS = [
  { id: 'prototype', nav: 'Why Now', narrativeKey: 'whyNow' as const },
  { id: 'property', nav: 'Readiness', narrativeKey: 'readiness' as const },
  { id: 'serving', nav: 'Outcome', narrativeKey: 'outcome' as const },
  { id: 'serving-tesla', nav: 'Living Lab', narrativeKey: 'livingLab' as const },
  { id: 'timeline', nav: 'Roadmap', narrativeKey: 'roadmap' as const },
  { id: 'policy', nav: 'Briefings', narrativeKey: 'briefings' as const },
] as const;

export function WebMCPProvider() {
  useEffect(() => {
    if (!('modelContext' in navigator) || !navigator.modelContext) {
      console.log('[WebMCP] navigator.modelContext unavailable — injecting JSON-LD fallback');
      injectJsonLdFallback();
      return;
    }

    console.log('[WebMCP] navigator.modelContext detected — registering Micron House tools');

    const tools: WebMCPTool[] = [
      {
        name: 'get_project_overview',
        description: 'Get the complete overview of Micron House — the first autonomous corporate residence. Returns project metadata, creator statement, concept, key partners, brand identity, and a map of all available sections.',
        annotations: { readOnlyHint: true },
        execute: async () => ({
          ...NARRATIVE.overview,
          sections: SECTIONS.map(s => ({ id: s.id, label: s.nav })),
        }),
      },
      {
        name: 'get_section_content',
        description: 'Get the complete hardcoded narrative for any section. Valid IDs: prototype (Why Now), property (Readiness), serving (Outcome), serving-tesla (Living Lab), timeline (Roadmap), policy (Briefings).',
        inputSchema: {
          type: 'object',
          properties: {
            section_id: { type: 'string', enum: SECTIONS.map(s => s.id) },
          },
          required: ['section_id'],
        },
        annotations: { readOnlyHint: true },
        execute: async (params: Record<string, unknown>) => {
          const section = SECTIONS.find(s => s.id === params.section_id);
          if (!section) return { error: `Unknown section`, validSections: SECTIONS.map(s => s.id) };
          return { sectionId: section.id, navLabel: section.nav, content: NARRATIVE[section.narrativeKey] };
        },
      },
      {
        name: 'navigate_to_section',
        description: 'Scroll the page to a specific section. Triggers smooth scroll.',
        inputSchema: {
          type: 'object',
          properties: { section_id: { type: 'string', enum: SECTIONS.map(s => s.id) } },
          required: ['section_id'],
        },
        execute: async (params: Record<string, unknown>) => {
          const el = document.getElementById(params.section_id as string);
          if (!el) return { error: `Element not found` };
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return { success: true, navigatedTo: params.section_id };
        },
      },
      {
        name: 'list_sections',
        description: 'List all 6 navigable sections with IDs and labels.',
        annotations: { readOnlyHint: true },
        execute: async () => ({ sections: SECTIONS.map(s => ({ id: s.id, label: s.nav })) }),
      },
      {
        name: 'get_serving_categories',
        description: 'All ways Micron House serves Micron — talent acquisition, executive hosting, global mobility, family support, travel & entertainment, community/foundation. Includes named chefs, venues, event scenarios.',
        annotations: { readOnlyHint: true },
        execute: async () => NARRATIVE.outcome,
      },
      {
        name: 'get_living_lab',
        description: 'The Living Lab concept — Optimus and Cybercab operations, Tesla scaling data, wellness infrastructure (contrast therapy, whole body vibration, geothermal soaking, organic garden), corporate model.',
        annotations: { readOnlyHint: true },
        execute: async () => NARRATIVE.livingLab,
      },
      {
        name: 'get_property_details',
        description: 'The 1906 home on Warm Springs Ave — geothermal history (C.W. Moore, 1890), National Register corridor, residence specs, proximity map.',
        annotations: { readOnlyHint: true },
        execute: async () => NARRATIVE.readiness,
      },
      {
        name: 'get_why_now',
        description: 'The urgency thesis — three pressure points (displacement, distrust, first encounters), Micron/Tesla/Boise convergence, window-closing argument, shared missions.',
        annotations: { readOnlyHint: true },
        execute: async () => NARRATIVE.whyNow,
      },
      {
        name: 'get_policy_briefings',
        description: 'Idaho autonomous technology legislative packages. Brief A: Idaho ADS and Driverless Passenger Service Act (state level, modeled on Utah HB 101, SAE J3016 definitions, fleet operator accountability). Brief B: Boise Robot-Enabled Operations Pilot Ordinance (city level, extends Regulation 4.30q, three-year voluntary pilot). Includes regulatory principles and 10 detailed reference questions.',
        annotations: { readOnlyHint: true },
        execute: async () => NARRATIVE.briefings,
      },
      {
        name: 'get_roadmap',
        description: 'Phased implementation — Site Visit, Partnership, Proof of Concept, Operational Launch. Convening thesis.',
        annotations: { readOnlyHint: true },
        execute: async () => NARRATIVE.roadmap,
      },
      {
        name: 'get_contact',
        description: 'Lisa Wood Studio creator and stewardship information.',
        annotations: { readOnlyHint: true },
        execute: async () => ({
          studio: 'Lisa Wood Studio',
          location: 'Sun Valley / Ketchum, Idaho',
          website: 'https://micron-house.com',
          role: NARRATIVE.overview.creatorStatement,
        }),
      },
    ];

    try {
      navigator.modelContext!.provideContext({ tools });
      console.log(`[WebMCP] Registered ${tools.length} tools for Micron House`);
    } catch (err) {
      console.error('[WebMCP] Failed to register tools:', err);
    }

    return () => {
      try { tools.forEach(t => navigator.modelContext?.unregisterTool(t.name)); } catch {}
    };
  }, []);

  return null;
}

function injectJsonLdFallback() {
  if (document.querySelector('script[data-webmcp-fallback]')) return;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Micron House',
    description: NARRATIVE.overview.concept,
    url: 'https://micron-house.com',
    creator: { '@type': 'Organization', name: 'Lisa Wood Studio' },
    locationCreated: { '@type': 'Place', name: 'Boise, Idaho', address: NARRATIVE.overview.address },
    about: { '@type': 'Thing', name: 'Autonomous Corporate Residence', description: NARRATIVE.overview.corePremise },
    keywords: ['autonomous residence','corporate housing','Tesla Optimus','Cybercab','Micron Technology','geothermal','Warm Springs Avenue','Boise','living lab'],
    hasPart: SECTIONS.map(s => ({ '@type': 'WebPageElement', name: s.nav, url: `https://micron-house.com#${s.id}` })),
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-webmcp-fallback', 'true');
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
}

export default WebMCPProvider;
