
# AGENT INSTRUCTIONS - BUILD MOYA SIMULATION PROTOTYPE

## DO NOT DELETE EXISTING CODE
Read index.html, questions.json - KEEP them. Only ADD.

## FILES TO CREATE (Exact Names):
1. stories.json: Dict with 5 keys: rope, stop, colour, mirror, speed. Each value: {title: str, diy_instruction: str max 200 chars, why: str (psych theory), svg_code: str (full <svg>...</svg> <5KB, must include <animate> or valid SVG, no <script>)}
2. logic.json: Dict mapping question ID (string) to diy key. Must cover at least Q10, Q27, Q33, Q45, Q50. Example: {"27": "rope", "45": "stop"}. For full 68 Qs later, but 5 now for demo.
3. audit_report.json: Dict QID -> 14 flags. Each flag = PASS/FAIL + comment. Keys: traffic_engineer_flag, linguist_flag, cognitive_flag, moya_ux_flag, township_persona_flag, k53_examiner_flag, datafree_flag, visual_flag, behavioural_flag, safety_flag, memory_flag, plain_language_flag, svg_animator_flag, json_validator_flag
4. colab_app.py: Gradio app. Requirements: import json, gradio as gr; load stories.json, logic.json; ChatInterface with function moya_bot(message,history) returns <160 chars; Button "Run 14 Agent Audit" that returns audit summary; launch(share=True, server_name="0.0.0.0")
5. Update index.html: Add <div id="svg-holder" style="border:2px solid #FFEB00; padding:10px;"></div> + <script> fetch('./stories.json').then(r=>r.json()).then(stories=>{fetch('./logic.json').then(r=>r.json()).then(logic=>{const p=new URLSearchParams(location.search); const q=p.get('q'); if(q && p.get('show_svg')){const key=logic[q]; if(key && stories[key]){document.getElementById('svg-holder').innerHTML=stories[key].svg_code+'<p><b>DIY:</b> '+stories[key].diy_instruction+'</p>';}}})}) </script> BEFORE </body>

## CHAT LOGIC (Implement in colab_app.py):
- If user message contains "YES I made X" -> reply "Good! Touch X. Q{ID}: {answer}. Link: .../?q={ID}&show_svg=1 Type [X]"
- If user message contains "[X]" or "X" -> reply "Correct! You remember because you touch X. Next?"
- Else -> reply "Make {title}: {diy_instruction}. Done? Type YES I made {key}. SVG: ?q={q_id}&show_svg=1"
- All replies <160 chars

## SVG RULES:
- <svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">...</svg>
- Must be <5KB, no external images, no JS
- Use <animate> or simple shapes
- Test on Android 8 Chrome

## 14 AGENTS IMPLEMENTATION (In colab_app.py):
Define 14 functions that take Q dict and return PASS/FAIL. For prototype mock PASS but log logic:
def traffic_engineer(q): return "PASS" if q else "FAIL"
... etc. Then audit_all() loops through logic.json and builds report.

## FINAL LAUNCH:
demo.launch(share=True) -> prints public URL. That URL is deliverable.

## AUDIT LATER:
Another AI will read SCIENTIFIC_REPORT.md + BUSINESS_FEASIBILITY.md + AGENT_INSTRUCTIONS.md + stories.json + logic.json + audit_report.json and check if deliverable matches spec. So keep details.
