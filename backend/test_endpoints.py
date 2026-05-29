import json
import urllib.request
import urllib.error

def post_student():
    url = 'http://127.0.0.1:8000/student'
    data = {
        'name': 'Test Student',
        'email': 'test_student@example.com',
        'department': 'CS',
        'skills': ['Python', 'React'],
        'interests': ['AI', 'web development'],
        'career_goal': 'Developer',
        'cgpa': 3.8
    }
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            print('POST /student ->', resp.read().decode())
    except urllib.error.HTTPError as e:
        print('POST /student error:', e.code, e.read().decode())
    except Exception as e:
        print('POST /student failed:', e)

def get_recommend(email):
    url = f'http://127.0.0.1:8000/recommend/{email}'
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            print('GET /recommend ->', resp.read().decode())
    except urllib.error.HTTPError as e:
        print('GET /recommend error:', e.code, e.read().decode())
    except Exception as e:
        print('GET /recommend failed:', e)

if __name__ == '__main__':
    post_student()
    get_recommend('test_student@example.com')

    # Second test: only Python skill and AI interest
    data2 = {
        'name': 'AI Only',
        'email': 'ai_only@example.com',
        'department': 'CS',
        'skills': ['Python'],
        'interests': ['AI'],
        'career_goal': 'AI',
        'cgpa': 3.7
    }
    req2 = urllib.request.Request('http://127.0.0.1:8000/student', data=json.dumps(data2).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req2, timeout=10) as resp:
            print('POST /student (ai_only) ->', resp.read().decode())
    except Exception as e:
        print('POST (ai_only) failed:', e)

    get_recommend('ai_only@example.com')
