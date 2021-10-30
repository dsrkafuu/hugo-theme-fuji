+++
title = "Teaching Assistant for Stochastic Simulation"
date = 2020-06-21
tags = ["journal", "view"]
+++

In June, 2020, I worked as teaching assistant (TA) for stochastic simulation at
Technical University of Denmark. The course consists of 6 lecture days (3 hours
lecture and 4 hours exercise per day) and a group project. Because of the
COVID-19 pandemic, everything has to be done online, which made it harder for
everyone.

<!--more-->

## Group Forming {#group}

There are three TAs in total, and we relied on a online registration platform
to collect information on students' questions and requests for help. The
platform is made out of [Google Forms](https://www.google.com/forms/about/) and
[Google Sheets](https://www.google.com/sheets/about/). Any student can fill a
form, and it will appear immediately in a online sheet, which can be seen by
TAs and the teacher. The platform helped a lot indeed, but we ignored the most
important problem, forming groups.

In Denmark, most of the courses require students to form groups and write
reports together. I always think the real reason is to reduce the number of
reports that teachers must evaluate. There are 174 students registered this
course, and a project report usually takes 40 minutes for one TA to read and
write feedback. So to form groups is mandatory. Nevertheless, it is really
challenging for students, international students especially, to find a group
when the course is happening online. The teacher spent the whole first day
helping students who don't know others find a teammate. There should be some
online platform to let students exhibiting their abilities and preferences and
match them instead of doing manually. In my experience, to have reliable
teammates is critical in obtaining a a high grad and even finish the course.
The teacher told us that he would like students from the same major to form a
group, because he believe that everyone relies on alumni in the same sector. I
agree to some extent, and hope that they use the same programming language.

## Tests

The most important thing I learnt during the preparation is to test the
implementation. I realised the power of validation when taking the econometrics
course (regression analysis and time series analysis) in Spring 2020, and . In
particular, I reproduced all the examples in
[hendry2007econometric](references), so that my code for the final assignment
have been validated. In a similar manner, I did [all the exercises from the
course](https://github.com/edxu96/TidySimStat/tree/master/src) again using
Python (MATLAB in 2019), wrote tests using `unittest` Package. Last year, most
of the validation is done through asking TAs, but I managed to find test cases
from [ross2017introductory](references) and [ross2012simulation](references)
this time. This approach has boosted my confidence in my results, and I have
kept writing tests for all my repositories since then.

Another reason behind tests is that a large part of this simulation course is
about validation. A real-world simulation program consists of multiple
probability models that must be validated against data. There are two aspects,
in my mind. First, the code must behave as expected and be robust enough.
Mathematical simulation is code-intensive, but I found most of the students
didn't have enough experience with coding. The coding skill, I believe, is as
important as writings, and others can hardly help if someone is unable to
maintain about 1000 lines of code in a course like this.

The second step is to do statistical inference, which is even harder for those
without such background knowledge. Last year, I had no idea as well, but tried
my best to gain help from TAs. During the preparation, I realised that this was
my first course that relies on scientific procedure, namely, hypotheses,
experiment, and inference, even though with a background in thermal physics.
My understanding was deepened when I answered questions, and it is discussed in
the following two sections.

## Key Points and Hints {#key}

Another key ability for this course besides the implementation, I think, is to
read books. As far as I can remember, last year, my reading kept up with
lectures. That is, I was able to go through corresponding sections in the
textbook, which was not easy. Three-hours lectures were given everyday
consecutively, so I had to read for many hours every night. Nevertheless, in my
view, to have lots of patience with books can save the time.

This year, I found most students unable to grasp even the basic points. Most
likely, they never read the recommended book,
[ross2012simulation](#references). I do not think anyone can remember all the
points mentioned by the teacher in the lecture. Even if there is a recording,
it is hard to review the detail. In contrast, to highlight key points when
reading is very easy and helps a lot in recap. I always remember the following
advice of a physics teacher in my high school:

> A lecture is the time when you think critically about the points emphasised
> by someone else, not when you learn something new.

Furthermore, it is impossible, I think, for someone to give step-by-step
instructions for the implementation in terms of coding. There are many
small-scale, specific issues that must be handled by the students in this
course, and there are usually multiple ways to do a coding task. For example,
[to build a 2-D array for irregular sample
space](https://gist.github.com/edxu96/a506b784d1a8864a188a8aa3ce49cc4d) is a
technique I thought of last year. Actually, to write code only takes a small
portion of the project time, while how to write takes a lot of thinking. I
tried my best to give hints, which had not been emphasised in the book, and
most students were happy to take their time and think about my hints. To do
something new by solving such manageable puzzles requires a deeper
understanding of the task, which also gives students motivation for reading. On
the other hand, the problem is not too open, and the students can always
consult a well-written textbook or the teaching team.

Such idea played an important role, when I was designing a final project for
the course, which is discussed in the following section.

## 100% Solar Energy Project {#solar}

Each group had to choose one of the available projects as the final assignment.
A real-world simulation project usually comes with context, and no available
project was designed in the context of energy industry. I really like the
"bottom-up" approach to simulate electricity consumption profiles
[[widén2010high](#references)]. The teacher agreed to let me design a new
project based on that. One weekend is all the time I got to pull it off, but I
decided to give it a try. My best friend in Denmark invited me for hot pot that
weekend, because he was leaving Denmark for a PhD in Netherlands, but I have to
say no. That is the first and probably the only project I design.

In the very beginning, I chose to publish [the instruction on
RPubs](https://rpubs.com/edxu96/SimSolarEnergy), which could be easily
modified. In the mean time, to remind students of new contents, the "latest
updates" section was put at the top of that webpage. I kept updating the whole
webpage and received lots of valuable feedback.

To help them focus on the simulation part, I searched many websites, identified
a reliable dataset, and transformed it into two compact CSV files. Actually, I
am convinced that the transformation is the hardest part. After the deadline,
I graded their reports, and was satisfied with their writing.

## References

- Hendry, D. F., & Nielsen, B. (2007). Econometric modeling: a likelihood
  approach. Princeton University Press.
- Ross, S. M. (2017). Introductory statistics. Academic Press.
- Ross, S. M. (2013) Simulation, 5th edition. Academic Press.
  https://www.elsevier.com/books/simulation/ross/978-0-12-415825-2
- The [syllabus](./syllabus.pdf) at that time.
- Widén, J., & Wäckelgård, E. (2010). A high-resolution stochastic model of
  domestic activity patterns and electricity demand. Applied energy, 87(6),
  1880-1892.

---

- On April 8, 2021, finished [key points and hints](#key) for the first time.
- On April 9, 2021, finished [100% solar energy project](#solar) for the first
  time and updated the "hints" part in [key points and hints](#key).
