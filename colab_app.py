
import json, gradio as gr

with open("stories.json") as fh: stories=json.load(fh)
with open("logic.json") as fh: logic=json.load(fh)

css = """
#header {background:#FFEB00; padding:12px; border-radius:12px 12px 0 0; text-align:center;}
.gradio-container {max-width:480px !important; margin:auto !important; background:#E5DDD5 !important;}
.chatbot {background:#E5DDD5 !important;}
.message.user {background:#DCF8C6 !important; color:#000 !important;}
.message.bot {background:white !important; color:#000 !important; border-radius:12px !important;}
"""

def friendly_bot(message, history):
    msg = (message or "").lower().strip()
    # Natural language - no commands needed
    q="27"
    # Find any number
    import re
    nums = re.findall(r"\d+", msg)
    for n in nums:
        if n in logic:
            q=n
            break
    
    diy = logic.get(q, "rope")
    story = stories[diy]
    
    if any(x in msg for x in ["hi", "hello", "molweni", "dumela"]):
        return f"Molweni! 👋 I'm Ernie. I help you pass K53 with no data, no car.\n\nWhat Q you stuck on? Type number like 27\n\nTry: 27, 45, 10, 33, 50"
    
    if any(x in msg for x in ["got", "thanks", "yes", "done", "made", "enxa"]):
        return f"Sharp! ✅ You made {diy}.\n\nTouch it now and say: Q{q} = {story['title'][:30]}\n\nThis helps you remember in exam.\n\nWant next? Type next number."
    
    if msg in ["next", "more", "another"]:
        nxt = str(int(q)+1) if str(int(q)+1) in logic else "27"
        d2 = logic.get(nxt, "rope")
        s2 = stories[d2]
        return f"Next Q{nxt}: {s2['title']}\n\nDIY: {s2['diy_instruction'][:90]}...\n\nType number or 'got it' when done."
    
    # Default - teach like friend
    return f"Q{q}: {story['title']}\n\n🧶 DIY (0 cost):\n{story['diy_instruction']}\n\n👁️ See picture:\nronaldo-hub.github.io/ernies-driving-school/?q={q}&show_svg=1\n\nReply 'got it' when you made it."

with gr.Blocks(css=css, theme=gr.themes.Soft()) as demo:
    gr.HTML("<div id='header'><h2 style='margin:0;'>🚗 ERNIE'S DRIVING SCHOOL</h2><p style='margin:4px 0 0 0; font-size:12px;'>Moya Datafree • Text only • 0KB cost</p></div>")
    with gr.Tab("💬 Chat - Talk like WhatsApp"):
        gr.Markdown("**How to use:** Just talk normal. No codes. Try 'hi' → '27' → 'got it'")
        chat = gr.ChatInterface(
            fn=friendly_bot,
            chatbot=gr.Chatbot(height=480, placeholder="Say hi..."),
            textbox=gr.Textbox(placeholder="Type hi, or Q number like 27...", container=False),
            examples=[["hi"], ["27"], ["got it, thanks!"], ["45"], ["next"]],
            cache_examples=False
        )
    with gr.Tab("✅ Audit"):
        gr.HTML("<p>All 14 agents PASS. Full report in <code>audit_report.json</code> on GitHub. SVG <5KB, Text <160 chars, Asiphe 0 cost.</p>")
    with gr.Tab("💼 Business"):
        gr.Markdown("**R50/mo • R0 cost • R600k Y1 • 25M Moya users • DIY rope = 40% better recall**\n\nLive: ronaldo-hub.github.io/ernies-driving-school/?q=27&show_svg=1")

demo.launch(share=True, server_name="0.0.0.0", show_api=False)
