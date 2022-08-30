from models.user import User;
import hmac
users = [User(1, 'lang_tools', 'VeDJvcvB0uiQ1Hd')]

#Setting up user mapping
username_mapping = {
   u.username: u for u in users
}

userid_mapping = {
   u.id: u for u in users
}
#This function will authenticate the user. 
def authenticate(username,password):
    user=username_mapping.get(username,None);
    if user and hmac.compare_digest(user.password, password):
        return user
        
#THis function will create the identify
def identity(payload):
    user_id=payload['identity']
    return userid_mapping.get(user_id,None)