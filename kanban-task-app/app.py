from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
from pathlib import Path

app = Flask(__name__)
DB_PATH = Path('/data/kanban.db')
STATUSES = ['todo', 'doing', 'done']


def get_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        conn.execute(
            '''
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT DEFAULT '',
                status TEXT NOT NULL DEFAULT 'todo',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            '''
        )
        conn.commit()


@app.before_request
def ensure_db():
    init_db()


@app.route('/')
def index():
    with get_db() as conn:
        tasks = conn.execute('SELECT * FROM tasks ORDER BY created_at DESC, id DESC').fetchall()
    grouped = {status: [] for status in STATUSES}
    for task in tasks:
        grouped.get(task['status'], grouped['todo']).append(task)
    return render_template('index.html', grouped=grouped, statuses=STATUSES)


@app.route('/tasks', methods=['POST'])
def create_task():
    title = request.form.get('title', '').strip()
    description = request.form.get('description', '').strip()
    status = request.form.get('status', 'todo')
    if title and status in STATUSES:
        with get_db() as conn:
            conn.execute(
                'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
                (title, description, status),
            )
            conn.commit()
    return redirect(url_for('index'))


@app.route('/tasks/<int:task_id>', methods=['POST'])
def update_task(task_id):
    title = request.form.get('title', '').strip()
    description = request.form.get('description', '').strip()
    status = request.form.get('status', 'todo')
    if title and status in STATUSES:
        with get_db() as conn:
            conn.execute(
                'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
                (title, description, status, task_id),
            )
            conn.commit()
    return redirect(url_for('index'))


@app.route('/tasks/<int:task_id>/status', methods=['POST'])
def update_status(task_id):
    data = request.get_json(silent=True) or {}
    status = data.get('status')
    if status not in STATUSES:
        return jsonify({'error': 'Invalid status'}), 400
    with get_db() as conn:
        conn.execute('UPDATE tasks SET status = ? WHERE id = ?', (status, task_id))
        conn.commit()
    return jsonify({'ok': True})


@app.route('/tasks/<int:task_id>/delete', methods=['POST'])
def delete_task(task_id):
    with get_db() as conn:
        conn.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
        conn.commit()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
