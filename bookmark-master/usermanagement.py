import os
import json
import shutil
import glob

def createUser(username, password, email, personname, company):

    path = './Database/Users/'+username

    if os.path.exists(path):
        return False, "User already exists in database"

    try:  
        os.mkdir(path)
        os.mkdir(path+'/AccountDetails')
        os.mkdir(path+'/Videos')
        os.mkdir(path+'/LiveTranscripts')

        details={
            "username" : username,
            "password" : password,
            "email" : email,
            "personName" : personname,
            "company" : company,
            "videocount" : 0,
            "transcriptcount" : 0,
            "lastactivity" : "Account never used",
            "lastVideo" : "None",
            "lastNote" : "None"
        }

        userjson = json.dumps(details, indent=4)
        with open (path+"/AccountDetails/userdetails.json", "w") as outfile:
            outfile.write(userjson)
    
        
    except OSError as error:  
        print(error)
        return False, "Internal Error"
    
    return True, "Succesfully created new user "+username

def getUserDetails(username):
    path = './Database/Users/'+username
    with open(path+'/AccountDetails/userdetails.json', 'r') as openfile:
        userjson = json.load(openfile)
        name = userjson['personName']
        email = userjson['email']
        company = userjson['company']
        videocount = userjson['videocount']
        transcriptcount = userjson['transcriptcount']
        lastactivity = userjson['lastactivity']
        lastvideo = userjson['lastVideo']
        lastNote = userjson['lastNote']

        return name, email, company, videocount, transcriptcount, lastactivity, lastvideo, lastNote


def signinuser(username, password):
    path = './Database/Users/'+username
    if os.path.exists(path):
        with open(path+'/AccountDetails/userdetails.json', 'r') as openfile:
            userjson = json.load(openfile)
            pw = userjson['password']
            if pw==password:
                return True, "Succesfully signed in to TheBookmark"
            else:
                return False, "Invalid password. Please try again" 
    else:
        return False, "User is not registered to TheBookmark"
    
def deleteAllUsers():
    path = './Database/Users/'
    shutil.rmtree(path)
    os.mkdir(path)
    return True, "All users are deleted from the database"

def saveFile(username, file, title, description, keywords):
    #print(username)
    #print(file)

    path = './Database/Users/'+username

    if os.path.exists(path):
        with open(path+'/AccountDetails/userdetails.json', 'r') as openfile:
            userjson = json.load(openfile)
            username = userjson['username']
            password = userjson['password']
            email = userjson['email']
            personName = userjson['personName']
            company = userjson['company']           
            videocount = userjson['videocount'] + 1
            transcriptcount = userjson['transcriptcount']
            lastactivity = userjson['lastactivity']
            lastVideo = userjson['lastVideo']
            lastNote = userjson['lastNote']

            details={
                "username" : username,
                "password" : password,
                "email" : email,
                "personName" : personName,
                "company" : company,
                "videocount" : videocount,
                "transcriptcount" : transcriptcount,
                "lastactivity" : lastactivity,
                "lastVideo" : lastVideo,
                "lastNote" : lastNote
            }

            os.mkdir(path+'/Videos/Video '+str(videocount))
            vpath = path+'/Videos/Video '+str(videocount)
            file.save(os.path.join(path+'/Videos/Video '+str(videocount), 'video.mp4'))
            
            #print(title, description)

        with open (path+"/AccountDetails/userdetails.json", "w") as outfile:
            userjson = json.dumps(details, indent=4)
            #print(userjson)
            outfile.write(userjson)

        with open(vpath+"/videodetails.json", "w") as voutfile:
            vdetails = {
                "username" : username,
                "videono" : videocount,
                "title" : title,
                "description" : description,
                "keywords" : keywords,
                "savestatus"  : "Done",
                "audiosavedstatus" : "Not Done",
                "assemblystatus" : "Not Done",
                "transcriptstatus" : "Not Done",
                "summarystatus" : "Not Done"
            } 
            vjson = json.dumps(vdetails, indent=4)
            voutfile.write(vjson)
    else:
        return False, "User is not registered to TheBookmark", -1

    #print("As of now user has "+str(videocount))

    


    return True, "Video is stored succesfully", videocount

def updateProfile(username, email, personName, company, currentPassword, newPassword):
    path = './Database/Users/'+username
    if os.path.exists(path):
        with open(path+'/AccountDetails/userdetails.json', 'r') as openfile:
            userjson = json.load(openfile)
            password = userjson['password']          
            videocount = userjson['videocount']
            transcriptcount = userjson['transcriptcount']
            lastactivity = userjson['lastactivity']
            lastVideo = userjson['lastVideo']
            lastNote = userjson['lastNote']

            if password==currentPassword:
                if newPassword!="":
                    password=newPassword 
            else:
                return False, "Invalid password. Confirm your password for profile details change." 
        
        details={
                "username" : username,
                "password" : password,
                "email" : email,
                "personName" : personName,
                "company" : company,
                "videocount" : videocount,
                "transcriptcount" : transcriptcount,
                "lastactivity" : lastactivity,
                "lastVideo" : lastVideo,
                "lastNote" : lastNote
            }

        with open (path+"/AccountDetails/userdetails.json", "w") as outfile:
            userjson = json.dumps(details, indent=4)
            #print(userjson)
            outfile.write(userjson)
        return True, "Profile Updation is succesful!"
    else:
        return False, "User is not registered to TheBookmark"

def giveAllVideoDetails(username):
    path = './Database/Users/'+username+'/Videos'
    videoJson = {}

    for root, dirs, files in os.walk(path):
        relpath = os.path.relpath(root,path)

        if relpath!=".":
            videoJson[relpath] = {}
            jsonfile = root+'/videodetails.json'
            transcriptfile = root+'/transcribedtext.txt'
            summaryfile = root+'/summarizedtext.txt'

            with open(jsonfile, 'r') as openfile:
                videodetails = json.load(openfile)
                #print(videodetails)
            
            try:
                with open(transcriptfile, 'r') as openfile:
                    trns = openfile.read()
                    #print(trns)
            except:
                trns = "Under Progress"

            try:
                with open(summaryfile, 'r') as openfile:
                    summ = openfile.read()
                    #print(openfile)     
            except:
                trns = "Under Progress"  

            videoJson[relpath]['details'] = videodetails
            videoJson[relpath]['transcript'] = trns
            videoJson[relpath]['summary'] = summ


    #print(videoJson)

    return videoJson
