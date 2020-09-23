import os
import json
import shutil

def createUser(username, password):

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
            "videocount" : 0,
            "transcriptcount" : 0
        }

        userjson = json.dumps(details, indent=4)
        with open (path+"/AccountDetails/userdetails.json", "w") as outfile:
            outfile.write(userjson)
    
        
    except OSError as error:  
        print(error)
        return False, "Internal Error"
    
    return True, "Succesfully created new user "+username


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

def saveFile(username, file):
    #print(username)
    #print(file)

    path = './Database/Users/'+username

    if os.path.exists(path):
        with open(path+'/AccountDetails/userdetails.json', 'r') as openfile:
            userjson = json.load(openfile)
            username = userjson['username']
            password = userjson['password']            
            videocount = userjson['videocount'] + 1
            transcriptcount = userjson['transcriptcount']

            details={
                "username" : username,
                "password" : password,
                "videocount" : videocount,
                "transcriptcount" : transcriptcount
            }

            os.mkdir(path+'/Videos/Video '+str(videocount))
            vpath = path+'/Videos/Video '+str(videocount)
            file.save(os.path.join(path+'/Videos/Video '+str(videocount), 'video.mp4'))
            

        with open (path+"/AccountDetails/userdetails.json", "w") as outfile:
            userjson = json.dumps(details, indent=4)
            #print(userjson)
            outfile.write(userjson)

        with open(vpath+"/video"+str(videocount)+"details.json", "w") as voutfile:
            vdetails = {
                "username" : username,
                "videono" : videocount,
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
