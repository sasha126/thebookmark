from flask import Flask, request
import bookmark
import usermanagement

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

# --------------------------

@app.route('/')
def index():
    return "Hello, welcome to TheBookmark!"

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    username = data['username']
    password = data['password']

    cond, msg = usermanagement.signinuser(username, password)

    if cond:
        return {
            "status" : "Success",
            "condition" : cond,
            "message" : msg
        }
    else:
        return {
            "status" : "Failed",
            "condition" : cond,
            "message" : msg
        }

    return "Done"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    email = data['email']
    personName = data['personName']
    company = data['company']
    
    cond, msg = usermanagement.createUser(username, password, email, personName, company)
    if cond:
        return {
            "status" : "Success",
            "condition" : cond,
            "message" : msg
        }
    else:
        return {
            "status" : "Failed",
            "condition" : cond,
            "message" : msg
        }

@app.route('/deleteAllUsers', methods=['GET'])
def deleteAllUsers():  
    cond, msg = usermanagement.deleteAllUsers()
    if cond:
        return {
            "status" : "Success",
            "condition" : cond,
            "message" : msg
        }
    else:
        return {
            "status" : "Failed",
            "condition" : cond,
            "message" : msg
        }

@app.route('/receiveVideo', methods=['POST'])
def receiveVideo():
    username = request.form['username']
    receivedfile = request.files['video']
    title = request.form['videotitle']
    description = request.form['videodescription']
    keywords = request.form['videokeyword']

    cond, msg, videonum = usermanagement.saveFile(username, receivedfile, title, description, keywords)
    bookmark.saveAudio(username, videonum)
    url = bookmark.uploadToAAI(username, videonum)
    cond, msg = bookmark.speechToTextAAI(username, videonum, url)
    cond, msg1 = bookmark.summarizeText(username, videonum, msg)
    
    if cond:
        return {
            "status" : "Success",
            "condition" : cond,
            "message" : msg,
            "summary" : msg1,
            "title" : title,
            "description" : description
        }
    else:
        return {
            "status" : "Failed",
            "condition" : cond,
            "message" : msg,
            "summary" : "Server had some errors",
            "title" : "Error!",
            "description" : "Internal error, contact bookmark admin!"
        }

@app.route('/standingFunction', methods=['POST'])
def standingFunction():
    username = request.json['username']
    personname, email, company, videocount, transcriptcount, lastactivity, lastvideo, lastnote = usermanagement.getUserDetails(username)
    returnJson = {}
    returnJson['videoDetails'] = usermanagement.giveAllVideoDetails(username)
    returnJson['AccountDetails'] = {
        "username" : username,
        "personName" : personname,
        "email" : email,
        "company" : company,
        "videocount" : videocount,
        "transcriptcount" : transcriptcount,
        "lastactivity" : lastactivity,
        "lastvideo" : lastvideo,
        "lastnotes" : lastnote
    }
    #print(returnJson)
    return returnJson

@app.route('/updateProfile', methods=['POST'])
def updateProfile():
    username = request.json['username']
    email = request.json['email']
    personName = request.json['personName']
    company = request.json['company']
    currentPassword = request.json['currentPassword']
    newPassword = request.json['newPassword']

    cond, msg = usermanagement.updateProfile(username, email, personName, company, currentPassword, newPassword)
    if cond:
        return {
            "status" : "Success",
            "condition" : cond,
            "message" : msg
        }
    else:
        return {
            "status" : "Failed",
            "condition" : cond,
            "message" : msg
        }


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
