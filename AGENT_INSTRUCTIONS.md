# AGENT INSTRUCTIONS - BUILD MOYA SIMULATION PROTOTYPE V2
### For Ernie's Driving School - Moya Chat App

## CRITICAL RULES
1. DO NOT DELETE EXISTING CODE - Read `index.html`, `questions.json`, `k53_demo_code2_light_vehicle_1.json` - KEEP them. Only ADD.
2. USE REAL FILE PATHS - Not generated SVGs. Circle animation MUST use: `images/animations/k53-mini-roundabout-give-way-right.svg`
3. COLOURS MUST BE EXACT - Moya app is soft, not irritating (no bright yellow)

## COLOUR SCHEME - EXACT VALUES (Moya App)
--soft: #FFFBF0 (main background, warm white)
--peach: #FFF3E0 (Button A, light orange)
--blue: #E3F2FD (Button B, light blue)
--sage: #E8F5E9 (correct answer highlight, light green)
--ink: #3E2723 (main text, dark brown)
--red: #B71C1C (wrong answer, dark red)
--brown: #5D4037 (secondary text)
--border: #EFEBE9 (card border)
--yellow-accent: #FFEB00 (ONLY for svg-holder border, not background)

All UI must use var(--soft) as background. Never use pure white or bright yellow background.

## REAL SVG PATHS - USE THESE
- Traffic Circle Animation: `images/animations/k53-mini-roundabout-give-way-right.svg` (THIS IS THE EXAMPLE - MUST BE USED FOR Q3/q_strand_braai_circle)
- Other signs: `images/signs/RM202.svg`, `images/signs/R201-120.svg`, `images/signs/R1-60.svg`, `images/signs/R3.svg`, `images/signs/RM10.svg`
- Check repo: if path missing, create folder but DO NOT generate fake SVG, reference path only

## DEMO QUESTIONS - USE YOUR REPO QUESTIONS BUT ADJUST TO 14 DIMENSIONS
Load from `questions.json` or `k53_demo_code2_light_vehicle_1.json`. For demo, take 5 Qs:
- Q2: R201-120 speed limit
- Q3: Circle / Strand + Braai Street / Vehicle A/B give way right - USE REAL CIRCLE SVG PATH
- Q8: RM202 yellow line no parking
- Q19: RM10 parking bay
- Q60: R1-60 urban 60

Each question must be answered using ALL 14 DIMENSIONS below (not just text):

### THE 14 DIMENSIONS - HOW TO ANSWER EVERY QUESTION
1. **Visual**: Show real SVG from `images/...` + describe what eyes see
2. **Kinesthetic/Hands**: DIY action - touch steering wheel, point to road
3. **Auditory/Voice + TTS**: Short voice note script <160 chars, Moya can read
4. **Spatial**: Where in car/road - left/right, behind/in front
5. **Personal/Strand**: Use user's location context - Strand, Braai Street, familiar road
6. **Emotional/Heart**: How it feels - safe, calm, protector
7. **Social/Cousin**: Story with cousin/family - "Your cousin did..."
8. **Logical/Mindmap**: Why rule exists - logic tree
9. **Associative/Method of Loci**: Memory palace - Strand Braai house = circle house
10. **Repetition**: Quick quiz - "Type [R] if you remember"
11. **Context/Real Road**: Real Cape Town road example - N2, R44
12. **Humour**: Light joke - not offensive
13. **Reward/Protector**: R0 poster / protector badge - "You protect family"
14. **Ownership**: User creates - "Draw circle on paper, take photo"

Example answer for Q3 (Circle) with 14 dims + colours + real path:
