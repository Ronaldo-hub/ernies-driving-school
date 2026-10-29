
# CONTEXT FOR AI AUDIT

REPO: ronaldo-hub/ernies-driving-school
LIVE SITE: https://ronaldo-hub.github.io/ernies-driving-school/
GOAL: Moya Simulation Prototype for client demo - datafree learning

CURRENT DISCUSSION HISTORY (Summary for auditor):
- User started on hotspot Hisense U964, wanted to restrict large downloads only on that hotspot (netsh wlan set profileparameter cost=Fixed). Then moved to WiFi computer.
- Decided to work only via Colab, GITHUB_TOKEN secret stored.
- Deliverable: 1) Gradio chat simulation (Moya text <160) 2) Website SVG via ?q=27&show_svg=1 3) audit_report.json with 14 agents
- 5 DIY objects: rope=yellow line, stop=3 sec, colour=red/yellow/blue, mirror=blind spot, speed=knots
- Persona: Asiphe 19 Khayelitsha no car Android8 Moya 3h/day
- Tech: GitHub Pages free, Colab free, Moya reverse billed R0 to user, JSON offline, SVG <5KB no JS
- Business: R50/mo, R0 cost, R600k Y1
- Steps: This file creation -> stories.json/logic.json -> index.html update -> colab_app.py share=True -> public link -> test -> client

FILES IN REPO:
- SCIENTIFIC_REPORT.md (full 9 sections)
- BUSINESS_FEASIBILITY.md (market, revenue)
- AGENT_INSTRUCTIONS.md (for builder AI)
- CONTEXT.md (this file)
- stories.json, logic.json, audit_report.json, colab_app.py
- index.html (original + svg-holder injection)
- questions.json (68 K53 Qs original)

MOYA DISCOVER REQUIREMENTS:
- Discover listing needs: Title, description, icon <50KB, URL https://ronaldo-hub.github.io/ernies-driving-school/?q=27&show_svg=1, datafree proof SVG <5KB, no JS, works on Android 8
- Chat API: Not needed for prototype, simulate with Gradio

AUDIT CHECKLIST FOR NEXT AI:
- Does stories.json have 5 keys each with title, diy_instruction, why, svg_code <5KB?
- Does logic.json map Q IDs to DIY?
- Does index.html support ?q param and inject SVG?
- Does colab_app.py launch share=True and chat <160 chars?
- Does audit_report.json have 14 flags per Q?
- Does BUSINESS_FEASIBILITY.md have R50/mo model?
- Does SCIENTIFIC_REPORT.md explain embodied cognition?
