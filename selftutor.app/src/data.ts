// Structured lesson topics, flashcards, and quizzes for SelfTutor.APP

export interface Lesson {
  id: string;
  title: string;
  subject: "Maths" | "Science";
  gradeMin: number;
  gradeMax: number;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: string;
  estimatedTime: string;
  notes: {
    simpleExplanation: string;
    exampleBox: {
      title: string;
      content: string;
    };
    formulaBox?: {
      title: string;
      content: string;
    };
    aiTip: string;
  };
  flashcards: {
    front: string;
    back: string;
  }[];
  quiz: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export const AVATARS = [
  { id: "rocket", name: "Rocket Kid", emoji: "🚀", color: "bg-orange-100 border-orange-300 text-orange-600" },
  { id: "explorer", name: "Math Explorer", emoji: "🧭", color: "bg-emerald-100 border-emerald-300 text-emerald-600" },
  { id: "science", name: "Science Star", emoji: "🔬", color: "bg-blue-100 border-blue-300 text-blue-600" },
  { id: "buddy", name: "AI Buddy", emoji: "🤖", color: "bg-purple-100 border-purple-300 text-purple-600" },
  { id: "space", name: "Space Learner", emoji: "🪐", color: "bg-pink-100 border-pink-300 text-pink-600" }
];

export const BADGES = [
  { id: "first-lesson", name: "First Lesson Completed", description: "Completed your first quick lesson!", emoji: "🏅", color: "from-amber-400 to-yellow-500", xp: 100 },
  { id: "quiz-star", name: "Quiz Star", description: "Scored 100% on a Quick Learning Quiz!", emoji: "⭐", color: "from-cyan-400 to-blue-500", xp: 200 },
  { id: "flashcard-hero", name: "Flashcard Hero", description: "Reviewed all flashcards in a topic!", emoji: "🎴", color: "from-emerald-400 to-teal-500", xp: 150 },
  { id: "weakness-fixer", name: "Weakness Fixer", description: "Successfully converted a weakness to a strength!", emoji: "⚡", color: "from-purple-400 to-pink-500", xp: 300 },
  { id: "maths-explorer", name: "Maths Explorer", description: "Studied 3 different Math topics!", emoji: "📐", color: "from-orange-400 to-red-500", xp: 250 },
  { id: "five-day-streak", name: "5-Day Streak", description: "Learned for 5 days in a row!", emoji: "🔥", color: "from-red-500 to-amber-500", xp: 400 },
  { id: "deep-learner", name: "Deep Learner", description: "Completed a full Deep Learning diagnostic loop!", emoji: "🧠", color: "from-indigo-400 to-violet-600", xp: 500 }
];

export const LESSONS: Lesson[] = [
  {
    id: "fractions",
    title: "Introduction to Fractions",
    subject: "Maths",
    gradeMin: 3,
    gradeMax: 6,
    difficulty: "Medium",
    icon: "🍰",
    estimatedTime: "10 mins",
    notes: {
      simpleExplanation: "A fraction is simply a part of a whole! Imagine sharing a delicious chocolate cake with your friends. If you slice the cake into pieces, each piece is a fraction of the cake.",
      exampleBox: {
        title: "The Pizza Part! 🍕",
        content: "If you cut a pizza into 4 equal slices and eat 1 slice, you have eaten 1 out of 4 parts. We write this as 1/4! The remaining parts are 3/4."
      },
      formulaBox: {
        title: "Numerator & Denominator",
        content: "Top Number (Numerator): How many parts we have.\nBottom Number (Denominator): How many equal parts there are in total!"
      },
      aiTip: "To compare fractions, look at the denominator! If the numerator is 1, a smaller denominator means a BIGGER slice. For example, 1/2 is bigger than 1/4 because you share with fewer friends!"
    },
    flashcards: [
      { front: "What is a fraction?", back: "A fraction shows part of a whole. It tells us how many equal pieces of something we have!" },
      { front: "What does the top number (numerator) tell us?", back: "It tells us how many parts we are counting or currently have." },
      { front: "What does the bottom number (denominator) tell us?", back: "It tells us the total number of equal parts the whole is split into." },
      { front: "Which is bigger: 1/3 or 1/5?", back: "1/3 is bigger! Because sharing a candy bar among 3 people gives you a bigger piece than sharing it among 5 people!" }
    ],
    quiz: [
      {
        id: 1,
        question: "In the fraction 3/4, what is the number 3 called?",
        options: ["Denominator", "Numerator", "Whole Number", "Divider"],
        correctAnswer: "Numerator",
        explanation: "The top number is the Numerator. It tells us how many parts we have! The bottom is the denominator."
      },
      {
        id: 2,
        question: "If you divide a cake into 8 equal pieces and eat 3 pieces, what fraction of the cake did you eat?",
        options: ["1/8", "3/8", "5/8", "3/5"],
        correctAnswer: "3/8",
        explanation: "You ate 3 parts out of 8 total parts, which is written as 3/8."
      },
      {
        id: 3,
        question: "Which of the following is the LARGEST fraction?",
        options: ["1/2", "1/4", "1/8", "1/10"],
        correctAnswer: "1/2",
        explanation: "1/2 represents half of the whole! A smaller denominator means the whole is divided into larger pieces."
      },
      {
        id: 4,
        question: "What is 2/4 simplified to its simplest form?",
        options: ["1/4", "1/3", "1/2", "2/2"],
        correctAnswer: "1/2",
        explanation: "If you divide both the top and bottom by 2, 2/4 becomes 1/2. They represent the exact same amount!"
      },
      {
        id: 5,
        question: "If a pizza has 6 slices, and Dad eats 2 slices, what fraction is LEFT?",
        options: ["2/6", "4/6", "1/6", "3/6"],
        correctAnswer: "4/6",
        explanation: "If Dad eats 2 slices, 4 slices are left out of 6 total slices. So 4/6 is left!"
      }
    ]
  },
  {
    id: "geometry-shapes",
    title: "Understanding Shapes & Symmetry",
    subject: "Maths",
    gradeMin: 2,
    gradeMax: 5,
    difficulty: "Easy",
    icon: "📐",
    estimatedTime: "8 mins",
    notes: {
      simpleExplanation: "Shapes are all around us! From the square windows to the round sun. Geometry helps us understand how many sides, corners (vertices), and angles different shapes have.",
      exampleBox: {
        title: "Triangles vs. Quadrilaterals 🔺",
        content: "A triangle always has 3 sides and 3 corners. A quadrilateral (like a square, rectangle, or diamond) always has 4 sides and 4 corners!"
      },
      formulaBox: {
        title: "Line of Symmetry 🦋",
        content: "An imaginary line that cuts a shape exactly in half. If you fold the shape along this line, both halves match up perfectly!"
      },
      aiTip: "A circle is super cool because it has an INFINITE number of symmetry lines! You can fold a circle in half anywhere through its center, and it will always match perfectly."
    },
    flashcards: [
      { front: "What is a vertex?", back: "A corner where two or more lines meet in a shape. For example, a triangle has 3 vertices." },
      { front: "What is symmetry?", back: "Symmetry is when one shape looks exactly like another when you flip, slide, or turn it!" },
      { front: "How many sides does a hexagon have?", back: "A hexagon has 6 sides and 6 vertices!" },
      { front: "Does a circle have any corners?", back: "No! A circle is a curved shape with zero corners and zero flat sides." }
    ],
    quiz: [
      {
        id: 1,
        question: "How many vertices (corners) does a standard rectangle have?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        explanation: "A rectangle has 4 sides and 4 corners (vertices)."
      },
      {
        id: 2,
        question: "Which of these shapes has exactly 5 sides?",
        options: ["Hexagon", "Pentagon", "Octagon", "Triangle"],
        correctAnswer: "Pentagon",
        explanation: "Penta means 5. A pentagon is a 5-sided flat shape!"
      },
      {
        id: 3,
        question: "Which of the following letters has a vertical line of symmetry?",
        options: ["F", "L", "A", "P"],
        correctAnswer: "A",
        explanation: "If you draw a line down the middle of 'A', the left and right halves are identical mirror images!"
      },
      {
        id: 4,
        question: "What is a shape with 8 sides called?",
        options: ["Octagon", "Hexagon", "Heptagon", "Decagon"],
        correctAnswer: "Octagon",
        explanation: "An octagon has 8 sides. Think of an octopus with 8 arms!"
      },
      {
        id: 5,
        question: "Does a standard heart shape have a horizontal or vertical line of symmetry?",
        options: ["Horizontal", "Vertical", "Both", "None"],
        correctAnswer: "Vertical",
        explanation: "A heart shape can be split perfectly in half with a straight line from top to bottom (vertical)."
      }
    ]
  },
  {
    id: "solar-system",
    title: "Our Solar System & Planets",
    subject: "Science",
    gradeMin: 3,
    gradeMax: 7,
    difficulty: "Easy",
    icon: "🪐",
    estimatedTime: "12 mins",
    notes: {
      simpleExplanation: "Our Solar System is our celestial neighborhood! At the center is our star, the Sun. Traveling around the Sun are eight unique planets, lots of moons, and rock-filled asteroid belts.",
      exampleBox: {
        title: "The Order of the Planets 🌞",
        content: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. A fun way to remember: 'My Very Easy Method Just Speeds Up Naming'!"
      },
      formulaBox: {
        title: "Orbit & Rotation",
        content: "Orbit: One full trip around the Sun (Earth takes 1 year).\nRotation: One full spin on a planet's own axis (Earth takes 24 hours, making day & night!)."
      },
      aiTip: "Jupiter is the biggest planet in our solar system! It is so huge that more than 1,300 Earths could fit inside it. It also has a giant red storm that has been spinning for hundreds of years!"
    },
    flashcards: [
      { front: "What is at the center of our solar system?", back: "The Sun! It is a massive, glowing star that keeps all the planets in orbit with its gravity." },
      { front: "Which planet is known as the Red Planet?", back: "Mars! It looks red because of iron dust (like rust) covering its rocky surface." },
      { front: "What is the largest planet in our solar system?", back: "Jupiter! It is a massive gas giant." },
      { front: "Which planet is famous for its gorgeous rings?", back: "Saturn! Its rings are made of billions of chunks of ice, dust, and rocks." }
    ],
    quiz: [
      {
        id: 1,
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: "Mercury",
        explanation: "Mercury is the closest planet to the Sun, but Venus is actually the hottest!"
      },
      {
        id: 2,
        question: "What keeps the planets orbiting around the Sun instead of drifting into space?",
        options: ["Sunlight", "Gravity", "Magnetic fields", "Wind"],
        correctAnswer: "Gravity",
        explanation: "The Sun has a massive gravitational pull that holds all eight planets securely in orbit."
      },
      {
        id: 3,
        question: "How long does it take Earth to complete one full orbit around the Sun?",
        options: ["24 hours", "30 days", "365 days (1 year)", "1 month"],
        correctAnswer: "365 days (1 year)",
        explanation: "One full orbit around the Sun defines a year, which is about 365 days on Earth."
      },
      {
        id: 4,
        question: "Which planet is famously hot with thick, toxic clouds that trap heat?",
        options: ["Mercury", "Mars", "Venus", "Neptune"],
        correctAnswer: "Venus",
        explanation: "Venus is covered in thick carbon dioxide clouds, trapping heat in a runaway greenhouse effect and making it the hottest planet!"
      },
      {
        id: 5,
        question: "What is the only planet in our solar system known to support life?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Earth",
        explanation: "Earth is the perfect distance from the Sun with liquid water and breathable oxygen, allowing millions of species to thrive!"
      }
    ]
  },
  {
    id: "water-cycle",
    title: "The Magical Water Cycle",
    subject: "Science",
    gradeMin: 2,
    gradeMax: 6,
    difficulty: "Medium",
    icon: "💧",
    estimatedTime: "9 mins",
    notes: {
      simpleExplanation: "Did you know that the water you drink today is the same water dinosaurs drank millions of years ago? Water is constantly recycled on Earth through a super-cool process called the Water Cycle!",
      exampleBox: {
        title: "The Three Main Steps ☁️",
        content: "1. Evaporation: Sun heats up water and it turns into invisible steam (gas) rising up.\n2. Condensation: Steam cools down high up and forms clouds.\n3. Precipitation: Clouds get heavy and water falls back down as rain or snow!"
      },
      formulaBox: {
        title: "Transpiration 🍃",
        content: "Plants also sweat water vapor! Trees and flowers release water vapor into the air through tiny pores in their leaves."
      },
      aiTip: "You can see condensation right in your home! Look at cold droplets forming on the outside of an ice-cold glass of lemonade on a hot summer day. That's water vapor from the warm air cooling down!"
    },
    flashcards: [
      { front: "What is Evaporation?", back: "The process where liquid water heats up and turns into water vapor (gas) rising into the sky." },
      { front: "What is Condensation?", back: "The process where water vapor cools down high in the air and turns back into liquid droplets, forming clouds." },
      { front: "What is Precipitation?", back: "Any form of water that falls from clouds back to Earth's surface—like rain, snow, sleet, or hail!" },
      { front: "What is Collection?", back: "When water falls as rain, it collects in oceans, rivers, lakes, and underground, ready to start the cycle again!" }
    ],
    quiz: [
      {
        id: 1,
        question: "What provides the energy to power the entire water cycle?",
        options: ["The wind", "The Sun's heat", "Earth's rotation", "Trees"],
        correctAnswer: "The Sun's heat",
        explanation: "The Sun heats up liquid water in lakes and oceans, causing evaporation and driving the cycle."
      },
      {
        id: 2,
        question: "When water vapor cools down in the sky and forms clouds, what is this step called?",
        options: ["Evaporation", "Precipitation", "Condensation", "Collection"],
        correctAnswer: "Condensation",
        explanation: "Condensation is gas cooling back into liquid. This is how fluffy clouds are made!"
      },
      {
        id: 3,
        question: "Rain, snow, and hail are all examples of what?",
        options: ["Evaporation", "Condensation", "Precipitation", "Transpiration"],
        correctAnswer: "Precipitation",
        explanation: "Precipitation is any water falling from clouds to Earth's surface."
      },
      {
        id: 4,
        question: "What is the invisible gas form of water called?",
        options: ["Ice", "Water vapor", "Raindrops", "Mist"],
        correctAnswer: "Water vapor",
        explanation: "Water vapor is water in its gas state, which is transparent and mixes into our atmosphere."
      },
      {
        id: 5,
        question: "How do plants contribute water vapor to the atmosphere?",
        options: ["Respiration", "Evaporation", "Transpiration", "Condensation"],
        correctAnswer: "Transpiration",
        explanation: "Transpiration is the release of water vapor from the leaves of plants and trees."
      }
    ]
  }
];

// Diagnostic test of 10 general questions (mostly fractions & division & geometry logic)
export const DIAGNOSTIC_QUESTIONS = [
  { id: 1, topic: "Addition", question: "If Aarav has 15 apples and gives 7 to Rhea, how many does he have left?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
  { id: 2, topic: "Multiplication", question: "If 4 pencil boxes have 6 pencils each, how many pencils are there in total?", options: ["10", "20", "24", "28"], correctAnswer: "24" },
  { id: 3, topic: "Fraction Comparison", question: "Which fraction is smaller: 1/4 or 1/2?", options: ["1/2", "1/4", "They are equal", "Cannot compare"], correctAnswer: "1/4" },
  { id: 4, topic: "Word Problems", question: "A train leaves at 3:00 PM and takes 2 hours and 15 minutes to reach. What time does it arrive?", options: ["4:15 PM", "5:15 PM", "5:30 PM", "6:15 PM"], correctAnswer: "5:15 PM" },
  { id: 5, topic: "Long Division", question: "What is 48 divided by 4?", options: ["10", "11", "12", "14"], correctAnswer: "12" },
  { id: 6, topic: "Basic Fractions", question: "What fraction of a circle is shaded if 3 equal parts out of 4 are shaded?", options: ["1/4", "3/4", "2/4", "4/3"], correctAnswer: "3/4" },
  { id: 7, topic: "Shapes", question: "Which shape has exactly three sides?", options: ["Square", "Circle", "Triangle", "Pentagon"], correctAnswer: "Triangle" },
  { id: 8, topic: "Word Problems", question: "Siya has 3 boxes of cookies. Each box contains 12 cookies. She eats 5 cookies. How many cookies remain?", options: ["31", "36", "41", "29"], correctAnswer: "31" },
  { id: 9, topic: "Fraction Comparison", question: "How do you compare 1/3 and 1/3?", options: ["1/3 is bigger", "1/3 is smaller", "They are equal", "Depends on the whole"], correctAnswer: "They are equal" },
  { id: 10, topic: "Long Division", question: "What is the remainder when you divide 25 by 4?", options: ["0", "1", "2", "3"], correctAnswer: "1" }
];

export const WEAKNESS_PRACTICE_DATA: Record<string, {
  topicName: string;
  simpleNotes: string;
  examples: string;
  mistakeExplanation: string;
  aiTip: string;
  flashcards: { front: string; back: string }[];
  quiz: { id: number; question: string; options: string[]; correctAnswer: string; explanation: string }[];
}> = {
  "Word Problems": {
    topicName: "Word Problems",
    simpleNotes: "Word problems are like mini mystery stories! Instead of just numbers like '5 + 3', you get a story like 'Rohan has 5 red balloons and 3 blue balloons.' Your job is to translate words into math symbols.",
    examples: "Story: 'Tisha bought 4 packets of crayons. Each packet has 8 crayons. How many crayons does she have?'\nKey word is 'each' and we want total. This means multiplication: 4 x 8 = 32 crayons!",
    mistakeExplanation: "Why students get this wrong: Students often rush and add all numbers they see! In the story: 'Rohan has 12 apples and 3 friends. He shares them equally.' Rushing students do 12 + 3 = 15. But 'shares equally' means division: 12 / 3 = 4!",
    aiTip: "Look for trigger words! 'Total', 'In all', 'Sum' usually mean Addition (+). 'Left', 'Fewer', 'How much more' usually mean Subtraction (-). 'Each', 'Times' mean Multiplication (x). 'Share equally', 'Split', 'Divided' mean Division (/)!",
    flashcards: [
      { front: "What does 'Left' or 'Difference' usually trigger?", back: "Subtraction (-)! E.g., 'How many candies are left?'" },
      { front: "What does 'Each' or 'Total with groups' trigger?", back: "Multiplication (x)! E.g., '3 boxes with 5 toys each.'" },
      { front: "What does 'Shared equally' trigger?", back: "Division (/)! E.g., 'Share 10 cookies among 5 friends.'" }
    ],
    quiz: [
      {
        id: 1,
        question: "Sam has 14 chocolates. He gives some to Kabir and has 6 chocolates left. Which equation represents this?",
        options: ["14 + 6 = ?", "14 - ? = 6", "14 / 6 = ?", "14 x 6 = ?"],
        correctAnswer: "14 - ? = 6",
        explanation: "Starting with 14, giving some away (-) leaves him with 6. So, 14 - ? = 6."
      },
      {
        id: 2,
        question: "There are 5 shelves. Each shelf holds 9 books. How many books are there in total?",
        options: ["14", "45", "40", "59"],
        correctAnswer: "45",
        explanation: "'Each' indicates multiplication here. 5 groups of 9 books = 5 x 9 = 45 books."
      },
      {
        id: 3,
        question: "A pizza is cut into 8 slices. Tanya eats 2 slices and Rahul eats 3 slices. How many slices are LEFT?",
        options: ["5 slices", "3 slices", "4 slices", "2 slices"],
        correctAnswer: "3 slices",
        explanation: "Tanya and Rahul ate 2 + 3 = 5 slices in total. Out of 8 slices, 8 - 5 = 3 slices are left."
      }
    ]
  },
  "Fraction Comparison": {
    topicName: "Fraction Comparison",
    simpleNotes: "Fraction comparison is about deciding which slice of cake is larger! When fractions have the same denominator, it's easy: 3/4 is bigger than 1/4. But when the denominators are different, you must remember sharing rules.",
    examples: "Compare 1/2 and 1/3.\nImagine a chocolate bar. 1/2 is dividing it into 2 parts and taking 1 piece. 1/3 is dividing into 3 parts and taking 1 piece. The half piece is much bigger!",
    mistakeExplanation: "Why students get this wrong: Students see the number 3 is bigger than 2, so they assume 1/3 is bigger than 1/2. Remember: the bottom number is how many parts we divide by. More divisions mean smaller individual pieces!",
    aiTip: "The Butterfly Method: Multiply diagonally to compare! For 1/2 and 1/3, cross multiply: 1 x 3 = 3 (for left side) and 1 x 2 = 2 (for right side). Since 3 is bigger than 2, 1/2 is bigger than 1/3!",
    flashcards: [
      { front: "Is 1/8 bigger or smaller than 1/4?", back: "1/8 is smaller! Think of sharing a cake with 8 friends instead of just 4." },
      { front: "What is the cross multiplication tip called?", back: "The Butterfly Method! It helps you compare any two fractions instantly." },
      { front: "Which is larger: 2/5 or 4/5?", back: "4/5 is larger! Since the parts are the same size (fifths), having 4 pieces is more than having 2." }
    ],
    quiz: [
      {
        id: 1,
        question: "Which of the following comparison symbols is correct?",
        options: ["1/2 < 1/4", "1/3 > 1/2", "1/4 > 1/6", "1/5 = 1/2"],
        correctAnswer: "1/4 > 1/6",
        explanation: "1/4 is a larger piece than 1/6. So, 1/4 > 1/6 is correct."
      },
      {
        id: 2,
        question: "Using the butterfly cross-multiply method, which is larger: 2/3 or 3/4?",
        options: ["2/3", "3/4", "They are equal", "Cannot tell"],
        correctAnswer: "3/4",
        explanation: "Cross-multiply: 2 x 4 = 8 (for 2/3) and 3 x 3 = 9 (for 3/4). Since 9 > 8, 3/4 is larger!"
      },
      {
        id: 3,
        question: "You have 2 cakes of equal size. One is cut into tenths (1/10s), the other into thirds (1/3s). Which cake has the LARGER individual slices?",
        options: ["The tenth-cut cake", "The third-cut cake", "They are identical", "The tenths are double"],
        correctAnswer: "The third-cut cake",
        explanation: "A cake split among 3 people yields much larger slices than a cake split among 10 people!"
      }
    ]
  },
  "Long Division": {
    topicName: "Long Division",
    simpleNotes: "Long Division is about sharing a large number of items into equal groups, step-by-step. Remember the division family: Dad (Divide), Mom (Multiply), Sister (Subtract), Brother (Bring down), Rover (Remainder)!",
    examples: "Calculate 48 divided by 4.\n1. Divide 4 by 4 = 1.\n2. Multiply 1 x 4 = 4.\n3. Subtract 4 - 4 = 0.\n4. Bring down 8.\n5. Divide 8 by 4 = 2.\nAnswer is exactly 12!",
    mistakeExplanation: "Why students get this wrong: Forgetting to 'bring down' the next number, or writing the remainder incorrectly. Always double-check by multiplying your answer back!",
    aiTip: "To check your work, multiply your answer (quotient) by the divisor, then add the remainder. It should equal the starting number! (e.g. 12 x 4 = 48). If it does, you got a perfect score!",
    flashcards: [
      { front: "What are the 5 steps of division?", back: "Divide, Multiply, Subtract, Bring down, Repeat/Remainder!" },
      { front: "What is the remainder?", back: "The leftover amount that is too small to be divided equally into whole groups." },
      { front: "What is 37 divided by 6?", back: "6 with a remainder of 1! Because 6 x 6 = 36, and 37 - 36 = 1 leftover." }
    ],
    quiz: [
      {
        id: 1,
        question: "What is 84 divided by 4?",
        options: ["20", "21", "22", "24"],
        correctAnswer: "21",
        explanation: "8 / 4 = 2, and 4 / 4 = 1. So 84 / 4 = 21."
      },
      {
        id: 2,
        question: "What is the remainder when you divide 17 by 3?",
        options: ["1", "2", "3", "0"],
        correctAnswer: "2",
        explanation: "3 x 5 = 15. The leftover is 17 - 15 = 2. So the remainder is 2."
      },
      {
        id: 3,
        question: "If you share 50 candies equally among 8 children, how many candies are LEFT OVER?",
        options: ["0 candies", "2 candies", "4 candies", "6 candies"],
        correctAnswer: "2",
        explanation: "8 x 6 = 48. Each child gets 6 candies, and 50 - 48 = 2 candies are left over."
      }
    ]
  }
};
