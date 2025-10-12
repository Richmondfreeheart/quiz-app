import { useState, useEffect } from "react";

function QuizStart({ startQuiz }) {
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({
    amount: 5,
    category: "",
    difficulty: "easy",
  });

  // Fetch categories from API
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://opentdb.com/api.php?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => startQuiz(data.results));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Start Quiz</h2>

      <label>
        Number of Questions:
        <input
          type="number"
          name="amount"
          min="1"
          max="20"
          value={settings.amount}
          onChange={handleChange}
        />
      </label>

      <label>
        Category:
        <select name="category" onChange={handleChange}>
          <option value="">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Difficulty:
        <select name="difficulty" onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <button type="submit">Start</button>
    </form>
  );
}

export default QuizStart;
