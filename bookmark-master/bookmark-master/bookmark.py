import subprocess
import assemblyai as aai
import json
import sys
import time
import requests
import summarize

token = '23e4051922b3436f8bffb686620af2e2'
ai = aai.Client(token=token)

def saveAudio(username, video):
    vpath = "Database/Users/"+username+"/Videos/Video "+str(video)
    command = 'ffmpeg -i "Database/Users/'+username+'/Videos/Video '+str(video)+'/video.mp4" -vn -ab 160k -ac 1 -ar 44100 -vn "Database/Users/'+username+'/Videos/Video '+str(video)+'/audio.mp3"'
    subprocess.call(command, shell=True)

    with open(vpath+"/video"+str(video)+"details.json", "r") as readfile:
        vjson = json.load(readfile)
        username = vjson['username']
        videono = vjson['videono']
        savestatus = vjson['savestatus']
        audiosavedstatus = vjson['audiosavedstatus']
        assemblystatus = vjson['assemblystatus']
        transcriptstatus = vjson['transcriptstatus']
        summarystatus = vjson['summarystatus']

    with open(vpath+"/video"+str(video)+"details.json", "w") as outfile:
        vdetails = {
                "username" : username,
                "videono" : videono,
                "savestatus"  : savestatus,
                "audiosavedstatus" : "Done",
                "assemblystatus" : assemblystatus,
                "transcriptstatus" : transcriptstatus,
                "summarystatus" : summarystatus
            }
        vjson = json.dumps(vdetails, indent=4)
        outfile.write(vjson)
    return True



def uploadToAAI(username, video):
    vpath = "Database/Users/"+username+"/Videos/Video "+str(video)
    filename = vpath+'/audio.mp3'
    headers = {'authorization': token}
    response = requests.post('https://api.assemblyai.com/v2/upload',
                         headers=headers,
                         data=read_file(filename))
    #print(response)

    with open(vpath+"/video"+str(video)+"details.json", "r") as readfile:
        vjson = json.load(readfile)
        username = vjson['username']
        videono = vjson['videono']
        savestatus = vjson['savestatus']
        audiosavedstatus = vjson['audiosavedstatus']
        assemblystatus = vjson['assemblystatus']
        transcriptstatus = vjson['transcriptstatus']
        summarystatus = vjson['summarystatus']

    with open(vpath+"/video"+str(video)+"details.json", "w") as outfile:
        vdetails = {
                "username" : username,
                "videono" : videono,
                "savestatus"  : savestatus,
                "audiosavedstatus" : audiosavedstatus,
                "assemblystatus" : "Done",
                "transcriptstatus" : transcriptstatus,
                "summarystatus" : summarystatus
            }
        vjson = json.dumps(vdetails, indent=4)
        outfile.write(vjson)


    return response.json()['upload_url']



def speechToTextAAI(username, video, url):
    vpath = "Database/Users/"+username+"/Videos/Video "+str(video)
    transcript = ai.transcribe(url)
    while transcript.status != 'completed':
        transcript = transcript.get()
    text = transcript.text
    with open(vpath+'/transcribedtext.txt', 'w') as outfile:
        outfile.write(text)

    with open(vpath+"/video"+str(video)+"details.json", "r") as readfile:
        vjson = json.load(readfile)
        username = vjson['username']
        videono = vjson['videono']
        savestatus = vjson['savestatus']
        audiosavedstatus = vjson['audiosavedstatus']
        assemblystatus = vjson['assemblystatus']
        transcriptstatus = vjson['transcriptstatus']
        summarystatus = vjson['summarystatus']

    with open(vpath+"/video"+str(video)+"details.json", "w") as outfile:
        vdetails = {
                "username" : username,
                "videono" : videono,
                "savestatus"  : savestatus,
                "audiosavedstatus" : audiosavedstatus,
                "assemblystatus" : assemblystatus,
                "transcriptstatus" : "Done",
                "summarystatus" : summarystatus
            }
        vjson = json.dumps(vdetails, indent=4)
        outfile.write(vjson)

    return True, text

def summarizeText(username, video, text):
    vpath = "Database/Users/"+username+"/Videos/Video "+str(video)
    freq_table = summarize._create_frequency_table(text)
    sentences = summarize.sent_tokenize(text)
    sentence_scores = summarize._score_sentences(sentences, freq_table)
    threshold = summarize._find_average_score(sentence_scores)
    summary = summarize._generate_summary(sentences, sentence_scores, threshold*0.8)
    with open(vpath+'/summarizedtext.txt', 'w') as outfile:
        outfile.write(summary)
    return True, summary

## HELPER
def read_file(filename, chunk_size=5242880):
    with open(filename, 'rb') as _file:
        while True:
            data = _file.read(chunk_size)
            if not data:
                break
            yield data


    
