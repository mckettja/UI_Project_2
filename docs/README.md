# We Canvas Better

This project was created by Yale Miller, Josh McKettrick, and Bao Huynh.

## Project Summary and Descripion
We implemented a new and improved version of the Canvas application, called **"We Canvas Better"**. Canvas is the current application that the University of Cincinnati uses to post class assignments, grades, and related class materials. Many students have complaints with our current Canvas system, so we are tasked with implement a better reimagined system with gamification features that make it fun and exciting for students to submit and complete their homework.

Below are some guidelines and requirements to how our application was designed and implemented.
- Users should be able to select their own profile.
- Users should be enrolled in three courses with fully implemented course materials:
   - User Interface
   - Senior Design
   - Computer Graphics
- Users should be able to do the following for each of the courses listed above:
   - View and submit current assignments.
   - View learning modules with course materials.
   - Plan their current assignments.
   - Access a Zoom classroom link.
   - View their course Syllabus.
   - Have visual indications that change when tasks are completed. Example: Submit assignment button should be unavailable after a student has already submitted the assignment.
- Application should reflect a user's progress as if they are halfway complete with the semester.
   - There should be grades for past assignments, learning modules that have passed, etc. This will allow us to show our application's full functionality.

## Design phase and Brainstorming 
In the first step of the project, we focused on design and brainstromed on some core design challenges.

### Design Challenge 1: How can we use gamification to make completing assignments and achievements satisfying to the users? What types of games fit into the Canvas setting?

![](/Documentation/design-challenge-1.png)

1. Role playing game --> User’s character gets stronger stats after completing tasks.
2. Role playing game --> User get a flashy animation after doing task.
3. Animal-themed game --> User gets cute pets after doing task.
4. Dating simulation --> User gets interactions with their dream “dates” after doing task.
5. Mystery/Puzzle games --> User gets new clues/hints about the puzzle after doing task.
6. Role-playing --> Only change the wording and aesthetics of the interface based on user’s desired role without having an actual game system.
7. Story-based game --> User gets new excerpts to a purely entertainment-based story by completing tasks.  
8. Platform-based game --> User unlocks new platform game levels after completing a task.  
9. Game-agnostic --> User gets real world currency after doing task.
10. Game-agnostic --> User gets points after doing task and get ranked on a scoreboard.

**Deeper design sketches**
![](/Documentation/design-challenge-1-deeper-sketches.png)

1. Role playing game --> User’s character gets stronger stats after completing tasks 
- User character gains EXP (experience points) 
- User character basic stats to manually choose to level: Strength, Stamina, Speed, etc. 
- User character gain stats based on type of assignment 
- User gain powerups after milestone (10 task, or 50 points, etc.) 
2. Animal-themed game --> User gets cute pets after doing task 
- User gains an in-game currency when tasks are completed 
- User gains more currency when assignments are worth more points 
- User can use their currency to buy a name for their pet, change color/breed of their pet, etc. 
- Pets can be ‘levelled up’ with currency. Example: cat --> cheetah --> lion


### Design Challenge 2: How to improve accountability, especially mutual accountability?

![](/Documentation/design-challenge-2.png)

- Peer QA forum --> Encourage students to answer each other's questions, thereby promoting peer support. Recognize and reward active participants in these forums.  
- Viewing friend's profile and progress as motivational/peer-pressure trigger.
- Accountability partners become a group that can chat, discuss, and share information to gain points, in-game currency, EXP, or something else.
- Peer-Reviewed Study Resources: Students give hints/resources and receive rewards; other peers can view and award badges.
- In-game challenges and competitions.
- Leaderboard system.
- Peers bet in-game currency for accountability goals.
- Peer review system.
- Pair students with a mentor to regularly check-in.
- Peer progress journals: Allow students to keep journals of their academic progress and make them shareable with peers, fostering transparency and mutual encouragement.

**Deeper design sketches**

![](/Documentation/design-challenge-2-deeper-sketches.png)

### Design Challenge 3: How can we show the user only the information/panels that users want to see?

![](/Documentation/design-challenge-3.png)

- Customizable sidebar  
- Customizable Home page  
- Town design (like gather.town)  
- Remember user’s most used navigations  
- Students votes and requests to the professors to reorganize certain panels  
- Information is stored in a table that can be sorted with filters  
- Information is stored as ‘tools’ in a ‘backpack’ to make it more interesting and interactive  
- Customized ‘hot’ buttons allow users to quickly access desired information  
- Tool usage statistics are stored internally (unavailable to users) and move to the top of a home page based on all user statistics  
- Better alert system that shows the user more relevant information

**Deeper design sketches**

![](/Documentation/design-challenge-3-deeper-sketches.png)


## Design decisions and Project features overview

### Gamification
In our first design challenge we asked, "How can we gamify current Canvas?". After reviewing our ideas we finally set on an **animal-themed game**. Users will have pets that they will be excited to take care of and will also gets rewarded treats based on the completion of assignments, which can be used to make the pets become cuter and happier. Each course will have a dedicated pet that user can raise. Pets are universally cute and we think it will be a universal game that every student can appreciate regardless of their gaming experience.

### Motivation, rewards, and accountability

We implement motivation, rewards, and accountability encourage for each student through the usuage of **treats**. When assignments are completed, treats are added to the user's account. There is an **early-bird bonus** where the earlier the users submit an assignment the more treats they get to encourage users to manage their assignments well. As time passes your pet will become sad, which further encourages users to do assignments and earn more treats. The pet status is visually shown on the front page.


### User Experience and Consistency

For the final design challenge we focused on only supplying our users with valuable information. A common critisism of the current IC Canvas application where that Many users felt there was far too much information on their screen, most of which was never used by themselves or by the professors to enhance learning.

Therefore, in 'We Canvas Better' wanted to provide consistency. The left-side navigation bar contains the same navigation items Modules, Grades, Assignments, Announcements, Syllabus, and Zoom for every couse. break down our pages into components.

## Prototype Design Sketch
![alt text](https://github.com/mckettja/UI_Project_2/blob/main/Documentation/design_sketch.png?raw=true)

## How to Launch Application

1. Copy this repository to your machine.
   
3. Install dependencies: `npm install`

4. Run `npm run dev`. The result should be similar to this
```bash
> ui-project-2@0.0.0 dev
> vite


  VITE v4.4.9  ready in 630 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

5. Access the application at 'http://localhost:5173'

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Technogies included in this project:
- React
- React Router
- Easy-Peasy React state management
- TailwindCSS
- Bootstrap
- Dayjs library for date-time manipulation
