import subprocess
import assemblyai as aai
ai = aai.Client(token='c126f4a90db14f2c8dca6d7ff7a273f9')

def saveAudio(username, video):
    command = 'ffmpeg -i "Database/Users/'+username+'/Videos/Video '+str(video)+'/video.mp4" -ab 160k -ac 1 -ar 44100 -vn "Database/Users/'+username+'/Videos/Video '+str(video)+'/audio.wav"'
    subprocess.call(command, shell=True)

    return True


def speechToTextAAI(username, video):
    path = "Database/Users/"+username+"/Videos/Video "+str(video)
    transcript = ai.transcribe(path+"/audio.wav")
    while transcript.status != 'completed':
        transcript = transcript.get()
    text = transcript.text
    print(text)

    
