# NZ Site Lookup development roadmap

Updated 30 September 2026. This is a working sequence, not a delivery commitment. Each data connection needs a public, browser-accessible source, clear reuse terms and an explicit account of its scale and coverage.

## Current coverage

- Nationwide base lookup: addresses and current primary parcels from the public LINZ feature service without a user API key, BRANZ NZS 3604 zones, H1 climate, regional geology and active faults, plus preliminary engineering inputs. Legal descriptions can be searched directly; QLDC, Christchurch and Wellington parcel services provide local comparison where available.
- Council liquefaction: published layers for Auckland and several other regions, with original assessment wording preserved.
- Council natural-hazard point flags and optional map features: Otago, Waikato and Bay of Plenty; Auckland flood plains, flood prone areas, overland flow paths and coastal scenarios; Wellington liquefaction, river flood and tsunami layers; Canterbury tsunami, fault and Christchurch flood extents; Southland significant floodplains, tsunami evacuation and liquefaction; Nelson present and future river flood extents and floodway; Marlborough Environment Plan flood overlay and tsunami evacuation zones. Local Queenstown Lakes flood and Gorge Road debris-flow studies and Dunedin 2GP flood overlays supplement Otago regional mapping. Tasman and West Coast have direct council viewer links without automatic natural-hazard polygon flags. West Coast liquefaction and Canterbury liquefaction are connected separately in Geology. A blank result means no intersection in the connected layer, not a hazard-free site.
- Historical aerial footprint search, source links, and preliminary PDF/Excel reports.

## Next: deepen Auckland coverage

1. Assess Auckland Unitary Plan overlays and zoning. Distinguish operative rules from proposed plan changes, link to the current legal text, and avoid implying the map is a planning certificate or LIM.
2. Test representative Auckland locations against the official Flood Viewer and document differences caused by coordinate choice, study updates and coverage. Review whether a more recent coastal dataset should replace or supplement the connected NIWA 2016–17 scenario service.
3. Explore legal parcel geometry for a true parcel-overland-flow-path intersection, retaining the current coordinate-distance check as a separate measure. This requires reliable parcel boundaries and should not infer crossing from an address point.

## Then: extend the national pattern

1. Extend the Canterbury flood connection beyond Christchurch’s 10, 50 and 200 year modelled extents. Identify queryable, scenario-specific results and model-coverage boundaries in the regional Flood Model Results viewer for Selwyn, Waimakariri, Ashburton, Timaru, Kaikōura and Waitaki. Confirm whether each layer is inundation, depth, hazard class or only a study footprint before adding it. Preserve model scenario, currency and coverage, then compare representative sites with each council viewer. Canterbury tsunami evacuation and fault awareness/avoidance are already connected; liquefaction remains in Geology.
2. Validate the new South Island connections at representative addresses against each official viewer, including query availability, model coverage and changes to the published service. Resolve Tasman flood, coastal, slope and tsunami layers and West Coast flood/coastal portal data before enabling automatic flags. Review Southland local flood models separately from the regional significant-floodplains indication; expand QLDC, Dunedin and other district coverage where the study and plan status can be stated accurately.
3. Deepen Wellington with current district and city hazard overlays, local flood models and relevant planning status, taking care to distinguish operative from proposed layers. Then extend other regions with stable public hazard services.
4. Make coverage visible by region and theme, including unavailable services and areas without a published study. Keep the source's risk language and study scale instead of assigning a single national score.
5. Broaden district and city council planning information, then bring applicable mapped constraints into report exports with authoritative links and retrieval dates.

## Interface design (work through in chat)

- Review the desktop and mobile site flow together in chat, including how much map remains visible while results are open.
- Design clear dropdown tabs for Site information, Planning, Geotechnical, Architectural and Engineering, with Natural hazards and historical mapping placed where they are easiest to find. Keep results and source context available without overwhelming the map.
- Keep the site lookup address bar accessible at the bottom of the mobile map. Agree on interaction states and a small-screen layout before implementation, then test on mobile and desktop.

## Product and engineering work

- AI summary: the reserved tab is non-interactive. A future evidence-linked draft should use only displayed site data and source links, distinguish published records, calculations, user inputs and coverage gaps, disclose what is sent to an external AI service, obtain consent, and require engineer review before export or use.
- Complete the planned geology, planning, architectural and engineering information groups, while keeping user-confirmed design inputs separate from map lookups.
- Engineering tab — corrosion exposure: add separate **steel corrosion zones** and **concrete corrosion zones**. First confirm the applicable standard editions, authoritative public or licensed source material, terminology, boundary data and treatment of coastal, geothermal and other local exposure conditions. Present each result with its source, coverage and limitations; do not infer a material-specific zone from the existing NZS 3604 timber-framing corrosion result.
- Engineering wind advanced inputs: add engineer-confirmed fields for **Mz,cat** and **Md**, with the selected value, basis, override and source-page reference retained in report exports. Build this only after the applicable NZS 1170 wind-actions edition and amendment are nominated and the relevant licensed pages are supplied for review. Extracting the factors from user-provided scans may support the implementation, but the site must not reproduce the standard's tables or present automated values without the required site and design inputs.
- Improve report audit trails for source dates, map versions, selection coordinates and council study links.
- Extend structural seismic and wind calculations only after explicit inputs and standard-edition checks are in place. Retain review and override controls for the engineer.

The current site is a preliminary screening tool. Property boundaries, LIMs, council records, survey and specialist assessments remain the sources for property-specific decisions.
