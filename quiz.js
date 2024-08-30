// Define the Quiz class
class Quiz {
    constructor() {
      this.questions = []; // Array to store questions
      this.sessions = {}; // Object to map userId to their quiz session data
      this.results = {}; // Object to store quiz results for users
    }
  
    // Method to add a question to the quiz
    addQuestion(questionText, options, correctOption) {
      const question = {
        questionText,
        options,
        correctOption
      };
      this.questions.push(question);
    }
  
    // Method to start a quiz session for a specific user
    startQuiz(userId) {
      this.sessions[userId] = {
        currentQuestionIndex: 0,
        answers: []
      };
    }
  
    // Method to submit answers and calculate the score
    submitAnswers(userId, userAnswers) {
      const session = this.sessions[userId];
      if (!session) {
        console.log(`No quiz session found for userId: ${userId}`);
        return;
      }
  
      let score = 0;
      session.answers = userAnswers;
  
      userAnswers.forEach((answer, index) => {
        if (answer === this.questions[index].correctOption) {
          score++;
        }
      });
  
      this.storeResults(userId, score);
    }
  
    // Method to display correct and incorrect answers for a specific user
    displayResults(userId) {
      const session = this.sessions[userId];
      if (!session) {
        console.log(`No quiz session found for userId: ${userId}`);
        return;
      }
  
      const results = {
        correctAnswers: [],
        incorrectAnswers: []
      };
  
      session.answers.forEach((answer, index) => {
        if (answer === this.questions[index].correctOption) {
          results.correctAnswers.push(this.questions[index]);
        } else {
          results.incorrectAnswers.push(this.questions[index]);
        }
      });
  
      return results;
    }
  
    // Method to store the user's quiz results
    storeResults(userId, score) {
      this.results[userId] = score;
    }
  }
  
  // Example usage
  const quiz = new Quiz();
  
  // Adding questions to the quiz
  quiz.addQuestion("What is the capital of France?", ["Paris", "London", "Berlin", "Madrid"], 0);
  quiz.addQuestion("What is 2 + 2?", ["3", "4", "5", "6"], 1);
  quiz.addQuestion("What is the capital of Japan?", ["Beijing", "Seoul", "Tokyo", "Bangkok"], 2);
  
  // Starting a quiz session for a user
  quiz.startQuiz("user1");
  
  // Submitting answers for the user
  quiz.submitAnswers("user1", [0, 1, 2]);
  
  // Displaying results for the user
  const results = quiz.displayResults("user1");
  console.log(results); // Output: { correctAnswers: [...], incorrectAnswers: [...] }
  
  // Storing the user's quiz results
  quiz.storeResults("user1", 3);
  console.log(quiz.results); // Output: { user1: 3 }
  