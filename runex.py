# file: app.py
from flask import Flask, request, jsonify
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)

RECEIVER_EMAIL = "kseekoei023@student.wethinkcode.co.za"  
SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY"  # keep this safe

@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject", "No Subject")
    message = request.form.get("message")

    # Construct the email
    content = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    mail = Mail(
        from_email=email,  # the sender filled in the form
        to_emails=RECEIVER_EMAIL,
        subject=f"Contact Form: {subject}",
        plain_text_content=content
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(mail)
        return jsonify({"message": "Message sent successfully!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to send message."}), 500

if __name__ == "__main__":
    app.run(debug=True)
