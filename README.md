# NZ Site Lookup

A single-page prototype for selecting a New Zealand property by address or map click and returning:

- Exact point-in-polygon legal Appellation, lot/parcel and survey plan from the public LINZ NZ Primary Parcels ArcGIS service across New Zealand, without a user API key
- Direct search by a current legal description such as `Lot 1 DP 26216`, centering the map inside the matched polygon
- A reserved AI summary tab that currently makes no AI request or automated assessment
- Local parcel comparison against Queenstown Lakes District Council, Christchurch City Council and Wellington City Council services where their published parcel layers apply; council results can supply a fallback when LINZ is unavailable
- Territorial authority from the national public TLA boundary point-in-polygon service; local parcel services are shown only as a secondary parcel cross-check
- NZS 3604:2011 corrosion exposure Zone B, C or D from the BRANZ Maps vector layer
- Straight-line distance from the selected point to the LINZ NZ Coastline – Mean High Water Springs dataset, with the NZS 3604 500 m coastal Zone D rule applied conservatively
- BRANZ Maps wind zone: Low through Extra High, or Specific Engineering Design
- BRANZ Maps NZS 3604:2011 earthquake zone: Zone 1 through Zone 4
- Published council liquefaction susceptibility or vulnerability category, with the original category wording, source and assessment scale retained
- Nearest mapped active-fault trace, approximate distance, locational accuracy, fault sense, recurrence interval, slip rate and last-event attributes from the New Zealand Active Faults Database
- Point-in-polygon check against available GNS Fault Avoidance Zones and Fault Awareness Areas
- GNS Science / Earth Sciences New Zealand QMAP 1:250,000 geological unit, code, lithology, rock class, age, description and mapped positional accuracy
- Approximate ground elevation from a public terrain model
- Coordinates and reverse-geocoded address
- Live New Zealand address suggestions with mouse and keyboard selection
- Google Maps, Street View and satellite links for the selected site
- Optional clickable map overlays for BRANZ wind, corrosion and earthquake zones, council liquefaction mapping, GNS active-fault traces and planning areas, plus GNS QMAP geological polygons around the selected site
- Optional Esri World Imagery satellite basemap with road and place labels retained
- Native 3D terrain, map tilt/rotation and building extrusions where basemap heights are available
- H1 climate-zone lookup from the official H1/AS1 territorial-authority table, with optional clickable polygons from the public TLA boundary service
- Initial AS/NZS 1170.3 ground snow load calculator for Importance Level 2 and a 50-year design working life, using an approximate Figure 2.2 region suggestion, user confirmation/override and an editable site elevation
- Initial NZS 1170.5:2004 equivalent-static site hazard spectrum calculator, including locality-based hazard factor suggestion, editable Z, site class A/B–E, return-period factors, near-fault factor and ULS/SLS C(T)
- Initial AS/NZS 1170.2:2021 site wind-speed calculator with regional wind speed, terrain/height, shielding, hill-shape, lee and elevation multipliers
- On-demand terrain-model screening of four 15 km transects, assessing hill/ridge effects for eight cardinal wind directions and applying the governing suggested hill-shape multiplier
- Automatic council natural-hazard flags in Auckland, Wellington, Canterbury, Otago, Waikato, Bay of Plenty, Southland, Nelson and Marlborough, with local Queenstown Lakes and Dunedin layers; direct viewer links for Tasman and the West Coast
- A New property selection mode that keeps ordinary map clicks focused on interrogating visible polygons without replacing the selected site
- Compact result cards with expandable detail panels, plus highlighted engineer-confirmed inputs for snow region, seismic site class, wind region and terrain category
- A design-input report builder with editable project metadata, selectable report sections, direct PDF download and a structured Excel workbook containing project fields, site data, engineering inputs and source links

## Information layout

The results panel is organised into seven numbered groups:

1. **Site information** — property, elevation, coordinates, address and site links.
2. **Geology** — regional geology, active faults and liquefaction susceptibility, with a reserved place for expansive-soil mapping.
3. **NZS 3604 information** — wind, earthquake, corrosion and H1 climate screening information.
4. **Engineering** — AS/NZS 1170.3 ground snow load, NZS 1170.5 equivalent-static site hazard spectrum, and AS/NZS 1170.2 site wind speed, with full wind actions and structural seismic calculations reserved.
5. **Natural hazards** — reserved for additional public local and regional council hazard mapping.
6. **Historical mapping** — reserved for historical aerial imagery, survey plans and other mapped site changes.
7. **AI summary** — a non-interactive placeholder for a future evidence-linked, engineer-reviewed draft.

The LINZ Crown Aerial Film Library search uses the public Retrolens footprint service. It first checks for photograph footprints intersecting the selected site, then expands to 1 km, 5 km and 10 km when no site coverage is returned. Results distinguish photographs covering the point from nearby records and can be displayed as footprint polygons. Scanned records include a direct **View scan** link and a **Show on map** control. Only one selected scan is displayed at a time, using the shared historical-layer opacity control. The overlay is a contextual approximation stretched to the catalogue footprint; the source photography is not orthorectified and must not be used for measurement. A Retrolens handoff includes a button to copy the selected coordinates for pasting into Retrolens search.

Planned sections are labelled clearly and do not imply that a lookup or design check has been completed.

## Report export

After selecting a site, **Create site report** opens a review panel for job number, site-report reference, client, building-consent number, preparer, report date and engineer notes. The user can select the report sections and whether to include the current map view and detailed source/design notes. The directly downloaded A4 PDF design-input sheet distinguishes lookup results, recorded inputs, limitations and source metadata, and highlights missing required snow, seismic and wind selections before issue.

The accompanying Excel workbook contains separate **Project**, **Site Data**, **Engineering Inputs** and **Sources** worksheets. Stable HTML control/result identifiers are retained as field IDs so the workbook can later be mapped into calculation templates. The report and workbook remain preliminary engineering records: all source currency, standards editions, user selections and calculated values require engineering review.

## Natural-hazard screening scope

The Natural hazards section queries public council ArcGIS services at the selected coordinate. It reports whether connected published mapping intersects that point, or whether an Auckland overland flow path is within 50 m, and links to the relevant council source. It does not translate the source studies into a new risk category. The Auckland adapter checks modelled flood plains and GIS-derived flood prone areas separately. Flood plains are compiled catchment hydraulic models with varying currency; flood prone areas represent potential ponding depressions under outlet blockage assumptions, not a site-specific flood depth. The overland flow path check queries mapped lines around the selected coordinate, calculates the shortest straight-line distance to returned geometry, and shows up to three nearest paths within 50 m with the published catchment-area group. This does not establish whether a path crosses the legal parcel. Three separate coastal inundation flags use Auckland Council's published 1% AEP storm-tide extent with no sea-level-rise increment, 1 m sea-level-rise scenario, and 2 m scenario. These extents derive from a NIWA 2016–17 study and should be compared with the current Flood Viewer. Auckland liquefaction vulnerability was already connected through the separate geology lookup. The Otago adapter includes river and lake flooding, selected detailed flood models, landslides, rockfall awareness areas, alluvial fans and debris-flow scenarios, tsunami and storm-surge extents, coastal erosion/inundation areas, liquefaction and lateral-spreading mapping, active-fault/shaking layers, South Dunedin emergent-groundwater and rainstorm mapping, and Lower Taieri/Clutha flood-protection studies.

The Wellington adapter checks the published 2018 GNS regional liquefaction susceptibility layer, Greater Wellington's modelled 1% and 0.23% AEP river flood extents, and 2019 tsunami evacuation zones. It also uses the 2018 GNS layer for the Geology section's council liquefaction result and optional map overlay. Flood-model coverage is limited to the relevant modelled catchments. Evacuation zones are instructions for emergency planning, not modelled inundation depths. The liquefaction layer is suitable at its published regional scale of approximately 1:50,000–1:250,000 rather than property scale. More detailed and newer local hazard maps or district-plan overlays may apply; the linked Greater Wellington LIM hazard page directs users to those sources. This adapter does not yet combine city and district planning rules.

The Canterbury natural-hazard adapter checks Canterbury Maps’ red, orange and yellow tsunami evacuation zones, excluding the service’s “No zone” polygons, and Environment Canterbury’s 2024 combined surface fault awareness/avoidance polygons. It checks the 10, 50 and 200 year flood extent layers in Christchurch City Council’s Flood and Floor Level Viewer. The three extents are reported together as one category with separate published attributes where returned; no flood depth is inferred. A point intersection is distinct from nearby flood mapping: the Christchurch council map overlay can show surrounding polygons even when the selected point has no match. Sites outside the broad Christchurch lookup area show “Outside connected area” for this category. Within that area, no polygon intersection does not establish whether the parcel is outside a modelled catchment or free from flooding. Partial source failures are disclosed rather than reported as a complete empty check. The linked Canterbury Flood Model Results viewer contains other regional studies, including areas outside Christchurch, that are not automatically checked here. Tsunami zones are emergency instructions, not flood-depth estimates. Fault awareness areas are broad-scale buffers around mapped faults; avoidance zones come from more detailed local mapping, and neither is a parcel-specific engineering assessment. The Geology section separately checks published Canterbury liquefaction studies. Other local flood models, landslides, district-plan rules and LIM information require current council sources.

Southland connects Environment Southland's significant floodplains, tsunami evacuation zones and liquefaction classes. The floodplain layer is a regional indication, not a 1% AEP or parcel flood-depth model. Nelson connects City Council river floodway and 1% AEP present-day and future (to 2130) flood extents for its modelled catchments. Marlborough connects the Environment Plan flood hazard overlay and GNS 2015 tsunami evacuation mapping; users must verify the applicable plan status and current evacuation instructions in the council viewer. For Otago sites in the approximate Queenstown Lakes area, the point check also queries QLDC's 2021 ORC flood hazard layer, Wānaka 50 and 100-year hazard classes and the 2020 Gorge Road debris-flow/rockfall study. In the approximate Dunedin area it also queries Dunedin City's 2GP flood hazard overlays. These local study extents and planning overlays have different meanings from the regional ORC categories. The broad area filters only reduce irrelevant service calls and do not define district boundaries.

Tasman and West Coast show direct council natural-hazard viewer links in the Natural hazards section. Neither is presented as an automatic natural-hazard polygon check. West Coast regional liquefaction continues to be checked separately in Geology. Further local models and council viewers remain on the roadmap.

The Waikato adapter includes local and regional river-flood mapping, flood depth, defended areas, tsunami hazard and inundation, historic coastal inundation, regional liquefaction, ground-shaking susceptibility, geothermal systems/subsidence, and Karāpiro dam-break inundation. It retains the council's published Natural Hazard Information Hierarchy classification for each source layer. The optional **Council natural hazards** map switch displays polygons from intersecting hazard categories around the site; clicking a feature identifies the source category, hierarchy and published values. PDF and Excel reports capture these source attributes as stable hazard fields.

The Bay of Plenty adapter includes Level A and Level B liquefaction vulnerability mapping, 2025 tsunami maximum-depth scenarios for 2 m and 5 m waves and the 2500-year ARI event, tsunami evacuation zones, recorded historic flood extents and mapped surface-caldera context. Tsunami evacuation zones are kept distinct from modelled inundation depth, and calderas are labelled as geological context rather than a volcanic hazard zone. Published CC BY-ND 4.0 licence information is retained. BayHazards landslide susceptibility and sea-level-rise increments are currently raster products; they remain available through the source portal but are not reported as attribute-bearing polygon intersections.

An intersecting flag is not a property-specific assessment. A non-intersecting result can reflect the limits, scale, date or coverage of the published study and must not be read as confirmation that a hazard is absent. Users should inspect the linked source and report, obtain the relevant district or city council information and LIM, and seek specialist advice where appropriate. Regions without an automatic adapter are identified as unconnected rather than hazard-free. Further council and national adapters can be added without changing this result model. See [the development roadmap](ROADMAP.md) for the next coverage slices.

## Wind site-speed scope

The wind module calculates the directional site wind speed from `Vsit,β = VR Mc Md (Mz,cat Ms Mt)` using the AS/NZS 1170.2:2021 New Zealand regional-speed table and terrain/height table. The selected site's terrain-model elevation is copied into the editable elevation field. For NZ1–NZ4 sites above 500 m, the New Zealand elevation adjustment is included in `Mt = Mh Mlee (1 + 0.00015E)`; elsewhere `Mt` is not taken below 1.0.

The regional selection is deliberately provisional and must be confirmed against Figure 3.1(B). Terrain category, direction multiplier, shielding and lee multiplier remain explicit designer inputs. The on-demand terrain analysis samples the browser-compatible Open-Meteo Copernicus GLO-90 elevation model at 250 m intervals along N–S, NE–SW, E–W and SE–NW axes, with OpenTopoData NZ DEM 8 m as a fallback. It then screens both directions of each axis using the Table 4.3 crest values and the Clause 4.4.2 horizontal and vertical decay geometry. The governing suggested `Mh` is copied into the editable input and its profile and elevation source are displayed.

The automated result is a hill/ridge screening aid, not a surveyed topographic assessment. It samples only the exact eight cardinal directions, does not search every cross-section within ±22.5°, and does not reliably classify escarpments, complex multiple peaks, DEM artefacts or lee zones. The designer must review the displayed profile and may override `Mh`. The module reports velocity pressure only as `0.0006Vsit²` kPa and does not apply aerodynamic coefficients or calculate structural wind actions.

## Ground snow load scope

The snow calculator reports ULS and SLS ground snow load for an IL2, 50-year design basis. It automatically copies in the selected site's approximate terrain-model elevation, but the elevation is editable. It also suggests a snow region using a deliberately approximate interpretation of Figure 2.2 of AS/NZS 1170.3:2003. The user retains final control through the region selector, and locations within approximately 45 km of an interpreted boundary receive an additional warning. In regions N4 and N5, the current B1/VM1 minimum ground snow load of 0.9 kPa is applied to ULS only.

This is not a roof snow load calculation. Roof exposure, shape, accumulation, drifting and other coefficients are not yet applied. The region suggestion is screening information rather than an authoritative GIS dataset; confirm the snow region, elevation, territorial-authority requirements and all inputs against the licensed Standard before design use. Sites above 1,800 m and avalanche-prone sites require specific assessment.

## Seismic site hazard scope

The seismic calculator follows the NZS 1170.5:2004 standard currently cited by B1/VM1 Second Edition. It calculates the horizontal equivalent-static elastic site hazard spectrum from `C(T) = Ch(T) Z R N(T,D)` using the main Table 3.1 spectral-shape ordinates, Table 3.5 return-period factors and Tables 3.6–3.7 near-fault provisions. It does not calculate the structural design action coefficient, base shear, modal response spectrum, time-history spectrum, deformation demand, parts and components, or member actions.

The selected address is compared with the published MBIE locality list to suggest a hazard factor. The locality and Z remain editable. Where the MBIE list publishes a value below 0.13, the automatic suggestion retains 0.13 for the unamended standard cited by the current Verification Method; use of a lower value requires the applicable B1/VM1 special-study conditions. Christchurch and Akaroa retain the B1/VM1 minimum Z of 0.30.

Site subsoil class must be selected by the user. The regional 1:250,000 geological unit is not used to infer it. The app compares the nearest mapped active-fault name with the eleven major faults in Table 3.6. A matching trace can prefill the fault and approximate distance, but the user must confirm the shortest distance to the relevant fault plane from the Standard or suitable detailed geological information. Near-fault amplification is not applied merely because any mapped active fault is nearby.

The default annual probabilities, ULS 1/500 and SLS 1/25, are common IL2/50-year screening selections. The designer must confirm the limit states and annual probabilities from AS/NZS 1170.0 for the actual importance level and design working life. The ULS `ZRu` product is limited to 0.70 in accordance with NZS 1170.5 Clause 3.1.1.

## Use

Open `dist/index.html` through a web server. Address and elevation work without an API key. Parcel lookup requires a free LINZ Data Service API key, entered in the page under **LINZ parcel connection**. The key remains in browser local storage.

Address suggestions are provided by the Photon geocoder using OpenStreetMap data and are geographically restricted to New Zealand. Selecting a suggestion immediately centres the map and runs the site lookup.

The selected coordinates generate optional links to Google Maps, the nearest available Street View panorama, and Google satellite view. The main map has its own 3D mode and does not require Google Maps.

For reliable browser security behaviour, serve the folder locally rather than double-clicking the HTML file. On a Mac, open Terminal in the unzipped folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000/dist/`.

The geology lookup uses the public ArcGIS service behind the GNS geological web map and does not require an API key. It returns the geological unit mapped at the selected point in the 2023 QMAP 1:250,000 dataset.

The corrosion result keeps the BRANZ mapped zone, coastline test and governing zone separate. The coastline check uses LINZ's public ArcGIS feature service and does not need an API key. A selected point at or within 500 m of the mapped mean-high-water-springs coastline is assigned governing Zone D. A point beyond 500 m retains the BRANZ mapped result: distance is never used to downgrade a BRANZ Zone C or D result. An approximate numerical distance is reported for sites within 10 km; more distant sites are reported as **More than 10 km**, because the precise value has no effect on the 500 m design rule and avoiding very large coastal-geometry downloads keeps the lookup responsive.

Use the **Map layers** control to display the BRANZ zone polygons, H1 climate areas or GNS regional geology. Click a displayed polygon to see its classification. BRANZ wind, corrosion and earthquake polygons are loaded from a 3 × 3 group of correctly georeferenced NZTM tiles surrounding the selected site. H1 zones are classified from H1/AS1 Appendix C using public territorial-authority boundaries. To keep requests manageable, map overlays load around the selected site or current view.

The liquefaction lookup connects directly to public ArcGIS services published by Queenstown Lakes District Council and Otago Regional Council, Auckland Council, Greater Wellington Regional Council, Waikato Regional Council, Bay of Plenty Regional Council/Tauranga City Council, Horizons Regional Council, New Plymouth District Council, the Wairarapa councils, Environment Canterbury, and West Coast Regional Council. Queenstown Lakes and Canterbury use more detailed or newer local studies before older regional susceptibility layers; Wellington's 2018 regional study is preferred over older Wairarapa mapping where both sources cover the selected point. Auckland results are restricted to records marked Current and retain the published assessment level. No common national classification is imposed: the council's original wording is displayed and only the map colour is normalised for visual comparison.

If a selected point lies outside those services, the result says **Not mapped by connected services**. This is a coverage statement, not a hazard classification. Some council viewers expose additional mapping only through token-protected services; those layers are not scraped or presented as open data.

The active-fault lookup uses the public Earth Sciences New Zealand / GNS `WebNZActiveFaultsDatasets` service. It compares nearby high-resolution traces, where available, with the national 1:250,000 dataset and reports the closest returned geometry. The map layer also displays available Fault Avoidance Zones and Fault Awareness Areas. Those higher-resolution and planning datasets have restricted geographic coverage, so absence of a polygon is not confirmation that surface-fault rupture has been excluded.

Public service access does not by itself grant unrestricted reuse. The published NZ Active Faults item information includes acknowledgement requirements and restrictions on commercial use. Confirm the current licence directly with Earth Sciences New Zealand before using this layer in a commercial product or paid technical service.

The **Satellite imagery** switch displays Esri World Imagery beneath the existing road and place labels and beneath all engineering overlays. It does not require an API key.

This is screening information only. Coastal distance is measured from the selected coordinate rather than the legal parcel boundary and depends on the scale and currency of the LINZ coastline. Confirm actual exposure, breaking surf, local sea spray and relevant material-specific durability provisions before design. The BRANZ earthquake zone is the NZS 3604 zone rather than an NZS 1170.5 hazard calculation. Active-fault proximity addresses mapped surface traces and must not be treated as a ground-shaking calculation or a statutory setback. Council liquefaction mapping is generally regional or neighbourhood scale and does not replace a property-specific liquefaction assessment. Regional 1:250,000 geology is not a site-specific soil classification and does not replace intrusive investigation or geotechnical advice. Engineering design values must retain their source, edition, lookup method, and limitations.

## Planned extension

Extend the NZS 1170.5 module to the B1/VM1-modified structural design action coefficient and equivalent-static base shear after adding explicit structural inputs such as ductility, structural performance factor, seismic weight and period calculation. Keep the current Verification Method route separate from the SNZ TS 1170.5:2025 Alternative Solution pathway. Add independent data adapters for wind and soil information, while keeping raw location, source metadata and derived engineering values separate so calculations remain auditable.

## Cloudflare Workers deployment

The territorial-authority field uses the national TLA point-in-polygon query. Optional council parcel checks reuse that same boundary result and only query the matching council. Alexandra therefore uses Central Otago District Council and reports its parcel check as not currently connected, rather than querying QLDC. Failed or unmatched boundary lookups leave LINZ available and explicitly mark the council check as not checked. Run `node --test tests/council-lookup.test.cjs` for council selection and service-failure regression checks.

The `wrangler.jsonc` file serves `dist/` as a static Worker named `nz-site-lookup`. Deploy this repository's current `main` with `npx wrangler deploy` in an authenticated Cloudflare environment. A GitHub push alone updates source control; check the Workers deployment and the live HTML separately.
