from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///skills.db'
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    platform = db.Column(db.String(50))
    resource_type = db.Column(db.String(50))
    status = db.Column(db.String(20))
    hours = db.Column(db.Float)
    notes = db.Column(db.Text)
    difficulty = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    category = db.Column(db.String(50))



@app.route('/skills', methods=['POST'])
def add_skill():
    data = request.json
    category = 'Programming' if 'python' in data['name'].lower() else 'General'
    new_skill = Skill(
        name=data['name'],
        platform=data['platform'],
        resource_type=data['resource_type'],
        status='started',
        hours=data.get('hours', 0),
        notes=data.get('notes', ''),
        difficulty=data.get('difficulty', 3),
        category=category
    )
    db.session.add(new_skill)
    db.session.commit()
    return jsonify({'message': 'Skill added successfully'})

@app.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'platform': s.platform,
        'resource_type': s.resource_type,
        'status': s.status,
        'hours': s.hours,
        'notes': s.notes,
        'difficulty': s.difficulty,
        'category': s.category,
        'created_at': s.created_at.strftime('%Y-%m-%d')
    } for s in skills])

@app.route('/skills/<int:id>', methods=['PATCH'])
def update_skill(id):
    data = request.json
    skill = Skill.query.get_or_404(id)
    skill.status = data.get('status', skill.status)
    skill.hours = data.get('hours', skill.hours)
    skill.notes = data.get('notes', skill.notes)
    db.session.commit()
    return jsonify({'message': 'Skill updated successfully'})

@app.route('/dashboard', methods=['GET'])
def dashboard():
    skills = Skill.query.all()
    summary = {'started': 0, 'in-progress': 0, 'completed': 0, 'total_hours': 0}
    for s in skills:
        if s.status in summary:
            summary[s.status] += 1
        summary['total_hours'] += s.hours
    return jsonify(summary)

if __name__ == '__main__':
    print("✅ Flask server is running...")
    app.run(debug=True)