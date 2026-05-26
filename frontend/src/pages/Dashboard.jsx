import { useState } from "react";
import API from "../services/api";

export default function Dashboard() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    interests: "",
    career_goal: "",
    cgpa: ""
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(","),
      interests: formData.interests.split(","),
      cgpa: parseFloat(formData.cgpa)
    };

    try {

      const response = await API.post("/student", payload);

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Error saving profile");

    }
  };

  const handleGetRecommendations = async () => {
    setRecommendationError("");
    setRecommendations([]);

    if (!formData.email) {
      setRecommendationError("Please enter your email first.");
      return;
    }

    setLoadingRecommendations(true);

    try {
      const response = await API.get(`/recommend/${encodeURIComponent(formData.email)}`);
      setRecommendations(response.data?.recommended_careers || []);

      if (!response.data?.recommended_careers?.length) {
        setRecommendationError("No recommendations found for this student yet.");
      }
    } catch (error) {
      console.log(error);
      setRecommendationError("Error fetching career recommendations.");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Profile
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="interests"
            placeholder="Interests (comma separated)"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="career_goal"
            placeholder="Career Goal"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            type="number"
            name="cgpa"
            placeholder="CGPA"
            className="border p-2"
            onChange={handleChange}
          />

          <button className="bg-blue-500 text-white p-2 rounded">
            Save Profile
          </button>

          <button
            type="button"
            onClick={handleGetRecommendations}
            className="bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition"
            disabled={loadingRecommendations}
          >
            {loadingRecommendations ? "Getting Recommendations..." : "Get Career Recommendations"}
          </button>

          {recommendationError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">
              {recommendationError}
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
              <h2 className="text-lg font-semibold text-emerald-900 mb-3">
                Recommended Careers
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {recommendations.map((career, index) => (
                  <div
                    key={`${career}-${index}`}
                    className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                          Recommendation {index + 1}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-gray-900">
                          {career}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </form>

    </div>
  );
}