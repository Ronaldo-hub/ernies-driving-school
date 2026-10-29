
import json, gradio as gr, re
with open("stories.json") as fh: stories=json.load(fh)
with open("logic.json") as fh: logic=json.load(fh)

css = """
body {background:#E5F0FF !important;}
.gradio-container {max-width:480px !important; margin:auto !important; background:#E5F0FF !important;}
#top {background:white !important; padding:12px !important; border-bottom:1px solid #ddd !important; display:flex !important; align-items:center !important; gap:10px !important;}
.chatbot {background:#E5F0FF !important; border:none !important;}
.message {color:black !important; font-size:14px !important;}
.message.bot {background:white !important; color:black !important; border-radius:12px !important; max-width:85% !important;}
.message.user {background:#DCF8C6 !important; color:black !important; border-radius:12px !important; max-width:85% !important; margin-left:auto !important;}
"""

def bot(msg, hist):
    q = re.sub(r"\D","", msg or "") or "27"
    if q not in logic: q="27"
    st = stories[logic[q]]
    if msg.lower().strip() in ["hi","hello","a","yebo","1","2","3","4","5","6","7","8"]:
        return f"A = Yebo, let's go\n\nWhat would you like to use Ernie's for?\n\n1 = Colours\n2 = Road Signs\n3 = Rules\n4 = DIY Games\n5 = Jobs\n6 = Health Safe\n7 = Shopping rope\n8 = Education - 68 Qs\n\nType 8 or type Q number like 27"
    return f"Q{q}: {st['title']}\n\n{st['diy_instruction']}\n\nSVG: ronaldo-hub.github.io/ernies-driving-school/?q={q}&show_svg=1\n\nType 8 for menu"

with gr.Blocks(css=css) as demo:
    gr.HTML("<div id='top'><span>←</span><span style='width:36px;height:36px;background:#FFEB00;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;'>🚗</span><h2 style='flex:1;margin:0 10px;font-size:15px;'>Ernie from Driving School</h2><span>🔍</span><span>⋮</span></div>")
    gr.ChatInterface(fn=bot, chatbot=gr.Chatbot(height=550, placeholder="Moya style chat..."), textbox=gr.Textbox(placeholder="Type a message... e.g. 8 or 27"), examples=[["A"],["8"],["27"],["45"],["1"]])
demo.launch(share=True, server_name="0.0.0.0", css=css, theme=gr.themes.Soft())
