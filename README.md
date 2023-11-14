# Project Alterna-Canvas

This project was created by Yale Miller, Josh McKettrick, and Bao Huynh.

## Project Summary and Descripion
&nbsp; &nbsp; &nbsp; We were required to implement a new, improvized Canvas application. Canvas is the current application that the University of Cincinnati uses to post class assignments, grades, and related class materials. Many students have complaints with our current Canvas system, so we were tasked to take our critisims and implement them in a reimagined system. We also were tasked to make Canvas more fun and interactive by adding a game-like feature to it. Below are some guidelines to how our application was designed.
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

## Brainstorming Gamification 
In this step of the project, we needed to decide on some core design challenges. Below are our design challenges, and our possible ideas for gamification. The following section will outline our project characteristics, where we made our final design choices for our application.
<br />
<br />
### Design Challenge 1: How can we use gamification to make completing assignments and achievements satisfying to the users? What types of games fit into the Canvas setting?
- Role playing game --> User’s character gets stronger stats after completing tasks.
- Role playing game --> User get a flashy animation after doing task.
- Animal-themed game --> User gets cute pets after doing task.
- Dating simulation --> User gets interactions with their dream “dates” after doing task.
- Mystery/Puzzle games --> User gets new clues/hints about the puzzle after doing task.
- Role-playing --> Only change the wording and aesthetics of the interface based on user’s desired role without having an actual game system.
- Story-based game --> User gets new excerpts to a purely entertainment-based story by completing tasks.  
- Platform-based game --> User unlocks new platform game levels after completing a task.  
- Game-agnostic --> User gets real world currency after doing task.
- Game-agnostic --> User gets points after doing task and get ranked on a scoreboard.
<br />

### Design Challenge 2: How to improve accountability, especially mutual accountability?
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
<br />

### Design Challenge 3: How can we show the user only the information/panels that users want to see?
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

## Project Characteristics
&nbsp; &nbsp; &nbsp; Our first design challenge we asked, "How can we gamify current Canvas?". After reviewing our ideas we finally set on an animal themed game. We wanted our users to have pets that they will need to take care of. In our design, we wanted the user to get treats rewarded to their account based on the completion of assignments. We designed our application so that each class will have a dedicated pet. When assignments are completed treats are added to the user's account, which can allow them to feed their pet for each given class. This design is similar to Tamogotchi, in the fact that the point of the game is to keep your pet happy. As time passes your pet will become sad, and if you don't complete assignments they will visually indicate this on the user's interface.
<br />
<br />
&nbsp; &nbsp; &nbsp;The second design challenge was based on motivation, and accountability. We want our users to have the dedication to complete assignments so we decided to focus our attention on in game challenges and rewards. Based on our first design challenge, we view the reward is keeping your pet happy and completing assignmnets as the challenges to get treats. The treats will ultimately lead to this reward. 
<br />
<br />
&nbsp; &nbsp; &nbsp; The final design challenge we wanted to focus on was only supplying our users with valuable information. This was a very common critisism of our current Canvas application. Many users felt that there was far too much information on their screen, most of which was never used by themselves or by the professors to enhance learning. For this, we wanted to break down our pages into components. Each page on our navigation bar (on the left side of our application) can be easily added or removed by one simple change. This means that any unncessesary pages could be removed by a professor to minimize clutter. In our current application, there are minimal pages as after our interviews with students we felt these were the most commonly used in everyday Canvas interaction.

## Prototype Design
![alt text](https://github.com/mckettja/UI_Project_2/blob/main/documentation/design_sketch.png?raw=true)

## How to Launch Application

1. Copy this repository to your machine.
   
3. Install dependencies: `npm install`

4. Run `npm run dev`

6. Hold Ctrl + Left Click the local host link in the console
```cmd
> smart-desk-ui@0.0.0 dev
> vite


  VITE v4.4.9  ready in 630 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Technogies included in this project:
- React and React Router
- TailwindCSS
- Bootstrap
