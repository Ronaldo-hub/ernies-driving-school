
# SCIENTIFIC REPORT: Ernie's Driving School - Moya Datafree Learning Platform

## 1. PROBLEM STATEMENT (Evidence Based)
- 70% of South African learners fail K53 Learner's Test on first attempt (RTMC 2023)
- Average Khayelitsha learner: Age 19-24, Grade 10-12, no car at home, Android 8, 1GB RAM, prepaid data R99/GB
- Existing solutions (YouTube, driving apps) consume 300MB-1GB per hour - unaffordable
- Cognitive gap: K53 questions are abstract (yellow line rules, blind spot) without physical context
- Location: 70% of Ernie's students walk, taxi, no access to car for practice

## 2. TARGET PERSONA (Primary)
Name: Asiphe, 19, Khayelitsha, Grade 10, lives with gogo, no car, Android 8 (Tecno Pop 5), 512MB storage left, uses Moya Messenger 3h/day because it is datafree (reverse-billed), WhatsApp for family, 0 data for browsing. Studies 21:00-23:00 by candle. Motivation: Get licence to become Uber driver.

## 3. PROPOSED SOLUTION - 3 PILLARS
PILLAR 1: MOYA MESSENGER CHAT (Datafree Text)
- Platform: Moya Messenger Discover - 25M MAU SA, reverse billed R0 to user, client pays R0.03/msg
- Constraint: CHAT must be <160 chars, TEXT ONLY, no images, no emojis (Moya strips)
- Interaction: Q&A + nudge to make DIY object
- Example flow: Bot: "Q27: Yellow line? Make rope. Done? Type YES I made rope" -> User: "YES I made rope" -> Bot: "Touch rope. Yellow=NO park ANY time. Link: ?q=27&show_svg=1 Type [rope]"

PILLAR 2: MOYA WEBSITE / DATAFREE SVG (Datafree Website)
- Tech: GitHub Pages (free), JSON offline, SVG <5KB with <animate> only, no JS inside SVG, no external libs
- URL pattern: ronaldo-hub.github.io/ernies-driving-school/?q=27&show_svg=1 - This URL is opened INSIDE Moya Discover browser (also datafree)
- 5 DIY OBJECTS (Embodied Cognition Theory):
  a) rope = yellow line (shoelace tied to door handle, touch = memory)
  b) stop = STOP sign 3 sec rule (A4 paper clock above bed, spaced repetition)
  c) colour = red/yellow/blue meaning (3 circles with koki, color coding)
  d) mirror = blind spot check (paper on mirror: CARS? PEOPLE?, habit formation)
  e) speed = speed limits (shoelace knots: 1 knot=60 town, 2=100 road, 3=120 freeway, tactile memory)
- Why DIY works: 40% better recall when tactile (Kontra et al 2015), 0 cost, no car needed, bedroom poster effect

PILLAR 3: 14 AUDIT AGENTS (Quality Assurance)
For each of 68 K53 questions, audit by:
1. Traffic Engineer - Is K53 rule correct?
2. Linguist - Grade 8 reading level? Simple English/Xhosa mix?
3. Cognitive Psychologist - Does DIY map to concept?
4. Moya UX Expert - <160 chars? Datafree?
5. Township Persona (Asiphe) - Can she make it with no money?
6. K53 Examiner - Will this appear in exam?
7. Datafree Expert - 0KB cost? SVG <5KB?
8. Visual Designer - SVG animation works on Android 8?
9. Behavioural Economist - Nudge to action? Not shame?
10. Safety Officer - Safe to make? No sharp objects?
11. Memory Scientist - Spaced repetition? Bedroom poster?
12. Plain Language Expert - No jargon?
13. SVG Animator - <animate> valid, no JS?
14. JSON Validator - Valid JSON, offline works?

## 4. EXISTING ASSETS (DO NOT DELETE)
- Repo: ronaldo-hub/ernies-driving-school
- Live: ronaldo-hub.github.io/ernies-driving-school
- Files: index.html (current Q&A), questions.json (68 Qs from original site), style.css
- Task: REUSE existing, ADD new files, UPDATE index.html to support ?q param with div id=svg-holder

## 5. TECHNICAL CONSTRAINTS (NON-NEGOTIABLE)
- Chat: TEXT ONLY, <160 chars per bubble, no images
- Website: GitHub Pages, SVG <5KB, <svg><animate> only, no JS inside SVG, fetch JSON only
- URL: Must support ?q=ID&show_svg=1 - injects stories[logic[q]].svg_code into #svg-holder
- Offline: All JSON must load without internet after first Moya load
- Android 8 compatibility: No ES6 arrow functions inside main JS? Use simple fetch then
- Gradio: Must run on Colab with share=True, port 7860, public link https://xxx.gradio.live

## 6. SUCCESS METRICS
- Audit: audit_report.json with 14 flags per Q, all PASS
- Demo: 1. Moya chat link (Gradio) 2. Website SVG link (?q=27&show_svg=1) 3. Audit report
- Business: R50/learner/month, cost R0 (GitHub+Colab free), profit R50
- Learning: Asiphe can answer Q27 correctly after making rope, without data

## 7. RISKS & MITIGATION
- Moya rejects SVG: Mitigation <5KB, no JS, test in Moya app
- GitHub Pages down: Mitigation JSON backup in chat
- Learner no shoelace: Mitigation use string, wire, belt

## 8. REFERENCES
- RTMC K53 manual, Moya Messenger API docs (datafree), Kontra 2015 embodied cognition, GitHub Pages docs

## 9. DELIVERABLE DEFINITION
Moya Simulation Prototype = Gradio public link + Website ?q link + audit_report.json with 14 agents PASS
