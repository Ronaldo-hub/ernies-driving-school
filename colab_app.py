
import json, gradio as gr

print("Loading JSONs...")
with open("stories.json") as f: stories=json.load(f)
with open("logic.json") as f: logic=json.load(f)
with open("audit_report.json") as f: audit=json.load(f)
try:
    with open("questions.json") as f: questions=json.load(f)
except:
    questions=[{"id": str(i), "question": f"Sample Q {i}"} for i in range(1,69)]

# 14 AGENT FUNCTIONS
def agent_traffic_engineer(qid): return audit[qid]["traffic_engineer_flag"]
def agent_linguist(qid): return audit[qid]["linguist_flag"]
def agent_cognitive(qid): return audit[qid]["cognitive_flag"]
def agent_moya_ux(qid): return audit[qid]["moya_ux_flag"]
def agent_persona(qid): return audit[qid]["township_persona_flag"]
def agent_k53(qid): return audit[qid]["k53_examiner_flag"]
def agent_datafree(qid): return audit[qid]["datafree_flag"]
def agent_visual(qid): return audit[qid]["visual_flag"]
def agent_behavioural(qid): return audit[qid]["behavioural_flag"]
def agent_safety(qid): return audit[qid]["safety_flag"]
def agent_memory(qid): return audit[qid]["memory_flag"]
def agent_plain(qid): return audit[qid]["plain_language_flag"]
def agent_svg(qid): return audit[qid]["svg_animator_flag"]
def agent_json(qid): return audit[qid]["json_validator_flag"]

def run_14_audit(qid="27"):
    if qid not in audit: qid="27"
    result = f"AUDIT Q{qid} mapped to {logic[qid]}\n"
    for k,v in audit[qid].items():
        result+= f"{k}: {v}\n"
    return result

def moya_bot(message, history):
    msg = message.lower().strip()
    # Extract Q number if typed
    q_id="27"
    for token in msg.split():
        if token.isdigit() and token in logic:
            q_id=token
        if token.startswith("q") and token[1:].isdigit():
            q_id=token[1:]
    # Detect YES I made
    for diy_key in stories:
        if f"yes" in msg and diy_key in msg:
            return f"Good! Touch {diy_key}. Q{q_id}: {stories[diy_key]['title'][:40]}. Link: ronaldo-hub.github.io/ernies-driving-school/?q={q_id}&show_svg=1 Type [{diy_key}]"
        if f"[{diy_key}]" in msg:
            return f"Correct! {diy_key}=memory. You will pass. Next? Type Q number like 28"
    # Default teach
    diy = logic.get(q_id, "rope")
    s = stories[diy]
    return f"Q{q_id}: Make {s['title'][:25]}: {s['diy_instruction'][:100]} Done? Type YES I made {diy}. See SVG ?q={q_id}&show_svg=1"

with gr.Blocks(title="Ernie's Moya Simulator - Full Audit") as demo:
    gr.Markdown("# Ernie's Driving School - MOYA SIMULATION PROTOTYPE\n**Datafree Text Chat <160 chars | SVG Website <5KB | 14 Agents Audit | Asiphe Persona**\nLive site: ronaldo-hub.github.io/ernies-driving-school/?q=27&show_svg=1")
    chat = gr.ChatInterface(fn=moya_bot, title="Moya Chat - TEXT ONLY (<160 chars)")
    with gr.Row():
        q_input = gr.Textbox(label="Enter Q ID to audit (e.g. 27)", value="27")
        btn = gr.Button("Run 14 Agent Audit")
        out = gr.Textbox(label="14 Agent Report", lines=20)
        btn.click(fn=run_14_audit, inputs=[q_input], outputs=[out])
    gr.Markdown("## How to demo to client:\n1. Type YES I made rope\n2. Click Run 14 Agent Audit\n3. Show SVG link: ronaldo-hub.github.io/ernies-driving-school/?q=27&show_svg=1")

demo.launch(share=True, server_name="0.0.0.0", server_port=7860)
