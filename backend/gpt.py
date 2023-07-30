import openai
from openai.error import OpenAIError
from flask import (
    Flask,
    request,
    render_template,
    session,
    redirect,
    url_for,
    jsonify,
    make_response,
)
from werkzeug.utils import secure_filename
import os
import PyPDF2
from flask import flash


UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), "uploads")

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.secret_key = os.urandom(24)


def extract_text_from_pdf(file_path):
    pdf_file_obj = open(file_path, "rb")
    pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
    text = ""
    for page_num in range(len(pdf_reader.pages)):
        page_obj = pdf_reader.pages[page_num]
        text += page_obj.extract_text()
    pdf_file_obj.close()
    return text


@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        if "pdf_file" not in request.files:
            return render_template("index.html", error="No file part")

        file = request.files["pdf_file"]
        model_choice = request.form["model_choice"]
        api_key = request.form["api_key"]

        if model_choice == "gpt3" and not api_key:
            return render_template("index.html", error="API key is required for GPT-3.")
        if file.filename == "":
            return render_template("index.html", error="No selected file")

        if file and file.filename.lower().endswith(".pdf"):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)
            text = extract_text_from_pdf(file_path)
            session["text"] = text
            session["model_choice"] = model_choice
            session["api_key"] = api_key
            return redirect(url_for("ask_question"))
        else:
            return render_template("index.html", error="Invalid file type")

    return render_template("index.html")


def ask_gpt3(question, document, user_api_key):
    openai.api_key = user_api_key

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=document + "\n\n" + question,
            temperature=0.5,
            max_tokens=100,
        )
    except OpenAIError as e:
        flash(f"Error: {e}")
        return None
    return response.choices[0].text.strip()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/ask", methods=["GET", "POST"])
def ask_question():
    if request.method == "POST":
        question = request.form["question"]
        text = session.get("text")
        model_choice = session.get("model_choice")
        api_key = session.get("api_key")

        # Check if the API key exists
        if not api_key:
            return jsonify({"error": "API key is required for GPT-3."}), 400

        if not text:
            return (
                jsonify(
                    {"error": "No text available to answer questions about right now."}
                ),
                400,
            )

        if model_choice == "gpt3":
            answer = ask_gpt3(question, text, api_key)
            if answer is None:
                return (
                    jsonify({"error": "Could not get an answer. Please try again."}),
                    400,
                )
        else:
            # handle other models here
            pass

        qa_pairs = session.get("qa_pairs", [])
        qa_pairs.append((question, answer))
        session["qa_pairs"] = qa_pairs  # save the updated qa_pairs back to the session
        return jsonify(question=question, answer=answer)
    else:
        qa_pairs = session.get("qa_pairs", [])
        return render_template("ask.html", qa_pairs=qa_pairs)


@app.route("/export", methods=["GET"])
def export_conversation():
    qa_pairs = session.get("qa_pairs", [])
    conversation = "\n".join(f"Q: {q}\nA: {a}" for q, a in qa_pairs)
    response = make_response(conversation)
    response.headers["Content-Disposition"] = "attachment; filename=conversation.txt"
    return response


if __name__ == "__main__":
    app.run(debug=True)
