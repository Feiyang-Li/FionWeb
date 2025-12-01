Detail go to:
https://feiyang-li.github.io/FionWeb/#/software/projects/fionweb-portfolio-frontend

### Reason for construction
It was developed for the reason of demonstrate my personal abilities, experiences, and projects, and storing information. Demonstration of my personal profolio allowing me to better communicate with recuiters while motive me to try more, the storing of information give me better management of personal goals; while allowing for future refinement skills and job searching process.

### Structure consideration
- Front main page is the entering page, I got my idea from Tesla solar-roofing main page which I also used for a company website project I am working on right now. For me, first page is not pack with information but as a eyes treat, it allowing users to be curious on future pages and find out more information. The image (sky) is the general theme I love to use, representing "sky is the limit".
![Main front Page](https://res.cloudinary.com/dsd2rjevs/image/upload/v1764303782/Screenshot_2025-11-28_122117_ka4ozh.png)

- I seperate the website into 4 main sections:
    - Software section: mainly for demonstrating my coding (creating software) ability.
    - Data section: Initially it is similar with software section, but as time go on more diversify data project will be present there.
    - Finance section: I am working my CFA level 1 right now, and want to understand more about finance, especially consider company and contry revolve around money; therefore, I think it is critical to gain experience on this field.
    - Blog: It is a general storage for project, and also my general writing, for example: understanding of solar-panel; this type of blog doesn't necessary related to any section, but I find it interesting to share.
- I really love my contact page, I believe it look cool, and a motto from a popular game - "Audentes Fortuna iuvat"

### Detail display of the project and blogs
- The detail stored within the database, I find it useful to create a page for projects, this allowing me to clearly see what had I done, better demonstrating information.
- However, right now detail display consisted a lot of bugs, but the good new is each time I enter for a project, I am fixing bugs (sort of agile development).

### Possible future improvement
- More stuff in the main page, maybe add some repeatable videos, I could try with 3D display on web, or some interactive games. (Some of my friend did that, not necessary what I like)
- Another front-end website for information input, it uses put, post, patch to input information, instead of direct input to database as json file by hand. (Maybe integration with a central commend website which I constructed before)
- Search option for 4 sections, search based on tags. (I didn't implemented now because it is not useful) My previous smart PDF Search, can help on this.
- Bug fixing

### AI assistant
- I used ChatGPT help similar as I used ChatGPT help for the backend, I believed it is critial to know how to collaborating with AI on coding as in the future most of trivial coding will be replace with AI coding.
- Here I created the software section, and used copilot to use the software section format and the pydantic of finance section, data section to create the actual codes for data and finance section, which it did and quiet fast. I checked the work and it presented code that meet my expectation. This indicated how many time one can save using this AI technology, compare with me painfully code each section one by one (especially there is a lot of repeat between software and data section).


### FIONWEB Structure

    FionWeb
    ├── .github
    │   └── workflows
    │       └── deploy.yml
    ├── public/
    ├── src
    │   ├── api
    │   │   └── client.js
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── Footer.tsx
    │   │   ├── HalfhalfDisplay.jsx
    │   │   ├── HalfhalfDisplay.module.css
    │   │   ├── NavBar.module.css
    │   │   ├── NavBar.tsx
    │   │   └── ShortLine.tsx
    │   ├── features
    │   │   ├── blog
    │   │   │   ├── BlogPage.module.css
    │   │   │   └── BlogPage.tsx
    │   │   ├── business
    │   │   │   └── BusinessPage.tsx
    │   │   ├── contact
    │   │   │   ├── ContactPage.module.css
    │   │   │   └── ContactPage.tsx
    │   │   ├── data
    │   │   │   ├── stylesheet
    │   │   │   │   ├── DataCertificationSection.module.css
    │   │   │   │   ├── DataJob.module.css
    │   │   │   │   ├── DataPage.module.css
    │   │   │   │   ├── DataProject.module.css
    │   │   │   │   └── DataSkill.module.css
    │   │   │   ├── DataCertificationSection.tsx
    │   │   │   ├── DataJob.tsx
    │   │   │   ├── DataPage.tsx
    │   │   │   ├── DataProject.tsx
    │   │   │   └── DataSkill.tsx
    │   │   ├── finance
    │   │   │   ├── stylesheet
    │   │   │   │   ├── FinanceCertificationSection.module.css
    │   │   │   │   ├── FinanceJob.module.css
    │   │   │   │   ├── FinancePage.module.css
    │   │   │   │   ├── FinanceProject.module.css
    │   │   │   │   └── FinanceSkill.module.css
    │   │   │   ├── FinanceCertificationSection.tsx
    │   │   │   ├── FinanceJob.tsx
    │   │   │   ├── FinancePage.tsx
    │   │   │   ├── FinanceProject.tsx
    │   │   │   └── FinanceSkill.tsx
    │   │   ├── home
    │   │   │   ├── components
    │   │   │   │   ├── HomePage.module.css
    │   │   │   │   └── HomePage.tsx
    │   │   └── software
    │   │       ├── stylesheet
    │   │       │   ├── SoftwareCertificationSection.module.css
    │   │       │   ├── SoftwareJob.module.css
    │   │       │   ├── SoftwarePage.module.css
    │   │       │   ├── SoftwareProject.module.css
    │   │       │   └── SoftwareSkill.module.css
    │   │       ├── SoftwareCertificationSection.tsx
    │   │       ├── SoftwareJob.tsx
    │   │       ├── SoftwarePage.tsx
    │   │       ├── SoftwareProject.tsx
    │   │       └── SoftwareSkill.tsx
    │   ├── pages
    │   │   ├── Data
    │   │   │   ├── DataProjectDetailPage.module.css
    │   │   │   └── DataProjectDetailPage.tsx
    │   │   ├── Finance
    │   │   │   ├── FinanceProjectDetailPage.module.css
    │   │   │   └── FinanceProjectDetailPage.tsx
    │   │   ├── General
    │   │   │   ├── BlogDetailPage.module.css
    │   │   │   └── BlogDetailPage.tsx
    │   │   └── Software
    │   │       ├── SoftwareProjectDetailPage.module.css
    │   │       └── SoftwareProjectDetailPage.tsx
    │   ├── styles
    │   │   ├── GlobalVar.css
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js

