"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { motion } from "framer-motion";
import { Mark } from "@/components/ui/mark";

export function FaqGrid() {
  const faqItems = [
    {
      question: "How can I track issues with multiple labels?",
      answer: (
        <>
          You can track issues with multiple labels by combining them using
          commas. This allows you to watch the repository for issues that
          include all the specified labels together. For example, while adding
          labels you can add <Mark>Good first issue,Bug</Mark> and you&apos;ll
          receive notifications for issues that have both of these labels.
        </>
      ),
    },
    {
      question: "Will I receive instant notifications?",
      answer: (
        <>
          Notifications are sent within <Mark>2 minutes</Mark> of an issue being
          created. Since GitHub doesn&apos;t provide webhooks for public
          repositories, we use APIs to check for updates.
        </>
      ),
    },
    {
      question: "What happens if an issue is created but labeled later?",
      answer: (
        <>
          You will still receive a notification! Even if an issue is{" "}
          <Mark>created first and labeled later</Mark>, as long as it gets a
          label you&apos;re watching, you&apos;ll be notified. Timing
          doesn&apos;t matter—you won&apos;t miss it.
        </>
      ),
    },
    {
      question: "Can I mix multiple and single labels for issue tracking?",
      answer: (
        <>
          Yes, you can. For example, <Mark>Good first issue,Bug</Mark> tracks
          issues with both labels, while <Mark>Tech/ReactJs</Mark> tracks issues
          with just that label. You can combine both types to customize your
          notifications.
        </>
      ),
    },
    {
      question:
        "Is there a limit to the number of repositories or labels I can watch?",
      answer: (
        <>
          Nope, there are <Mark>no limits!</Mark> You can watch as many
          repositories and labels as you like. Remember, with great power comes
          great responsibility—please don’t break the system!
        </>
      ),
    },
    {
      question: "What if an existing issue gets updated with a label?",
      answer: (
        <>
          Yes, you&apos;ll still receive a notification. If an{" "}
          <Mark>existing issue is updated</Mark> with a label you&apos;re
          watching or it completes one of your multiple combo of labels.
        </>
      ),
    },
    {
      question: "Why do I need to invite the bot to receive notifications?",
      answer: (
        <>
          The bot can only send notifications to users who share at least one
          server with it. To ensure smooth notifications, you need to be in a
          server with the bot. If you&apos;re already in a server where the
          GitIssuefy bot is present, you can skip this step. The key is to have
          a <Mark>mutual connection</Mark> with the bot.
        </>
      ),
    },
    {
      question: "Is this project open source?",
      answer: (
        <>
          Yes, it is! You can explore the source code and contribute to its
          development on GitHub. We welcome contributions and feedback, so feel
          free to <Mark>report issues</Mark> or submit pull requests.
        </>
      ),
    },
  ];

  const splitIntoColumns = (items: any) => {
    const itemsPerColumn = Math.ceil(items.length / 3);
    return [
      items.slice(0, itemsPerColumn),
      items.slice(itemsPerColumn, itemsPerColumn * 2),
      items.slice(itemsPerColumn * 2),
    ];
  };

  const columns = splitIntoColumns(faqItems);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { y: -5 },
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-28 md:px-0 md:py-28">
      <h2 className="text-center text-4xl font-medium tracking-tight md:text-5xl">
        Frequently asked questions
      </h2>
      <p className="max-w-lg mx-auto text-center text-base">
        We are here to help you with any questions you may have. If you
        don&apos;t find what you need, please contact us at{" "}
        <a
          href="mailto:zubairimtiaz395@gmail.com"
          className="text-primary underline"
        >
          zubairimtiaz395@gmail.com
        </a>
      </p>
      <div className="mt-10 grid w-full grid-cols-1 items-start gap-4 md:grid-cols-3">
        {columns.map((column, index) => (
          <div key={index} className="grid grid-cols-1 items-start gap-4">
            {column.map((item: any, itemIndex: any) => (
              <motion.div
                key={itemIndex}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="cursor-pointer"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.answer}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
