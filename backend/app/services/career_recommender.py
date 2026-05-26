def recommend_career(student):

    skills = [skill.lower() for skill in student["skills"]]

    interests = [interest.lower() for interest in student["interests"]]

    recommendations = []

    if "python" in skills and "ai" in interests:
        recommendations.append("AI Engineer")

    if "react" in skills or "web development" in interests:
        recommendations.append("Frontend Developer")

    if "data analysis" in interests:
        recommendations.append("Data Analyst")

    if "cloud" in interests:
        recommendations.append("Cloud Engineer")

    if "cybersecurity" in interests:
        recommendations.append("Cybersecurity Analyst")

    if not recommendations:
        recommendations.append("Software Engineer")

    return recommendations