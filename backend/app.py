from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, get_jwt_identity,create_access_token,jwt_required,get_jwt
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS
import os



app=Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)




app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///app.db'
app.config['JWT_SECRET_KEY'] = 'SuperKey' 
jwt=JWTManager(app)
db=SQLAlchemy(app)
print("DB Path:", os.path.abspath("app.db"))

class User(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(200), nullable=False, unique=True)
    password=db.Column(db.String(400), nullable=False)
    notes=db.relationship('Notes', backref='user',lazy=True)
    def __repr__(self):
        return f"<User {self.email}>"
    
class Notes(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(200))
    content=db.Column(db.Text)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)

@app.route('/debug-token', methods=['GET'])
@jwt_required()
def debug_token():
    identity = get_jwt_identity()
    claims = get_jwt()
    return jsonify({"identity": identity, "claims": claims})

    
@app.route('/signup',methods=['POST'])
def signup():
    try:
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')
       
        
        if not email or not password:
            return {'error':'Email and Password required'},400
        
        existing_user=User.query.filter_by(email=email).first()
        if existing_user:
            return {'message':'Account already created'}, 409
        hashed_password=generate_password_hash(password)
        user=User(email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User account created'}), 201
    except Exception as e:
        return {'error':'Something went wrong'},500



@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')    
    user=User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password,password):
        return {'error':'Invalid credentials'},401
    
    access_token=create_access_token(identity=str(user.id))
    return jsonify({'token':access_token}),200




@app.route('/note',methods=['POST'])
@jwt_required()
def add_note():
    user_id=get_jwt_identity()
    user=User.query.filter_by(id=user_id).first()
    data=request.get_json()
    print('Incoming data: ',data)
    title=data.get('title')
    content=data.get('content')
    
    note=Notes(title=title, content=content, user_id=user.id)
    db.session.add(note)
    db.session.commit()

    return jsonify({'message':'Note Added'}),201

@app.route('/notes',methods=['GET'])
@jwt_required()
def get_notes():
    user_id=int(get_jwt_identity())
    user=User.query.filter_by(id=user_id).first()
    notes=Notes.query.filter_by(user_id=user.id).all()
    notes_data=[{'id':n.id,'title':n.title, 'content':n.content} for n in notes]
    return jsonify(notes_data),200


@app.route('/update/<int:sno>',methods=['POST'])
@jwt_required()
def update_notes(sno):
    user_id=get_jwt_identity()
    user=User.query.filter_by(id=user_id).first()
    data=request.get_json()
    title=data.get('title')
    content=data.get('content')

    note=Notes.query.filter_by(id=sno,user_id=user.id).first()
    if not note:
        return jsonify({"error":"Note not found"}),404
    
    note.title=title
    note.content=content
    db.session.commit()
    return jsonify({"message": "Note updated successfully"}), 200


@app.route('/delete/<int:sno>',methods=['DELETE'])
@jwt_required()
def delete(sno):
    user_id=get_jwt_identity()
    user=User.query.filter_by(id=user_id).first()
    note=Notes.query.filter_by(id=sno,user_id=user.id).first()
    if not note:
        return jsonify({"error":"Note not found"}),404
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message":"deleted"})


if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=False)