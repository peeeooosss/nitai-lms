export type PythonChallenge = {
  id: string;
  moduleId: string;
  moduleName: string;
  title: string;
  description: string;
  difficulty: "beginner" | "easy" | "medium" | "hard";
  icon: string;
  order: number;
  theory: string;
  theoryTitle: string;
  starterCode: string;
  expectedOutput?: string;
  testCode?: string;
  hints: string[];
  xpReward: number;
  isFree: boolean;
};

export const MODULES = [
  { id: "hello-world", name: "Hello World", icon: "👋", color: "from-green-500 to-emerald-600" },
  { id: "variables", name: "Variables & Data", icon: "📦", color: "from-blue-500 to-cyan-600" },
  { id: "strings", name: "Strings & Input", icon: "🔤", color: "from-purple-500 to-violet-600" },
  { id: "conditions", name: "Conditions", icon: "🧩", color: "from-orange-500 to-amber-600" },
  { id: "loops", name: "Loops", icon: "🔄", color: "from-pink-500 to-rose-600" },
  { id: "lists", name: "Lists", icon: "📋", color: "from-teal-500 to-cyan-600" },
  { id: "functions", name: "Functions", icon: "⚙️", color: "from-indigo-500 to-purple-600" },
  { id: "dictionaries", name: "Dictionaries", icon: "📖", color: "from-red-500 to-orange-600" },
  { id: "projects", name: "Mini Projects", icon: "🚀", color: "from-yellow-500 to-lime-600" },
];

export const CHALLENGES: PythonChallenge[] = [
  // ===================== MODULE 1: HELLO WORLD =====================
  {
    id: "hello-print",
    moduleId: "hello-world",
    moduleName: "Hello World",
    title: "Your First Program",
    description: "Write your very first Python program! Use the print() function to display text on the screen.",
    difficulty: "beginner",
    icon: "👋",
    order: 1,
    theoryTitle: "What is Python?",
    theory: `## What is Python?

Python is a **programming language** that lets you give instructions to a computer. It's like teaching a friend a new game — you tell them the rules step by step!

## The print() Function

The most basic command in Python is \`print()\`. It displays text on the screen.

\`\`\`python
print("Hello World!")
\`\`\`

When you run this, it shows:
\`\`\`
Hello World!
\`\`\`

### Rules for print():
- Text goes inside **quotes** \`"like this"\`
- The parentheses \`()\` are required
- You can print numbers without quotes: \`print(42)\`
- You can print multiple things: \`print("Hello", "World")\``,
    starterCode: `# Write your first program below!
print()`,
    expectedOutput: "Hello World!",
    hints: [
      'Type `print("Hello World!")` inside the editor',
      'Make sure to use double quotes " around your text',
      'Don\'t forget the parentheses () around the text',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "hello-name",
    moduleId: "hello-world",
    moduleName: "Hello World",
    title: "Say Your Name",
    description: "Use print() to introduce yourself. Print your name and where you're from!",
    difficulty: "beginner",
    icon: "🙋",
    order: 2,
    theoryTitle: "Printing Multiple Items",
    theory: `## Printing Multiple Items

You can print multiple things by separating them with commas:

\`\`\`python
print("My name is", "Alice")
\`\`\`

Output:
\`\`\`
My name is Alice
\`\`\`

Python automatically adds a space between each item!`,
    starterCode: `# Introduce yourself!
print("Hi! My name is", "_____")
print("I am from", "_____")`,
    expectedOutput: undefined,
    hints: [
      'Fill in your name instead of the blanks',
      'Fill in your city or country in the second print',
      'You can print as many things as you want with commas!',
    ],
    xpReward: 30,
    isFree: true,
  },
  {
    id: "hello-emoji",
    moduleId: "hello-world",
    moduleName: "Hello World",
    title: "Print Emojis & Numbers",
    description: "Python can print emojis and numbers too! Try printing different types of data.",
    difficulty: "beginner",
    icon: "🎨",
    order: 3,
    theoryTitle: "Printing Different Types",
    theory: `## Text, Numbers & Emojis

Python can print all kinds of things:

\`\`\`python
print("Hello")    # Text
print(42)         # Number (no quotes needed!)
print(3.14)       # Decimal number
print("😊")       # Emoji!
print(10 + 5)     # Python can do math too!
\`\`\`

Output:
\`\`\`
Hello
42
3.14
😊
15
\`\`\`

💡 **Tip:** The \`#\` symbol is for **comments** — Python ignores them!`,
    starterCode: `# Try printing different things!
print("My favorite number is", 7)
print("I love", "🐍")
print(10 + 3)`,
    expectedOutput: undefined,
    hints: [
      'Try changing the number after "My favorite number is"',
      'Try a different emoji between the quotes',
      'Change 10 + 3 to another math problem!',
    ],
    xpReward: 30,
    isFree: true,
  },
  {
    id: "hello-story",
    moduleId: "hello-world",
    moduleName: "Hello World",
    title: "Tell a Mini Story",
    description: "Use multiple print() statements to tell a short story about a robot!",
    difficulty: "easy",
    icon: "📖",
    order: 4,
    theoryTitle: "Multiple Print Statements",
    theory: `## Running Multiple Lines

Python runs your code **line by line**, from top to bottom. Each \`print()\` goes on a new line:

\`\`\`python
print("Once upon a time...")
print("There was a friendly robot.")
print("It loved to learn Python!")
\`\`\`

Output:
\`\`\`
Once upon a time...
There was a friendly robot.
It loved to learn Python!
\`\`\`

💡 Each \`print()\` automatically adds a newline at the end!`,
    starterCode: `# Tell a story about a robot!
print("Once upon a time,")
print("there was a robot named")`,
    expectedOutput: undefined,
    hints: [
      'Start with "Once upon a time" like in the example',
      'Give your robot a fun name!',
      'Add what the robot likes to do',
    ],
    xpReward: 50,
    isFree: true,
  },

  // ===================== MODULE 2: VARIABLES =====================
  {
    id: "var-intro",
    moduleId: "variables",
    moduleName: "Variables & Data",
    title: "What are Variables?",
    description: "Variables store data — like labeled boxes. Put a value in a box, then use the box name to get it back!",
    difficulty: "beginner",
    icon: "📦",
    order: 1,
    theoryTitle: "Variables = Labeled Boxes",
    theory: `## Variables Store Data

A **variable** is like a labeled box where you store information:

\`\`\`python
name = "Alice"
age = 10
\`\`\`

- \`name\` is a box containing the text "Alice"
- \`age\` is a box containing the number 10

## Rules for Variable Names
- Can contain letters, numbers, and underscores
- Must start with a letter (not a number)
- No spaces allowed! Use \`my_name\` not \`my name\`

\`\`\`python
# ✅ Good variable names:
player_score = 100
player1 = "Alex"
my_name = "Bob"

# ❌ Bad variable names:
1player = "Alex"   # Starts with a number
my name = "Bob"    # Has a space
\`\`\``,
    starterCode: `# Create a variable and print it!
player_name = "Alex"
print(player_name)

# Now try creating your own variable below:
my_favorite_game = ""
print(my_favorite_game)`,
    expectedOutput: undefined,
    hints: [
      "Set my_favorite_game to the name of your favorite game in quotes",
      'Like: my_favorite_game = "Minecraft"',
      'Then print() will show whatever value the variable holds',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "var-numbers",
    moduleId: "variables",
    moduleName: "Variables & Data",
    title: "Working with Numbers",
    description: "Variables can store numbers too! Do math with them and print results.",
    difficulty: "beginner",
    icon: "🔢",
    order: 2,
    theoryTitle: "Numbers & Math in Python",
    theory: `## Number Variables

Variables can store numbers, and you can do math with them:

\`\`\`python
score = 100
bonus = 50
total = score + bonus
print(total)  # Shows: 150
\`\`\`

## Math Operators
| Symbol | Meaning | Example |
|--------|---------|---------|
| \`+\` | Add | \`5 + 3 → 8\` |
| \`-\` | Subtract | \`10 - 4 → 6\` |
| \`*\` | Multiply | \`3 * 4 → 12\` |
| \`/\` | Divide | \`15 / 3 → 5.0\` |

\`\`\`python
a = 10
b = 3
print(a + b)  # 13
print(a - b)  # 7
print(a * b)  # 30
print(a / b)  # 3.333...
\`\`\``,
    starterCode: `# Calculate your total score!
level_1 = 85
level_2 = 92
level_3 = 78

total_score = level_1 + level_2 + level_3
average = total_score / 3

print("Total score:", total_score)
print("Average:", average)`,
    expectedOutput: undefined,
    hints: [
      'Try changing the level scores to see the total change',
      'Add a level_4 variable and include it in the total',
      'You can use // for whole number division: 10 // 3 = 3',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "var-types",
    moduleId: "variables",
    moduleName: "Variables & Data",
    title: "Data Types",
    description: "Different kinds of data have different types. Learn the difference between text, numbers, and booleans!",
    difficulty: "easy",
    icon: "🏷️",
    order: 3,
    theoryTitle: "String, Integer, Float & Boolean",
    theory: `## Data Types

Python has different **types** of data:

\`\`\`python
# String (text) — always in quotes
name = "Alice"

# Integer (whole number)
age = 10

# Float (decimal number)
height = 1.45

# Boolean (True/False)
is_student = True
\`\`\`

## Type Checking

Use \`type()\` to check what type something is:

\`\`\`python
print(type("Hello"))   # <class 'str'>
print(type(42))        # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type(True))      # <class 'bool'>
\`\`\``,
    starterCode: `# Check the types of different values!
print(type("Hello"))
print(type(42))
print(type(3.14))
print(type(True))

# Now try your own:
print(type(____))`,
    expectedOutput: undefined,
    hints: [
      'Put different values inside type() to see their type',
      'Try type("100") vs type(100) — see the difference?',
      'What type is False? What about 0.5?',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "var-swap",
    moduleId: "variables",
    moduleName: "Variables & Data",
    title: "Swapping Values",
    description: "Swap the values of two variables using a clever Python trick!",
    difficulty: "easy",
    icon: "🔄",
    order: 4,
    theoryTitle: "Updating & Swapping Variables",
    theory: `## Updating Variables

You can change what a variable stores:

\`\`\`python
x = 5
x = x + 3  # x is now 8
print(x)
\`\`\`

## The Swap Trick

In Python, swapping two variables is super easy:

\`\`\`python
a = "🍎"
b = "🍊"

# Swap!
a, b = b, a

print(a)  # 🍊
print(b)  # 🍎
\`\`\`

This is **one line** in Python! In most other languages, this would take 3 lines!`,
    starterCode: `# Swap the fruit values!
fruit1 = "🍎"
fruit2 = "🍊"

print("Before swap:")
print("fruit1:", fruit1)
print("fruit2:", fruit2)

# Write your swap code here:
fruit1, fruit2 = fruit2, fruit1

print("After swap:")
print("fruit1:", fruit1)
print("fruit2:", fruit2)`,
    expectedOutput: undefined,
    hints: [
      'Use the pattern: a, b = b, a',
      'Replace fruit1 and fruit2 with emojis you like',
      'Try swapping 3 variables: a, b, c = b, c, a',
    ],
    xpReward: 60,
    isFree: true,
  },

  // ===================== MODULE 3: STRINGS & INPUT =====================
  {
    id: "str-concat",
    moduleId: "strings",
    moduleName: "Strings & Input",
    title: "String Concatenation",
    description: "Combine (concatenate) strings together using the + operator!",
    difficulty: "beginner",
    icon: "🔗",
    order: 1,
    theoryTitle: "Joining Strings Together",
    theory: `## String Concatenation

**Concatenation** is a fancy word for "joining strings together". Use \`+\` to join them:

\`\`\`python
first = "Hello"
second = " World"
result = first + second
print(result)  # Hello World
\`\`\`

## Concatenation vs Commas

\`\`\`python
# With commas (auto-adds spaces)
print("Hello", "World")   # Hello World

# With + (exactly what you put)
print("Hello" + "World")  # HelloWorld

# Add your own space:
print("Hello" + " " + "World")  # Hello World
\`\`\``,
    starterCode: `# Join words together!
word1 = "Python"
word2 = "is"
word3 = "awesome"

sentence = word1 + " " + word2 + " " + word3
print(sentence)

# Create your own sentence:
adj = "fun"
message = "Python is " + adj
print(message)`,
    expectedOutput: undefined,
    hints: [
      'Use + to join strings, and add " " for spaces between them',
      'Try creating a greeting: "Hello" + " " + name',
      'You can concatenate as many strings as you want!',
    ],
    xpReward: 40,
    isFree: true,
  },
  {
    id: "str-input",
    moduleId: "strings",
    moduleName: "Strings & Input",
    title: "Getting User Input",
    description: "Make your programs interactive! Use input() to get the user's name and reply to them!",
    difficulty: "easy",
    icon: "⌨️",
    order: 2,
    theoryTitle: "The input() Function",
    theory: `## Getting Input from Users

\`input()\` lets your program ask the user a question and wait for an answer:

\`\`\`python
name = input("What is your name? ")
print("Hello,", name)
\`\`\`

When you run this:
1. The program prints: \`What is your name?\`
2. It waits for you to type something
3. You type your answer and press Enter
4. The program says hello!

## input() Always Returns a String

\`\`\`python
age = input("How old are you? ")
# age is a string, not a number!
# To use it as a number: int(age)
\`\`\``,
    starterCode: `# Ask for the user's name and greet them!
name = input("What's your name? ")
print("Nice to meet you,", name)

# Ask for their favorite color
color = input("What's your favorite color? ")
print(name + " likes " + color + "!")`,
    expectedOutput: undefined,
    hints: [
      'When testing, type something in the input box and press Enter',
      'Try asking for their age too!',
      'Make a story by asking multiple questions',
    ],
    xpReward: 60,
    isFree: true,
  },
  {
    id: "str-madlib",
    moduleId: "strings",
    moduleName: "Strings & Input",
    title: "Mad Libs Story",
    description: "Create a Mad Libs game! Ask the user for words and build a silly story!",
    difficulty: "easy",
    icon: "🎭",
    order: 3,
    theoryTitle: "Building Dynamic Strings",
    theory: `## f-Strings (Formatted Strings)

Python has a super cool way to build strings — **f-strings**!

\`\`\`python
name = "Alice"
age = 10
print(f"My name is {name} and I'm {age} years old")
\`\`\`

Just put an \`f\` before the quotes and use \`{}\` to insert variables!

Compare:
\`\`\`python
# Using +
print("My name is " + name + " and I'm " + str(age))

# Using f-strings (much cleaner!)
print(f"My name is {name} and I'm {age}")
\`\`\``,
    starterCode: `# Mad Libs: Build a silly story!
name = input("Give me a name: ")
animal = input("Give me an animal: ")
place = input("Give me a place: ")

story = f"Once upon a time, {name} went to {place} with a friendly {animal}. They had a wonderful adventure!"

print()
print("--- Your Story ---")
print(story)`,
    expectedOutput: undefined,
    hints: [
      'Try adding more questions: a color, a food, a verb',
      'Use f-strings with {variable} to insert answers into the story',
      'Make the story as silly as you want!',
    ],
    xpReward: 80,
    isFree: true,
  },
  {
    id: "str-methods",
    moduleId: "strings",
    moduleName: "Strings & Input",
    title: "String Methods",
    description: "Python strings have built-in methods to change case, count characters, and more!",
    difficulty: "medium",
    icon: "🔧",
    order: 4,
    theoryTitle: "Handy String Methods",
    theory: `## Useful String Methods

Strings come with built-in **methods** (functions that belong to strings):

\`\`\`python
text = "Hello World"

print(text.upper())       # HELLO WORLD
print(text.lower())       # hello world
print(text.title())       # Hello World
print(len(text))          # 11 (counts characters!)
print(text.count("o"))    # 2 (counts how many "o"s)
print(text.replace("World", "Python"))  # Hello Python
\`\`\`

## Chaining Methods

You can even chain methods together:

\`\`\`python
text = "  hello world  "
print(text.strip().upper())  # HELLO WORLD
\`\`\`

\`.strip()\` removes extra spaces!`,
    starterCode: `# Play with string methods!
text = input("Enter a sentence: ")

print("UPPERCASE:", text.upper())
print("lowercase:", text.lower())
print("Title Case:", text.title())
print("Length:", len(text), "characters")
print("Reversed:", text[::-1])`,
    expectedOutput: undefined,
    hints: [
      'Try text.count("a") to count how many times "a" appears',
      'Try text.replace("a", "@") to swap characters',
      'len() gives you the total character count!',
    ],
    xpReward: 70,
    isFree: false,
  },

  // ===================== MODULE 4: CONDITIONS =====================
  {
    id: "if-basic",
    moduleId: "conditions",
    moduleName: "Conditions",
    title: "If Statements",
    description: "Make decisions in your code! Use 'if' to run code only when a condition is True.",
    difficulty: "easy",
    icon: "🧩",
    order: 1,
    theoryTitle: "Making Decisions with if",
    theory: `## The if Statement

\`if\` lets your program make decisions:

\`\`\`python
age = 12

if age >= 13:
    print("You can join!")
\`\`\`

🚨 **Important rules:**
- The condition ends with a colon \`:\`
- The code inside must be **indented** (4 spaces or Tab)
- Only indented code runs when the condition is True

## Comparison Operators
| Symbol | Meaning |
|--------|---------|
| \`==\` | Equal to |
| \`!=\` | Not equal |
| \`>\` | Greater than |
| \`<\` | Less than |
| \`>=\` | Greater or equal |
| \`<=\` | Less or equal |

\`\`\`python
if score >= 80:
    print("Great job!")
\`\`\``,
    starterCode: `# Check if someone is old enough!
age = int(input("How old are you? "))

if age >= 13:
    print("You're a teenager! 🎉")

if age >= 18:
    print("You're an adult!")

if age < 13:
    print("You're a kid! Enjoy it! 😊")`,
    expectedOutput: undefined,
    hints: [
      'Use int() to convert the input to a number',
      '>= means "greater than or equal to"',
      'Try different ages when running to test each condition',
    ],
    xpReward: 60,
    isFree: true,
  },
  {
    id: "if-else",
    moduleId: "conditions",
    moduleName: "Conditions",
    title: "If-Else: Two Paths",
    description: "Use if-else to choose between two paths — one for True, one for False!",
    difficulty: "easy",
    icon: "🔀",
    order: 2,
    theoryTitle: "If and Else Together",
    theory: `## The if-else Structure

When you have two possible outcomes, use \`if\` and \`else\`:

\`\`\`python
password = input("Enter password: ")

if password == "python123":
    print("Access granted! ✅")
else:
    print("Wrong password! ❌")
\`\`\`

- \`if\` runs when the condition is **True**
- \`else\` runs when the condition is **False**

## The Modulo Operator %

\`%\` gives you the **remainder** of division:

\`\`\`python
print(10 % 3)  # 1 (10 ÷ 3 = 3 remainder 1)
print(7 % 2)   # 1 (odd number!)
print(8 % 2)   # 0 (even number!)
\`\`\`

This is perfect for checking if a number is even or odd!`,
    starterCode: `# Even or Odd checker!
num = int(input("Enter a number: "))

if num % 2 == 0:
    print(f"{num} is even! ✨")
else:
    print(f"{num} is odd! 🌟")`,
    expectedOutput: undefined,
    hints: [
      '% 2 gives 0 for even numbers, 1 for odd numbers',
      'Use int() to convert input to a number',
      'Try 7, 10, 15, 22 — see the pattern?',
    ],
    xpReward: 60,
    isFree: true,
  },
  {
    id: "elif",
    moduleId: "conditions",
    moduleName: "Conditions",
    title: "Multiple Choices with Elif",
    description: "What if you have more than 2 choices? Use elif to check multiple conditions!",
    difficulty: "easy",
    icon: "📊",
    order: 3,
    theoryTitle: "elif = else + if",
    theory: `## The elif Statement

When you need more than two paths, use \`elif\`:

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A+")
elif score >= 80:
    print("Grade: A")
elif score >= 70:
    print("Grade: B")
elif score >= 60:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

💡 **Order matters!** Python checks conditions from top to bottom. The **first** True condition wins.

## Logical Operators

\`\`\`python
# and — both must be True
if age >= 10 and age <= 15:
    print("You're in middle school!")

# or — at least one must be True
if day == "Saturday" or day == "Sunday":
    print("It's the weekend! 🎉")

# not — reverses True/False
if not is_raining:
    print("Let's go outside!")
\`\`\``,
    starterCode: `# Grade calculator!
score = int(input("Enter your score (0-100): "))

if score >= 90:
    print("A+ 🌟 Outstanding!")
elif score >= 80:
    print("A 🎉 Great job!")
elif score >= 70:
    print("B 👍 Good work!")
elif score >= 60:
    print("C 💪 Keep trying!")
elif score >= 50:
    print("D 📚 You can do better!")
else:
    print("F ❤️ Don't give up!")`,
    expectedOutput: undefined,
    hints: [
      'The conditions are checked in order from top to bottom',
      'Try scores: 95, 82, 67, 45 to see different grades',
      'Can you add a condition for 100? Like "Perfect Score!"',
    ],
    xpReward: 70,
    isFree: true,
  },
  {
    id: "rps",
    moduleId: "conditions",
    moduleName: "Conditions",
    title: "Rock Paper Scissors",
    description: "Build a Rock, Paper, Scissors game using conditions and random choices!",
    difficulty: "medium",
    icon: "✂️",
    order: 4,
    theoryTitle: "Random Choice & Nested If",
    theory: `## Random Choices

Python can pick random things:

\`\`\`python
import random

# Pick a random number
num = random.randint(1, 10)

# Pick from a list
choice = random.choice(["rock", "paper", "scissors"])
\`\`\`

## Nested If Statements

You can put \`if\` statements inside other \`if\` statements:

\`\`\`python
if player == "rock":
    if computer == "scissors":
        print("You win!")
    elif computer == "paper":
        print("You lose!")
    else:
        print("Tie!")
\`\`\`

This is called **nesting** — like Russian dolls!`,
    starterCode: `import random

choices = ["rock", "paper", "scissors"]
computer = random.choice(choices)

player = input("Choose: rock, paper, or scissors? ").lower()

print(f"Computer chose: {computer}")
print(f"You chose: {player}")

# Add your game logic here!
if player == computer:
    print("It's a tie! 🤝")
elif player == "rock" and computer == "scissors":
    print("You win! 🎉")
elif player == "paper" and computer == "rock":
    print("You win! 🎉")
elif player == "scissors" and computer == "paper":
    print("You win! 🎉")
else:
    print("Computer wins! 💻")`,
    expectedOutput: undefined,
    hints: [
      'Use .lower() to convert input to lowercase',
      'Check all winning combinations: rock beats scissors, paper beats rock, scissors beats paper',
      'Add a loop later so they can play multiple rounds!',
    ],
    xpReward: 120,
    isFree: false,
  },

  // ===================== MODULE 5: LOOPS =====================
  {
    id: "loop-for",
    moduleId: "loops",
    moduleName: "Loops",
    title: "For Loops",
    description: "Repeat code a specific number of times using for loops!",
    difficulty: "easy",
    icon: "🔄",
    order: 1,
    theoryTitle: "The for Loop",
    theory: `## For Loops — Repeating Code

A \`for\` loop repeats code a certain number of times:

\`\`\`python
for i in range(5):
    print("Hello!")
\`\`\`

This prints "Hello!" **5 times**.

## range() Explained

\`\`\`python
range(5)     # 0, 1, 2, 3, 4  (stops before 5)
range(1, 6)  # 1, 2, 3, 4, 5  (start, stop)
range(1, 10, 2)  # 1, 3, 5, 7, 9  (start, stop, step)
\`\`\`

## Using the Loop Variable

\`\`\`python
for i in range(1, 6):
    print(f"Count: {i}")
\`\`\`

Output:
\`\`\`
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
\`\`\``,
    starterCode: `# Count from 1 to 10!
for i in range(1, 11):
    print(i)

print()
print("--- Count by 2s ---")
for i in range(0, 11, 2):
    print(i)`,
    expectedOutput: undefined,
    hints: [
      'range(start, stop, step) — stop is NOT included',
      'range(1, 11) gives 1 through 10',
      'range(0, 11, 2) gives 0, 2, 4, 6, 8, 10',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "loop-table",
    moduleId: "loops",
    moduleName: "Loops",
    title: "Multiplication Table",
    description: "Use a for loop to generate a multiplication table for any number!",
    difficulty: "easy",
    icon: "✖️",
    order: 2,
    theoryTitle: "Loops with User Input",
    theory: `## Combining input() with Loops

Let's make dynamic loops:

\`\`\`python
n = int(input("Enter a number: "))
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
\`\`\`

## The range() Pattern

\`\`\`python
# 5 times table:
# 5 x 1 = 5
# 5 x 2 = 10
# ...
# 5 x 10 = 50
\`\`\`

💡 \`range(1, 11)\` gives us 1 through 10 — perfect for multiplication tables!`,
    starterCode: `# Generate a multiplication table!
num = int(input("Enter a number: "))

print(f"\n--- {num} Times Table ---\n")
for i in range(1, 11):
    result = num * i
    print(f"{num} x {i} = {result}")`,
    expectedOutput: undefined,
    hints: [
      'range(1, 11) gives 1 to 10 — that\'s 10 rows',
      'num * i calculates each product',
      'Try 7 to see the 7 times table!',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "loop-while",
    moduleId: "loops",
    moduleName: "Loops",
    title: "While Loops",
    description: "A while loop runs as long as a condition is True. Perfect for guessing games!",
    difficulty: "medium",
    icon: "♾️",
    order: 3,
    theoryTitle: "The while Loop",
    theory: `## While Loops

A \`while\` loop runs **as long as** a condition is True:

\`\`\`python
count = 1
while count <= 5:
    print(count)
    count = count + 1  # Don't forget this!
\`\`\`

⚠️ **Danger:** If you forget to update the condition, the loop runs **forever**! (Press Ctrl+C to stop)

## While vs For

| For Loop | While Loop |
|----------|------------|
| When you know the count | When you don't know the count |
| \`for i in range(10)\` | \`while score < 100\` |
| Fixed repetitions | Runs until condition changes |

## Number Guessing Game Pattern

\`\`\`python
secret = 7
guess = 0
while guess != secret:
    guess = int(input("Guess: "))
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
print("Correct! 🎉")
\`\`\``,
    starterCode: `# Number guessing game!
import random

secret = random.randint(1, 20)
guess = 0
attempts = 0

print("I'm thinking of a number between 1 and 20!")
print("Can you guess it?")

while guess != secret:
    guess = int(input("Your guess: "))
    attempts = attempts + 1

    if guess < secret:
        print("Too low! 📉")
    elif guess > secret:
        print("Too high! 📈")

print(f"🎉 Correct! You got it in {attempts} tries!")`,
    expectedOutput: undefined,
    hints: [
      'random.randint(1, 20) picks a random number between 1 and 20',
      'The while loop keeps going until they guess correctly',
      'Count attempts by incrementing a variable each time',
    ],
    xpReward: 100,
    isFree: false,
  },
  {
    id: "loop-patterns",
    moduleId: "loops",
    moduleName: "Loops",
    title: "Print Patterns with Loops",
    description: "Use nested loops to print cool patterns like triangles and pyramids!",
    difficulty: "medium",
    icon: "🔺",
    order: 4,
    theoryTitle: "Nested Loops",
    theory: `## Nested Loops = Loops Inside Loops

Put one loop inside another to make patterns:

\`\`\`python
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()  # new line
\`\`\`

Output:
\`\`\`
*
**
***
****
*****
\`\`\`

## The end="" Trick

By default, \`print()\` adds a newline. Use \`end=""\` to stay on the same line:

\`\`\`python
print("*", end="")  # No newline
print("*", end="")  # Stays on same line
print()              # Now newline
\`\`\`

\`\`\`
**
\`\`\``,
    starterCode: `# Print a triangle pattern!
rows = int(input("How many rows? "))

print("\n🔺 Triangle:\n")
for i in range(1, rows + 1):
    for j in range(i):
        print("*", end="")
    print()

print("\n🔻 Inverted:\n")
for i in range(rows, 0, -1):
    for j in range(i):
        print("*", end="")
    print()`,
    expectedOutput: undefined,
    hints: [
      'The outer loop controls rows, inner loop controls columns',
      'range(1, rows+1) gives 1, 2, 3... rows',
      'range(rows, 0, -1) counts DOWN from rows to 1',
    ],
    xpReward: 100,
    isFree: false,
  },

  // ===================== MODULE 6: LISTS =====================
  {
    id: "list-basics",
    moduleId: "lists",
    moduleName: "Lists",
    title: "Creating & Accessing Lists",
    description: "Lists store multiple items in one variable. Like a backpack for your data!",
    difficulty: "easy",
    icon: "📋",
    order: 1,
    theoryTitle: "What Are Lists?",
    theory: `## Lists = Collections

A **list** holds multiple values in one variable:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
scores = [95, 87, 92, 78]
mixed = ["hello", 42, True, 3.14]
\`\`\`

## Accessing Items by Index

Each item has a position called an **index**:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
# index:     0        1         2

print(fruits[0])  # apple
print(fruits[1])  # banana
print(fruits[2])  # cherry
\`\`\`

🚨 **Important:** Counting starts at **0**, not 1!

## Negative Indexing

\`\`\`python
print(fruits[-1])  # cherry (last item)
print(fruits[-2])  # banana (second from last)
\`\`\``,
    starterCode: `# Create a list of your favorite things!
favorites = ["pizza", "python", "music", "games", "books"]

print("My favorites:")
print(favorites)

print("\nFirst item:", favorites[0])
print("Last item:", favorites[-1])
print("Second item:", favorites[1])

# Change an item
favorites[0] = "🌮 tacos"
print("\nUpdated list:", favorites)`,
    expectedOutput: undefined,
    hints: [
      'List indexes start at 0: [0, 1, 2, 3, ...]',
      '-1 gives you the last item in the list',
      'You can change items by assigning: list[0] = "new value"',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "list-methods",
    moduleId: "lists",
    moduleName: "Lists",
    title: "List Methods",
    description: "Lists have built-in methods to add, remove, and sort items!",
    difficulty: "easy",
    icon: "🛠️",
    order: 2,
    theoryTitle: "Useful List Methods",
    theory: `## Adding & Removing Items

\`\`\`python
friends = ["Ali", "Ben"]

# Add to the end
friends.append("Cat")
print(friends)  # ['Ali', 'Ben', 'Cat']

# Insert at a position
friends.insert(1, "Diana")
print(friends)  # ['Ali', 'Diana', 'Ben', 'Cat']

# Remove by value
friends.remove("Ben")
print(friends)  # ['Ali', 'Diana', 'Cat']

# Remove by index
popped = friends.pop(0)
print(popped)   # Ali
print(friends)  # ['Diana', 'Cat']
\`\`\`

## Sorting & Finding

\`\`\`python
numbers = [3, 1, 4, 1, 5]
numbers.sort()
print(numbers)  # [1, 1, 3, 4, 5]

print(len(numbers))     # 5 (how many items)
print(4 in numbers)     # True (check if exists)
print(numbers.count(1)) # 2 (how many times)
\`\`\``,
    starterCode: `# Build a shopping list!
shopping = []

print("🛒 Shopping List App")
print("Type 'done' when finished\\n")

while True:
    item = input("Add item: ")
    if item == "done":
        break
    shopping.append(item)
    print(f"✅ Added! ({len(shopping)} items)")

shopping.sort()
print(f"\\n📋 Your sorted list: {shopping}")
print(f"Total items: {len(shopping)}")`,
    expectedOutput: undefined,
    hints: [
      'Use .append() to add items to the end of the list',
      'Use .sort() to arrange items alphabetically',
      'len() tells you how many items are in the list',
    ],
    xpReward: 70,
    isFree: true,
  },
  {
    id: "list-loops",
    moduleId: "lists",
    moduleName: "Lists",
    title: "Looping Through Lists",
    description: "Use for loops to process every item in a list automatically!",
    difficulty: "easy",
    icon: "🔄",
    order: 3,
    theoryTitle: "Iterating Over Lists",
    theory: `## For Loops with Lists

The easiest way to work with every item in a list:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I love {fruit}s!")
\`\`\`

Output:
\`\`\`
I love apples!
I love bananas!
I love cherries!
\`\`\`

## Using enumerate() for Index

If you also need the position:

\`\`\`python
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")
\`\`\`

Output:
\`\`\`
1. apple
2. banana
3. cherry
\`\`\``,
    starterCode: `# Grade calculator with lists!
scores = [85, 92, 78, 95, 88]

total = 0
for score in scores:
    total = total + score

average = total / len(scores)
highest = max(scores)
lowest = min(scores)

print(f"Scores: {scores}")
print(f"Total: {total}")
print(f"Average: {average}")
print(f"Highest: {highest}")
print(f"Lowest: {lowest}")`,
    expectedOutput: undefined,
    hints: [
      'Use for item in list: to loop through all items',
      'max() and min() find the largest and smallest',
      'sum() can replace the manual total loop: sum(scores)',
    ],
    xpReward: 60,
    isFree: true,
  },
  {
    id: "list-todo",
    moduleId: "lists",
    moduleName: "Lists",
    title: "To-Do List App",
    description: "Build a simple to-do list manager! Add, remove, and view tasks!",
    difficulty: "medium",
    icon: "✅",
    order: 4,
    theoryTitle: "Building Interactive Apps",
    theory: `## Building Menu-Driven Apps

Create a menu with options users can choose:

\`\`\`python
while True:
    print("\\n1. Add task")
    print("2. View tasks")
    print("3. Remove task")
    print("4. Quit")
    choice = input("Choose: ")

    if choice == "1":
        # Add task
    elif choice == "2":
        # View tasks
    ...
\`\`\`

This pattern is called a **menu loop** — the user chooses actions until they quit. It's how real apps work!

## Checking for Items

\`\`\`python
if "buy milk" in todo_list:
    print("Already on your list!")
\`\`\`

\`in\` checks if something exists in a list — super useful!`,
    starterCode: `# Simple To-Do List!
tasks = []

while True:
    print(f"\\n📋 Tasks ({len(tasks)}):")
    print("1. Add task")
    print("2. View all")
    print("3. Remove task")
    print("4. Quit")

    choice = input("Choose (1-4): ")

    if choice == "1":
        task = input("Enter task: ")
        tasks.append(task)
        print("✅ Task added!")
    elif choice == "2":
        if len(tasks) == 0:
            print("No tasks yet!")
        else:
            for i, task in enumerate(tasks):
                print(f"{i+1}. {task}")
    elif choice == "3":
        num = int(input("Task number to remove: "))
        if 1 <= num <= len(tasks):
            removed = tasks.pop(num - 1)
            print(f"🗑️ Removed: {removed}")
        else:
            print("❌ Invalid number!")
    elif choice == "4":
        print("👋 Goodbye!")
        break
    else:
        print("❌ Invalid choice!")`,
    expectedOutput: undefined,
    hints: [
      'enumerate(tasks) gives you (index, task) pairs',
      'pop(index) removes and returns the item at that index',
      'Check bounds: 1 <= num <= len(tasks) ensures valid input',
    ],
    xpReward: 120,
    isFree: false,
  },

  // ===================== MODULE 7: FUNCTIONS =====================
  {
    id: "func-basics",
    moduleId: "functions",
    moduleName: "Functions",
    title: "Creating Functions",
    description: "Functions are reusable blocks of code. Define once, use many times!",
    difficulty: "easy",
    icon: "⚙️",
    order: 1,
    theoryTitle: "Defining & Calling Functions",
    theory: `## What is a Function?

A **function** is a named block of code that you can run whenever you need it:

\`\`\`python
def greet():
    print("Hello!")
    print("Welcome to Python!")

# Call the function
greet()
greet()  # You can call it again!
\`\`\`

## Functions with Parameters

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
\`\`\`

## Functions with Return Values

\`\`\`python
def add(a, b):
    result = a + b
    return result

total = add(5, 3)
print(total)  # 8
\`\`\`

💡 \`return\` sends a value back. Without it, a function returns \`None\`.`,
    starterCode: `# Create and use functions!

def say_hello(name):
    """Say hello to someone"""
    print(f"Hello, {name}! 👋")

def double(n):
    """Double a number"""
    return n * 2

def add_three(a, b, c):
    """Add three numbers together"""
    return a + b + c

# Test your functions
say_hello("Python")
print(double(21))
print(add_three(10, 20, 30))`,
    expectedOutput: undefined,
    hints: [
      'def function_name(): defines a new function',
      'Use return to send a value back from the function',
      'Parameters go inside the parentheses: def func(param1, param2)',
    ],
    xpReward: 60,
    isFree: true,
  },
  {
    id: "func-calc",
    moduleId: "functions",
    moduleName: "Functions",
    title: "Calculator with Functions",
    description: "Build a simple calculator where each operation is a function!",
    difficulty: "medium",
    icon: "🧮",
    order: 2,
    theoryTitle: "Functions as Building Blocks",
    theory: `## Functions = Building Blocks

Good programs are built from small, reusable functions:

\`\`\`python
def add(a, b):  return a + b
def sub(a, b):  return a - b
def mul(a, b):  return a * b
def div(a, b):  return a / b
\`\`\`

Each function does ONE thing and does it well. Then you combine them to build bigger things!

## The Main Program Pattern

\`\`\`python
def main():
    # Get user input
    # Call functions
    # Display results

if __name__ == "__main__":
    main()
\`\`\`

This pattern separates your program logic into clear, manageable pieces.`,
    starterCode: `# Calculator with functions!

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Can't divide by zero!"
    return a / b

# Main calculator loop
while True:
    print("\\n🧮 Simple Calculator")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Quit")

    choice = input("Choose (1-5): ")
    if choice == "5":
        print("Bye! 👋")
        break

    a = float(input("First number: "))
    b = float(input("Second number: "))

    if choice == "1": print(f"Result: {add(a, b)}")
    elif choice == "2": print(f"Result: {subtract(a, b)}")
    elif choice == "3": print(f"Result: {multiply(a, b)}")
    elif choice == "4": print(f"Result: {divide(a, b)}")
    else: print("❌ Invalid choice!")`,
    expectedOutput: undefined,
    hints: [
      'Each operation is its own function — clean and organized!',
      'float(input()) converts input to a decimal number',
      'Check for division by zero to avoid errors',
    ],
    xpReward: 100,
    isFree: false,
  },
  {
    id: "func-dice",
    moduleId: "functions",
    moduleName: "Functions",
    title: "Dice Rolling Simulator",
    description: "Simulate rolling dice! Use functions to make the code clean and reusable.",
    difficulty: "medium",
    icon: "🎲",
    order: 3,
    theoryTitle: "Random & Function Composition",
    theory: `## Combining Functions

Functions can call other functions!

\`\`\`python
def roll_die(sides=6):
    return random.randint(1, sides)

def roll_multiple(count, sides=6):
    results = []
    for _ in range(count):
        results.append(roll_die(sides))
    return results
\`\`\`

## Default Parameters

You can give parameters default values:

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")           # Hello, Alice!
greet("Bob", "Hey")      # Hey, Bob!
\`\`\`

This makes your functions flexible without needing extra arguments every time.`,
    starterCode: `import random

def roll_die(sides=6):
    """Roll a single die with given sides"""
    return random.randint(1, sides)

def roll_multiple(count, sides=6):
    """Roll multiple dice and return results"""
    results = []
    for _ in range(count):
        results.append(roll_die(sides))
    return results

def sum_rolls(results):
    """Add up all roll results"""
    return sum(results)

# Test it!
print("🎲 Dice Roller\\n")

count = int(input("How many dice? "))
sides = int(input("How many sides? "))

rolls = roll_multiple(count, sides)
total = sum_rolls(rolls)

print(f"\\nRolls: {rolls}")
print(f"Total: {total}")
print(f"Average: {total / count:.1f}")`,
    expectedOutput: undefined,
    hints: [
      'random.randint(1, sides) gives a random number between 1 and sides',
      'Functions can be combined to build more complex behavior',
      'sum() adds all values in a list — handy!',
    ],
    xpReward: 90,
    isFree: false,
  },

  // ===================== MODULE 8: DICTIONARIES =====================
  {
    id: "dict-basics",
    moduleId: "dictionaries",
    moduleName: "Dictionaries",
    title: "What are Dictionaries?",
    description: "Dictionaries store key-value pairs. Like a real dictionary: look up a word (key), get the definition (value)!",
    difficulty: "easy",
    icon: "📖",
    order: 1,
    theoryTitle: "Key-Value Pairs",
    theory: `## Dictionaries = Key → Value

A dictionary stores pairs of information. Each pair has a **key** and a **value**:

\`\`\`python
student = {
    "name": "Alice",
    "age": 12,
    "grade": "7th"
}

print(student["name"])  # Alice
print(student["age"])   # 12
\`\`\`

## Lists vs Dictionaries

| Lists | Dictionaries |
|-------|-------------|
| Items by position (index) | Items by key (name) |
| \`fruits[0]\` | \`student["name"]\` |
| Ordered | **Unordered** (in Python 3.7+, insertion order is preserved) |

## Adding & Changing Items

\`\`\`python
student["school"] = "Springfield Elementary"
student["age"] = 13  # Updates existing key
\`\`\``,
    starterCode: `# Create a profile dictionary
profile = {
    "name": "Alex",
    "age": 12,
    "hobby": "coding",
    "language": "Python"
}

print("📋 My Profile")
print("-----------")
print(f"Name: {profile['name']}")
print(f"Age: {profile['age']}")
print(f"Hobby: {profile['hobby']}")
print(f"Language: {profile['language']}")

# Add a new key
profile["favorite_food"] = "pizza"
print(f"\\nUpdated: {profile}")`,
    expectedOutput: undefined,
    hints: [
      'Keys are like labels, values are the data',
      'Access values with dict["key"] syntax',
      'You can add new keys anytime: dict["new_key"] = value',
    ],
    xpReward: 50,
    isFree: true,
  },
  {
    id: "dict-phonebook",
    moduleId: "dictionaries",
    moduleName: "Dictionaries",
    title: "Phonebook App",
    description: "Build a phonebook using dictionaries! Look up a name and find the number.",
    difficulty: "medium",
    icon: "📞",
    order: 2,
    theoryTitle: "Looping Through Dictionaries",
    theory: `## Iterating Over Dictionaries

\`\`\`python
phonebook = {
    "Alice": "123-4567",
    "Bob": "987-6543"
}

# Loop through keys
for name in phonebook:
    print(name)

# Loop through key-value pairs
for name, number in phonebook.items():
    print(f"{name}: {number}")
\`\`\`

## Checking if a Key Exists

\`\`\`python
if "Alice" in phonebook:
    print(phonebook["Alice"])
else:
    print("Not found")
\`\`\`

## Getting with Default

\`\`\`python
# Returns None (or default) if key doesn't exist
number = phonebook.get("Charlie")
number = phonebook.get("Charlie", "Not found")
\`\`\``,
    starterCode: `# Phonebook app!
phonebook = {}

while True:
    print("\\n📞 Phonebook")
    print("1. Add contact")
    print("2. Look up")
    print("3. View all")
    print("4. Quit")

    choice = input("Choose (1-4): ")

    if choice == "1":
        name = input("Name: ")
        number = input("Number: ")
        phonebook[name] = number
        print(f"✅ {name} added!")
    elif choice == "2":
        name = input("Name to find: ")
        if name in phonebook:
            print(f"{name}: {phonebook[name]}")
        else:
            print("❌ Not found!")
    elif choice == "3":
        if len(phonebook) == 0:
            print("Phonebook is empty!")
        else:
            for name, number in phonebook.items():
                print(f"  {name}: {number}")
    elif choice == "4":
        print("👋 Bye!")
        break`,
    expectedOutput: undefined,
    hints: [
      'dict[key] = value adds or updates an entry',
      'Use "if key in dict:" to check if a key exists',
      'dict.items() gives you (key, value) pairs for looping',
    ],
    xpReward: 100,
    isFree: false,
  },

  // ===================== MODULE 9: MINI PROJECTS =====================
  {
    id: "project-quiz",
    moduleId: "projects",
    moduleName: "Mini Projects",
    title: "Quiz Game",
    description: "Build a quiz game using dictionaries and loops! Questions and answers in one data structure.",
    difficulty: "medium",
    icon: "❓",
    order: 1,
    theoryTitle: "Putting It All Together",
    theory: `## Project: Quiz Game

This project uses:
- **Dictionaries** to store questions & answers
- **Loops** to go through each question
- **Conditions** to check answers
- **Variables** to track score
- **input()** to get user answers

## Data Structure

\`\`\`python
quiz = {
    "What is 2+2?": "4",
    "What color is the sky?": "blue",
    "Is Python a snake?": "yes"
}
\`\`\`

Then loop through the dictionary, ask each question, and check the answer!

## Tracking Score

\`\`\`python
score = 0
total = len(quiz)

for question, answer in quiz.items():
    user_answer = input(question + " ")
    if user_answer.lower() == answer.lower():
        score += 1
\`\`\``,
    starterCode: `# Quiz Game!

quiz = {
    "What is 2 + 2?": "4",
    "What is the capital of France?": "paris",
    "Which planet is known as the Red Planet?": "mars",
    "What color do you get mixing red and blue?": "purple",
    "How many legs does a spider have?": "8"
}

score = 0
total = len(quiz)

print("🧠 Python Quiz!\\n")

for question, answer in quiz.items():
    user_answer = input(f"{question} ")
    if user_answer.lower() == answer.lower():
        print("  ✅ Correct!")
        score += 1
    else:
        print(f"  ❌ The answer was: {answer}")

print(f"\\n🏆 Final Score: {score}/{total}")

if score == total:
    print("🌟 Perfect score! Amazing!")
elif score >= total * 0.7:
    print("👍 Great job!")
else:
    print("💪 Keep practicing!")`,
    expectedOutput: undefined,
    hints: [
      "Use .lower() so answers aren't case-sensitive",
      'dict.items() gives you (question, answer) pairs',
      'Calculate percentage with score/total*100',
    ],
    xpReward: 120,
    isFree: false,
  },
  {
    id: "project-password",
    moduleId: "projects",
    moduleName: "Mini Projects",
    title: "Password Generator",
    description: "Create a strong random password generator using lists, random, and functions!",
    difficulty: "medium",
    icon: "🔑",
    order: 2,
    theoryTitle: "Random Password Generation",
    theory: `## Building a Password Generator

This combines:
- **Lists** of characters
- **random.choice()** to pick random items
- **Loops** to build the password
- **Functions** to organize the code

## The Strategy

\`\`\`python
import random
import string

letters = string.ascii_letters  # a-z, A-Z
digits = string.digits          # 0-9
symbols = "!@#$%^&*"

# Pick random from each category
password = []
for _ in range(length):
    password.append(random.choice(all_chars))

# Shuffle and join
random.shuffle(password)
result = "".join(password)
\`\`\`

💡 \`string\` module has useful constants like \`ascii_letters\`, \`digits\`, \`punctuation\`!`,
    starterCode: `import random
import string

def generate_password(length=12, use_symbols=True):
    """Generate a random password"""
    chars = string.ascii_letters + string.digits
    if use_symbols:
        chars += "!@#$%^&*_+-="

    password = []
    for _ in range(length):
        password.append(random.choice(chars))

    random.shuffle(password)
    return "".join(password)

# Test it!
print("🔑 Password Generator\\n")

for i in range(5):
    pw = generate_password(16)
    print(f"  {i+1}. {pw}")

print(f"\\nYour secure password:")
secure = generate_password(20, True)
print(f"  🔒 {secure}")
print(f"  Length: {len(secure)} characters")`,
    expectedOutput: undefined,
    hints: [
      'string.ascii_letters gives a-z and A-Z',
      'random.choice() picks one random item from a list',
      '"".join(list) joins list items into a single string',
    ],
    xpReward: 100,
    isFree: false,
  },
  {
    id: "project-hangman",
    moduleId: "projects",
    moduleName: "Mini Projects",
    title: "Hangman Game",
    description: "Build the classic Hangman word-guessing game! Use everything you've learned!",
    difficulty: "hard",
    icon: "🎯",
    order: 3,
    theoryTitle: "The Hangman Algorithm",
    theory: `## Hangman Game Design

1. Pick a random word
2. Show blanks: \`_ _ _ _ _\`
3. Player guesses a letter
4. If correct, reveal the letter: \`_ a _ _ a\`
5. If wrong, lose a life
6. Win: all letters guessed
7. Lose: 6 wrong guesses

## The Core Logic

\`\`\`python
word = "python"
guessed = []
lives = 6

while lives > 0:
    # Show current state
    display = ""
    for letter in word:
        if letter in guessed:
            display += letter
        else:
            display += "_"
    print(display)

    guess = input("Guess a letter: ")
    if guess in word:
        guessed.append(guess)
    else:
        lives -= 1

    # Check if won
    if all(letter in guessed for letter in word):
        print("You won!")
\`\`\`

💡 \`all()\` checks if a condition is True for ALL items in a list!`,
    starterCode: `import random

words = ["python", "coding", "computer", "science", "robot", "algorithm", "internet", "keyboard"]
word = random.choice(words)
guessed = []
lives = 6

print("🎯 Hangman!\n")

while lives > 0:
    display = ""
    for letter in word:
        if letter in guessed:
            display += letter + " "
        else:
            display += "_ "

    print(f"\\nWord: {display}")
    print(f"Lives: {'❤️' * lives}")
    print(f"Guessed: {', '.join(sorted(guessed)) if guessed else 'none'}")

    guess = input("\\nGuess a letter: ").lower()

    if len(guess) != 1 or not guess.isalpha():
        print("❌ Enter a single letter!")
        continue

    if guess in guessed:
        print("⏳ Already guessed!")
        continue

    guessed.append(guess)

    if guess in word:
        print("✅ Correct!")
        # Check if won
        if all(l in guessed for l in word):
            print(f"\\n🎉 You won! The word was: {word}")
            break
    else:
        lives -= 1
        print(f"❌ Wrong! {lives} lives left.")

if lives == 0:
    print(f"\\n💀 Game over! The word was: {word}")`,
    expectedOutput: undefined,
    hints: [
      'Use a list to track guessed letters',
      '.isalpha() checks if input is a letter (not a number/symbol)',
      'all(letter in guessed for letter in word) checks if the entire word is guessed',
    ],
    xpReward: 150,
    isFree: false,
  },
];

export const FREE_CHALLENGE_LIMIT = 5;
export const FREE_CHALLENGE_IDS = CHALLENGES.filter((c) => c.isFree).map((c) => c.id);

export function getChallenge(id: string): PythonChallenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}

export function getChallengesByModule(moduleId: string): PythonChallenge[] {
  return CHALLENGES.filter((c) => c.moduleId === moduleId).sort((a, b) => a.order - b.order);
}
