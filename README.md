<div align="center">
<h1>GitIssuefy - Track Issues With Labels</h1>

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A web app that lets you track issues in your favorite open-source projects based on your selected labels, and receive notifications through Discord.

<img src="https://media.licdn.com/dms/image/v2/D4D22AQH-ZjjRfmWppQ/feedshare-shrink_800/feedshare-shrink_800/0/1726377577110?e=1730332800&v=beta&t=eEV2BwJxmxePiPaY8nTbCXz1UZS2pVA5A-Uh-jEKTv8" alt="logo"/>
</div>

</br>
</br>

## The Story Behind GitIssuefy

The idea for Gitissuefy was born out of a personal experience while contributing to <a href="https://github.com/mattermost/mattermost" target="_blank">Mattermost</a>. I'd been actively involved in the project, but I noticed a recurring problem: by the time I discovered new issues that matched my skills and interests, they were often already assigned to other contributors.

This experience highlighted a gap in the open-source contribution workflow. GitHub lacks this feature to notify contributors about <mark>new issues based on specific labels</mark>. That's where Gitissuefy comes in.

## The Development Journey

### Tech Stack

For Gitissuefy, I chose a modern and efficient tech stack:

- <b>Next.js:</b> For building a fast, SEO-friendly React application
- <b>Appwrite:</b> As a backend-as-a-service platform for rapid development
- <b>Tailwind CSS:</b> For utility-first styling
- <b>Shadcn UI:</b> For consistent and customizable UI components
- <b>Framer Motion:</b> To add smooth animations and enhance user experience

### Challenges and Solutions

1) One of the key challenges was that <b>GitHub doesn’t provide webhooks</b> for public repositories, making it tricky to get real-time data updates. On top of that, GitHub's API has strict rate limits, which can be problematic when making frequent requests.

   - To overcome this, I implemented GitHub OAuth to authorize users and make API calls on their behalf. I set up a cron job to run every two minutes, fetching the latest data using each user's access token. This approach not only bypasses rate limits but also scales effectively as more users join.

2) Another challenge was <b>designing a notification system</b> that would be timely yet not overwhelming. Email notifications require third-party services, which can be costly, so

   - I opted for a more developer-friendly solution—Discord Since many developers already use Discord, I created a bot that sends notifications directly to users whenever a new issue is detected. This way, notifications are both accessible and cost-effective.

3) The final and <b>my favorite challenge</b> was efficiently managing the workflow of fetching issues, updating the database, retrieving notifications, and sending them through the bot—all for multiple users simultaneously.

   - To handle this, I used Redis and Bull Queue to process the data in a scalable, organized way, ensuring everything runs smoothly without overwhelming the system.

## Key Features

1. **User-friendly Interface**: An intuitive dashboard that allows easy management of tracked projects and labels.
2. **Customizable Label Tracking**: Users can select specific labels and combine multiple label combinations they're interested in across various repositories.
3. **Real-time Discord Notifications**: Receive instant notifications on Discord when new issues matching your selected labels are created or labeled later.
4. **Cross-project Issue Discovery**: Find opportunities across various open-source projects in one place.

## Conclusion

Gitissuefy represents my commitment to improving the open-source contribution experience. By bridging the gap between issue creation and developer notification, I hope to foster more active and diverse participation in open-source communities.

Try [Gitissuefy](https://git-issuefy.vercel.app/) and share your feedback. Your thoughts and contributions are always welcome!



## Getting Started Locally

First install dependencies using `npm i` and then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
